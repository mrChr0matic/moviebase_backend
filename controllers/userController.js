const {PrismaClient}= require('@prisma/client');
const prisma = new PrismaClient() ;
const asyncHandler=require('express-async-handler');

const userRegister=asyncHandler(async (req,res)=>{
    const body=req.body;
    const userName=body.userName;
    const password=body.password;
    const userID=body.userID;
    const email=body.email;
    console.log(email);
    const verified=false;
    const user=await prisma.user.create({
        data:{
            userID,
            userName,
            email,
            password,
            verified
        }
    });
});

const userLogin=asyncHandler(async (req,res)=>{
    const body=req.body;
    const userName=body.userName;
    const password=body.password;

    if (!userName || !password) 
        return res.status(400).json({ "message" : "empty fields"})

    const user=await prisma.user.findFirst({
        where:{
            userName,
            password
        }
    });
    if(user)
        res.json({ "userId" : user.userID }).statusCode(200)
    else
        res.send("invalid credentials").statusCode(403);
});



module.exports={userRegister,userLogin};