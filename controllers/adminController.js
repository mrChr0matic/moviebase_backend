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

const adminLogin=asyncHandler(async (req,res)=>{
    const adminID="R100";
    const password="Root";

    const admin=await prisma.admin.findFirst({
        where:{
            adminID: adminID,
            password: password
        }
    })

    if(admin)
        res.send(admin);
    else
        res.send("failed");
});

const verification=asyncHandler(async(req,res)=>{
    const body=req.body;
    if (body.status == undefined || !body.userName) {
        return res.status(400).json({ message : "you are fucking retarded" })
    }
    const newVal=body.status;
    const userName=body.userName
    const user=await prisma.user.update({
        where:{
            userName:userName
        },
        data:{
            verified: newVal
        }
    })
    if(user)
        res.send("success");
    else    
        res.send("Failure")
});

module.exports={ adminRegister,adminLogin,verification}