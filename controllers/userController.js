const {PrismaClient}= require('@prisma/client');
const prisma = new PrismaClient() ;
const asyncHandler=require('express-async-handler');

const userRegister=asyncHandler(async (req,res)=>{
    const userName="Abishek";
    const passWord="kehsiba"
    const userID="123456789";
    const mailID="abisheknair54321@gmail.com";
    const verified=false;
    const user=await prisma.user.create({
        data:{
            userID:userID,
            userName:userName,
            email:mailID,
            password: passWord,
            verified:verified
        }
    });
});

const userLogin=asyncHandler(async (req,res)=>{
    const userName="Abishek";
    const passWord="kiba";

    const user=await prisma.user.findFirst({
        where:{
            userName:userName,
            password: passWord
        }
    });
    if(user)
        res.send("Succesfull Login")
    else
        res.send("invalid credentials");
});

module.exports={userRegister,userLogin};