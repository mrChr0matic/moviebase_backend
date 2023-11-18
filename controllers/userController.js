const {PrismaClient}= require('@prisma/client');
const prisma = new PrismaClient() ;
const asyncHandler=require('express-async-handler');

const userRegister=asyncHandler(async (req,res)=>{
    try{
        const body=req.body;
        body.verified=false;
        const user=await prisma.user.create({
            data:body
        });
        res.send({"userID": body.userID}).status(200);
    }
    catch(err){
        req.json({err}).status(400);
    }
});

const userLogin=asyncHandler(async (req,res)=>{
    try{
        const body=req.body;
        if (!body.userName || !body.password) 
            return res.status(400).json({ "message" : "empty_fields"})
        const user=await prisma.user.findFirst({
            where:body
        });
        res.json({ "userID" : user.userID }).statusCode(200)
    }
    catch{
        res.send({"message":"invalid_credentials"}).status(400);
    }
});

module.exports={userRegister,userLogin};