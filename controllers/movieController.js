const {PrismaClient}= require('@prisma/client');
const prisma = new PrismaClient() ;
const asyncHandler=require('express-async-handler');
const { title } = require('process');
const stringify=require('../functions');
const { error } = require('console');

const addMovie=asyncHandler(async (req,res)=>{
    const data=req.body;
    if(req.type!="ADMIN")
        return res.json({"error": "unauthorized"}).status(401);
    const movie=await prisma.movie.create({
        data
    })
    return res.send(movie);
});

const fetchMovie=asyncHandler(async(req,res)=>{
    const body=req.body;
    const { searchItem, searchType } = body;
    const movie=await prisma.movie.findMany({
        where:{
            [searchType] : searchItem,
        },
        select:{
            ISAN:true,
            title: true,
            poster: true,
            trailer: true,
            release_date: true,
            description:true,
            userRating: true,
            adminRating: true,
            lang:true,
            Reviews: {
                select : {
                    Review : true,
                    Rating : true,
                }
            },
            Genres: {
                select : {
                    name : true,
                }
            },
        },
    });
    res.send(movie);
});

const getAllMovies=asyncHandler(async(req,res)=>{
    const movie=await prisma.movie
});

const deleteMovie=asyncHandler(async (req,res)=>{
    const body=req.body;
    const movie=await prisma.movie.delete({
        where:{
            title: body.title
        }
    })
});

const updateMovie=asyncHandler (async (req,res)=>{
    const title="GOT";
    const movie=await prisma.movie.update({
        where:{
            ISAN:"00000000"
        },
        data:{
            description: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for a millennia."
        }
    })
    if(movie)
        res.send("Success");
    else
        res.send("failure");
});

const updateReview= async (rating,isan)=>{
    const tot=await prisma.reviews.count({
        where:{
            ISAN:isan
        }
    });
    let oldUserRating=await prisma.movie.findFirst({
        where:{
            ISAN:isan
        }
    });
    oldUserRating=oldUserRating.userRating;
    const newUserRating=(oldUserRating*(tot-1)+rating)/(tot);
    const movie=await prisma.movie.update({
        where:{
            ISAN:isan
        },
        data:{
            userRating:newUserRating,
        }
    });
}

module.exports={addMovie,fetchMovie,deleteMovie,updateMovie};