const {PrismaClient}= require('@prisma/client');
const prisma = new PrismaClient() ;
const asyncHandler=require('express-async-handler');

const addToWatchlist=asyncHandler(async (req,res)=>{
    try{
        const body=req.body;
        body.userID=req.user.userID;
        if(req.type!=="USER"){
            return res.send({"message":"loginFirst"});
        }
        const watchlist=await prisma.watchlist.create({
            data:body
        })
        res.send({"message":"addedWatchlist"}).status(200);
    }
    catch(err){
        res.status(400).send({"message":"errorWatchlist"});
    }
});

const deleteFromWatchlist = asyncHandler(async (req,res)=>{
    try{
        const body=req.body;
        body.userID=req.user.userID;
        if(req.type!="USER"){
            return res.send({"message":"loginFirst"});
        }
        const watchlist=await prisma.watchlist.deleteMany({
            where: body
        });
        res.send({"message":"deletedWatchlist"});
    }
    catch(error){
        res.status(400).send({"message":"errorDeleteWatchlist"});
    }
});

const getWatchList= asyncHandler(async (req,res)=>{
    try{
        const body={};
        body.userID=req.user.userID;
        if(req.type!="USER"){
            return res.send([]);
        }
        let watchlist= await prisma.watchlist.findMany({
            where: body,
            select:{
                ISAN: false,
                movie:true
            }
        });
        let temp=[];
        for(let i=0;i<watchlist.length;i++)
            temp.push(watchlist[i].movie);
        watchlist=temp;
        res.send(watchlist).status(200);
    }
    catch{
        res.status(400).send([]);
    }
});

module.exports={addToWatchlist,deleteFromWatchlist,getWatchList};