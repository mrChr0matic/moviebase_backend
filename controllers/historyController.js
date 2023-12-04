const {PrismaClient}= require('@prisma/client');
const prisma = new PrismaClient() ;
const asyncHandler=require('express-async-handler');

const addHistory=asyncHandler(async (req,res)=>{
    try{
        if(req.type!="USER"){
            return res.send({message:"loginNeeded"}).status(400);
        }
        const body=req.body;
        body.userID=req.user.userID;
        const history=await prisma.history.create({
            data: body
        });
        res.send({message:"addedHistory"}).status(200);
    }
    catch{
        res.status(400).send({message:"errorHistoryAdd"});
    }
});

const viewHistory=asyncHandler(async (req,res)=>{
    if(req.type!="USER"){
        return res.status(400).send({message:"loginNeeded"});
    }
    let history=await prisma.history.findMany({
        where:{
            userID: req.user.userID
        },
        include:{
            movie:true
        }
    })
    let temp=[];
    for(let i=0;i<history.length;i++)
        temp.push(history[i].movie);
    history=temp;
    res.send(history).status(200);
});

const deleteHistory=asyncHandler(async (req,res)=>{
    if(req.type!="USER")
        return res.status(400).send({"message":"login_needed"});
    let history=await prisma.history.deleteMany({
        where:{
            userID:req.user.userID
        }
    })
    return res.status(200).send({"message":"delete_success"});
})

module.exports={addHistory,viewHistory,deleteHistory};