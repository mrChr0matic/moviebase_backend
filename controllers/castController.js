const {PrismaClient}= require('@prisma/client');
const prisma = new PrismaClient() ;
const asyncHandler=require('express-async-handler');

const addCast=asyncHandler (async (req,res)=>{
    const body=req.body;
    const ISAN=body.ISAN;
    delete body.ISAN;
    if (req.type !== "ADMIN") {
        return res.status(401).json({ "error": "NOT_ADMIN" });
    }
    const crew=await prisma.crew.create({
        data:body
    })
    const createdBy=await prisma.createdBy.create({
        data:{
            crewID: crew.crewID,
            ISAN
        }
    })
    res.send({message:"addedCrew"});
})

const searchByCast=asyncHandler(async (req,res)=>{
    try{
        const body=req.body;
        let crewID=await prisma.crew.findFirst({
            where:body,
            select:{
                crewID:true
            }
        });
        crewID=crewID.crewID;
        let movie=await prisma.createdBy.findMany({
            where: {
                crewID
            },
            select:{
                movie:{
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
                                user:{
                                    select:{
                                        userID:true,
                                        verified: true
                                    }
                                },
                                Review : true,
                                Rating : true,
                            },
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
                    }
                }
            }
        });
        let createdBy=[];
        for(let mv of movie){
            createdBy.push(mv.movie);
        }
        movie=createdBy;
        for(let mv of movie)
            mv.Reviews.sort((a, b) => (b.user.verified ? 1 : -1));
        res.send(movie).status(200);
    }
    catch(err){
        console.log(err);
        res.send({"error":"error"}).status(400);
    }
});

module.exports={addCast,searchByCast};