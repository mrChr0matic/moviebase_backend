const {PrismaClient}= require('@prisma/client');
const prisma = new PrismaClient();
const asyncHandler=require('express-async-handler');

const addEditorsChoice=asyncHandler(async (req,res)=>{
    try{
        const body=req.body;
        const recommendation=await prisma.recommendation.create({
            data:body
        });
        res.send({"message":"watchlist_added"}).status(200);
    }
    catch{
        res.send({"message": "watchlist_add_failed"});
    }
});

const deleteEditorsChoice=asyncHandler(async (req,res)=>{
    try{
        const body=req.body;
        if(!body.ISAN || !body.adminID)
            return res.send({ "error":"missing_attributes" }).status(401);
        const recommendation=await prisma.recommendation.deleteMany({
            where:body
        });
        res.send({ "message":"editors_delete_success" }).status(200);
    }
    catch{
        res.send({ "message":"editors_delete_failed" });
    }
});

const getEditorsChoice=asyncHandler(async (req,res)=>{
    const recommendation=await prisma.recommendation.findMany({
        select:{
            movie:true
        }
    });
    res.send(recommendation);
});

module.exports={addEditorsChoice,deleteEditorsChoice,getEditorsChoice};
