const expressAsyncHandler = require('express-async-handler')
const {PrismaClient}= require('@prisma/client');
const prisma = new PrismaClient() ;

const authorize = expressAsyncHandler(async (req, res, next) => {
    const auth = req.headers.authorization || req.headers.Authorization; //Authorization : "USER <userId>"
    if (!auth)
    return res.status(401).json({ "message" : "invalid login creds" })

    const id = auth.split(" ")[1];
    const type = auth.split(" ")[0];
    let user = null;
    if (type == "USER") {
        user = await prisma.user.findUnique({
            where : {
                userID : id,
            }
        })
    }
    else {
        user = await prisma.admin.findUnique({
            where : {
                adminID : id,
            }
        })
    }
    if (!user) 
        return res.status(400).json({ "message" : "user not found" })

    req.user = user;
    req.type = type;
    next()
})

module.exports=authorize