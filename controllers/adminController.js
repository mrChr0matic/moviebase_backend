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
        res.status(400).json({"error":"error"});
    }
});

const adminLogin=asyncHandler(async (req,res)=>{
    try{
        const body=req.body;
        const admin=await prisma.admin.findFirst({
            where:body
        })
        return res.json({adminID: admin.adminID}).status(200);
    }
    catch{
        return res.status(400).json({"message" : "noADMIN"});
        // res.status(400)
        // throw new Error({"message" : "noADMIN"})
    }
});

const verification=asyncHandler(async(req,res)=>{
    try{
        if(req.type!="ADMIN")
            return res.send({"error":"NOT_ADMIN"}).status(400);
        const body=req.body;
        console.log(body);
        const user=await prisma.user.update({
            where:{
                userName:body.userName
            },
            data:{
                verified: body.val
            }
        })
        res.send({"verfication" : "success"});
    }
    catch(err){
        console.log(err);
        res.status(400).send({"verification" : "failure"});
    }
});

module.exports={ adminRegister,adminLogin,verification}