const {PrismaClient}= require('@prisma/client');
const prisma = new PrismaClient() ;
const asyncHandler=require('express-async-handler');

const addReview=asyncHandler(async (req,res)=>{
    const body=req.body;
    const userID=req.user.userID;

    const reviews=await prisma.reviews.create({
        data:{
            userID:userID,
            ...body,
        }
    });
});


module.exports={addReview}