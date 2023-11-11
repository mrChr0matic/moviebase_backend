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
    const ind=1;
    let whereCondition;
    const query=req.query;
    switch (ind) {
        case 1:
            whereCondition = { title: query.title};
        break;
        case 2:
            whereCondition = { lang: query.lang };
        break;
        case 3:
            whereCondition = { ISAN: req.isan };
        break;
        case 4:
            whereCondition ={OR: [{userRating: query.rating }, {adminRating: query.rating}]};
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
    const movie=await prisma.movie.deleteMany();
});

module.exports={addMovie,fetchMovie,deleteMovie};