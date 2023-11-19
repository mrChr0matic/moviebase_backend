const {PrismaClient}= require('@prisma/client');
const { generateKey } = require('crypto');
const prisma = new PrismaClient() ;
const asyncHandler=require('express-async-handler');
const { getMovie } = require('./movieController');

const getGenreList=asyncHandler(async (req,res)=>{
    try{
        const body=req.body;
        let genreList;
        if (body.AND) {
            genreList= await prisma.movie.findMany({
                where: {
                    Genres : {
                        some : {
                            name : {
                                in : body.AND.map(item => item.name)
                            }
                        }
                    }
                    
                },
                select:{
                    ISAN : true,
                    title : true,
                }
            });

            res.send(genreList)
        }
        else{
            genreList= await prisma.genre.findMany({
                where:body,
                select:{
                    Movies:{
                        select:{
                            ISAN: true,
                            title: true
                        }
                    }
                }
            });
            let response = [];
            for (let genre of genreList) {
                response = response.concat(genre.Movies)
            }
            res.send(response).status(200);
        }
    }
    catch(err){
        console.log(err)
        res.json({"message": "error"}).status(400);
    }
})

module.exports={getGenreList};