const express=require('express');
const app=express()
const cors=require('cors');
const userRouter=require('./routes/userRoutes')
const adminRouter=require('./routes/adminRoutes')
const movieRouter=require('./routes/movieRoutes')
const logger = require('./middleware/logger');
const reviewRouter = require('./routes/reviewRoutes');
const genreRouter = require('./routes/genreRoutes');
const editorsRouter = require('./routes/editorsRoutes');

app.use(cors({ origin : "*" }));
app.use(logger)
app.use(express.static('static'))
app.use(express.json());
app.use("/user",userRouter);
app.use('/admin', adminRouter)
app.use('/genre',genreRouter)
app.use('/movies', movieRouter)
app.use('/review',reviewRouter)
app.use('/editors',editorsRouter)

app.listen(5000,()=>console.log("server started"));