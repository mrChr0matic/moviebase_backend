const {PrismaClient}= require('@prisma/client');
const prisma = new PrismaClient() ;
const asyncHandler=require('express-async-handler');
const { title } = require('process');
const stringify=require('../functions');
const { error } = require('console');

const addMovie=asyncHandler(async (req,res)=>{
    const date= new Date('September 12, 2013');
    const movieISAN="00000000";
    const movieTitle="Game of Thrones";
    const poster="https://www.imdb.com/title/tt2442560/?ref_=ttrel_ov_i";
    const trailer="https://www.youtube.com/watch?v=oVzVdvGIC7U";
    const releaseDate=date;
    const description="A gangster family epic set in 1900s England, centering on a gang who sew razor blades in the peaks of their caps, and their fierce boss Tommy Shelby.";
    const uRating=9;
    const aRating=9.5;
    const language="EN";

    const movie=await prisma.movie.create({
        data:{
            ISAN:movieISAN,
            title:movieTitle,
            poster: poster,
            trailer: trailer,
            release_date: releaseDate,
            description: description,
            userRating: uRating,
            adminRating: aRating,
            lang: language.toLowerCase()
        }
    })
    if(movie)
        res.send(movie);
});

const fetchMovie=asyncHandler(async(req,res)=>{
    console.log(req.user)
    const ind=1;
    let whereCondition;
    const body=req.body;
    switch (ind) {
        case 1:
            whereCondition = { title: body.title};
        break;
        case 2:
            whereCondition = { lang: body.lang };
        break;
        case 3:
            whereCondition = { ISAN: req.isan };
        break;
        case 4:
            whereCondition ={OR: [{userRating: body.rating }, {adminRating: body.rating}]};
        default:
        throw error ("INVALID");
    }

    const movie=await prisma.movie.findMany({
        where:whereCondition
    });
    
    if(movie)
        res.send(movie);
    else    
        res.send("File not found");
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