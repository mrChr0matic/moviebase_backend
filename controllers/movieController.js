const {PrismaClient}= require('@prisma/client');
const prisma = new PrismaClient() ;
const asyncHandler=require('express-async-handler');
const { title } = require('process');
const stringify=require('../functions');
const { error } = require('console');

const addMovie = asyncHandler(async (req, res) => {
    let data = req.body;
    try{
        const genres = data.Genres || [];
        delete data.Genres;
        if (req.type !== "ADMIN") {
            return res.status(401).json({ "error": "unauthorized" });
        }
        const createdGenres = [];
        for (const genre of genres) {
            const existingGenre = await prisma.genre.findUnique({
                where: { name: genre.name },
            });
            if (!existingGenre) {
                const createdGenre = await prisma.genre.create({
                    data: { name: genre.name },
                });
                createdGenres.push(createdGenre);
            } 
            else {
                createdGenres.push(existingGenre);
            }
        }
        data.release_date=new Date(data.release_date);
        const movie = await prisma.movie.create({
            data: {
                ...data,
                Genres: {
                    connect: createdGenres.map((genre) => ({ genreID: genre.genreID })),
                },
            },
        });
        return res.send(movie);
    }
    catch{
        res.send({status:"error"});
    }
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
            ISAN: body.ISAN
        }
    })
    return res.send({"status":"done"});
});

const updateMovie=asyncHandler (async (req,res)=>{
    const title="GOT";
    try {
        const movie=await prisma.movie.update({
            where:{
                ISAN:"00000000"
            },
            data:{
                description: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for a millennia."
            }
        })
        res.send({ status : "Success" });
    }
    catch (error) {
        res.send({ error : error });
    }
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

const getMovie = asyncHandler(async (req, res) => {
    try {
        const movie = await prisma.movie.findUnique({
            where : {
                ISAN : req.params.ISAN,
            }
        })
    
        res.json(movie)
    }
    catch(error) {
        res.json(error)
    }
})

module.exports={addMovie,fetchMovie,deleteMovie,updateMovie,getMovie};