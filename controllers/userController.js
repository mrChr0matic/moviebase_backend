const {PrismaClient}= require('@prisma/client');
const prisma = new PrismaClient() ;
const asyncHandler=require('express-async-handler');

const userRegister=asyncHandler(async (req,res)=>{
    const userName="Abishek";
    const password="kehsiba"
    const userID="123456789";
    const email="abisheknair54321@gmail.com";
    const verified=false;
    const user=await prisma.user.create({
        data:{
            userID,
            userName,
            mailID,
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
        return res.status(400).json({ "message" : "pottanano"})

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

const addReview=asyncHandler(async (req,res)=>{
    const body=req.body;
    const userID=body.userID;
    const isan=body.isan;
    const review=body.review;
    const rating=body.rating;

    const reviews=await prisma.reviews.create({
        data:{
            userID:userID,
            ISAN: isan,
            review: review,
            rating: rating
        }
    });

    await updateUserRating(rating,isan);
});

module.exports={userRegister,userLogin};