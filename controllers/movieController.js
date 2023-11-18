const {PrismaClient}= require('@prisma/client');
const prisma = new PrismaClient() ;
const asyncHandler=require('express-async-handler');
const { title } = require('process');
const stringify=require('../functions');
const { error } = require('console');

const addMovie = asyncHandler(async (req, res) => {
    let data = req.body;
    console.log(req)
    try{
        const genres = data.Genres || [];
        delete data.Genres;
        if (req.type !== "ADMIN") {
            return res.status(401).json({ "error": "NOT_ADMIN" });
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
        const movie = await prisma.movie.create({
            data: {
                ...data,
                Genres: {
                    connect: createdGenres.map((genre) => ({ genreID: genre.genreID })),
                },
            },
        });
        return res.send({ISAN: movie.ISAN});
    }
    catch(error){
        res.send({status:"error"});
    }
});

const fetchMovie=asyncHandler(async(req,res)=>{
    const body=req.body;
    const { searchItem, searchType } = body;
    let title= '';
    const movie=await prisma.movie.findMany({
        where:{
            [searchType] :{
                contains: searchItem  
            } 
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
            CreatedBy:{
                select:{
                    crew:{
                        select:{
                            Name:true
                        }
                    }
                }
            }
        },
    });
    let createdBy=[];
    for(let mv of movie){
        for(let created of mv.CreatedBy){
            createdBy.push(created.crew.Name);
        }
        mv.CreatedBy=createdBy;
    }
    res.send(movie).status(200);
});

const getCustomMovie=asyncHandler(async(req,res)=>{
    try{
        const body=req.body;
        const movie=await prisma.movie.findMany({
            orderBy:body,
            select:{
                ISAN: true,
                title:true
            }
        });
        res.send(movie).status(200);
    }
    catch (error){
        res.json(error);
    }
});

const deleteMovie=asyncHandler(async (req,res)=>{
    try{
        if (req.type !== "ADMIN") {
            return res.status(401).json({ "error": "NOT_ADMIN" });
        }
        const body=req.body;
        const movie=await prisma.movie.delete({
            where:body
        })
        return res.send({"status":"deleted_movies"});
    }
    catch{
        return res.send({"status": "couldnt_delete"});
    }
});

const updateMovie=asyncHandler (async (req,res)=>{
    try {
        if (req.type !== "ADMIN") {
            return res.status(401).json({ "error": "NOT_ADMIN" });
        }
        const body=req.body;
        const Title=req.req_title;
        delete body.req_title;
        const movie=await prisma.movie.update({
            where:{
                title:Title
            },
            data:body,
            select : {
                ISAN : true
            }
        })
        res.send(movie);
    }
    catch (error) {
        res.json({"error":"ERROR"}).status(400);
    }
});

async function updateReview(ISAN,rating){
    try{
        const ct=await prisma.reviews.count({
            where:{
                ISAN,
            }
        })
        const oldRating=await prisma.movie.findFirst({
            select:{
                userRating: true,
            },
            where:{
                ISAN
            }
        })
        const newRating=parseFloat((oldRating.userRating*(ct-1)+rating)/ct);
        const movie=await prisma.movie.update({
            where:{
                ISAN
            },
            data:{
                userRating: newRating,
            }
        });
        return {"remarks": "updated"};
    }
    catch(error){
        return {error}
    }
}

const getMovie = asyncHandler(async (req, res) => {
    try {
        const movie = await prisma.movie.findUnique({
            where : {
                ISAN : req.params.ISAN,
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
        })
        res.json(movie).status(200);
    }
    catch(error) {
        res.json(error).status(400);
    }
})

module.exports={addMovie,fetchMovie,deleteMovie,updateMovie,getMovie,getCustomMovie,updateReview};