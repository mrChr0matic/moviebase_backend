const {PrismaClient}= require('@prisma/client');
const prisma = new PrismaClient() ;
const asyncHandler=require('express-async-handler');

const adminRegister=asyncHandler(async(req,res)=>{
    try{
        const body=req.body;
        const admin=await prisma.admin.create({
            data:body
        });
        res.send(admin);
    }
    catch(err){
        res.json({"error":"error"}).status(400);
    }
});

const adminLogin=asyncHandler(async (req,res)=>{
    try{
        const body=req.body;
        const admin=await prisma.admin.findFirst({
            where:body
        })
        res.send({adminID: admin.adminID}).status(200);
    }
    catch{
        res.send({"message" : "noADMIN"}).status(400);
    }
});

const verification=asyncHandler(async(req,res)=>{
    try{
        if(req.type!="ADMIN")
            return res.send({"error":"NOT_ADMIN"}).status(400);
        const body=req.body;
        const user=await prisma.user.update({
            where:{
                OR:[
                    {userID:body.userID},{userName:body.userName}
                ]
            },
            data:{
                verified: body.val
            }
        })
        if(!user)
            res.send({"verfication" : "failure"});
        else    
            res.send({"verification" : "success"})
    }
    catch{
        res.send({"verification" : "failure"});
    }
});

module.exports={ adminRegister,adminLogin,verification}