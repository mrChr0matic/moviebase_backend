const expressAsyncHandler = require('express-async-handler')
const {PrismaClient}= require('@prisma/client');
const prisma = new PrismaClient() ;

const authorize = expressAsyncHandler(async (req, res, next) => {
    const userID = req.headers.authorization || req.headers.Authroization;

    if (!userID)
        return res.status(401).json({ "message" : "invalid login creds" })

    const user = await prisma.user.findUnique({
        where : {
            userID
        }
    })

    if (!user)
        return res.status(400).json({ "message" : "user not found"})

    req.user = user;
    next()
})

module.exports=authorize