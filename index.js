const express=require('express');
const app=express()
const cors=require('cors');
const userRouter=require('./routes/userRoutes')
const adminRouter=require('./routes/adminRoutes')
const movieRouter=require('./routes/movieRoutes')
const logger = require('./middleware/logger');
const authorize = require('./middleware/auth');
const reviewRouter = require('./routes/reviewRoutes');

app.use(cors());
app.use(logger)
app.use(express.static('static'))
app.use(express.json());
app.use("/user",userRouter);
app.use('/admin', adminRouter)
app.use('/movies', movieRouter)
app.use(authorize)
app.use('/review',reviewRouter)

app.listen(3000,()=>console.log("server started"));