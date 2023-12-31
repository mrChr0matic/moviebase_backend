const {PrismaClient}= require('@prisma/client');
const prisma = new PrismaClient() ;
const asyncHandler=require('express-async-handler');
const { updateReview } = require('./movieController');

const addReview=asyncHandler(async (req,res)=>{
    try{
        const body=req.body;
        const userID=req.user.userID;
    
        const reviews=await prisma.reviews.create({
            data:{
                userID:userID,
                ...body,
            }
        });
        const update= await updateReview(body.ISAN,body.Rating);
        console.log(update);
        res.send({"status": "added_review"});
    }
    catch(error){
        console.log(error);
        res.status(400).json({"status": "error_adding_review"})
    }
});


module.exports={addReview}