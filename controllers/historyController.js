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
        res.send({message:"errorHistoryAdd"}).status(400);
    }
});

const viewHistory=asyncHandler(async (req,res)=>{
    if(req.type!="USER"){
        return res.send({message:"loginNeeded"}).status(400);
    }
    const history=await prisma.history.findMany({
        where:{
            userID: req.user.userID
        },
        include:{
            movie:true
        }
    })
    res.send(history).status(200);
});

module.exports={addHistory,viewHistory};