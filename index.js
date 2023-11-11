const express=require('express');
const app=express()
const routes=require('./routes/customRoutes')
const cors=require('cors')

app.use(cors());
app.use(express.static('static'))
app.use(express.json());
app.use("/",routes);

app.listen(3000,()=>console.log("server started"));