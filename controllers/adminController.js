const {PrismaClient}= require('@prisma/client');
const prisma = new PrismaClient() ;
const asyncHandler=require('express-async-handler');

const adminRegister=asyncHandler(async(req,res)=>{
    const adminID="R100";
    const password="Root";
    const email="root@gmail.com";
    
    const admin=await prisma.admin.create({
        data:{
            adminID:adminID,
            password: password,
            email: email
        }
    });
    if(admin)
        res.send(admin);
});

module.exports={adminRegister}