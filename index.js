const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const dotenv = require('dotenv')
const cors = require('cors');
const userRoute = require('./Router/userRouter');
const recruiterRoute = require('./Router/recruiterRoute');
dotenv.config()
const app = express()
app.use(cors());

app.use(bodyparser.urlencoded({extended:false}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use((req,res,next)=>{
  console.log('HTTP Method-'+ req.method + ", URL -" + req.url)
  next()
})

app.use('/user',userRoute);
app.use('/api',recruiterRoute);


main().catch(err => console.log("main error",err));

async function main() {
  await mongoose.connect(process.env.URL_DataBas).then((res)=>console.log("mongoss is conect ")).catch((error)=>
  console.log("mongoose cath error",error))
}



app.listen(process.env.port || 8080,(req,res)=>{
     console.log('Port is 8080 is ok')

})

app.get("/", (req,res)=>{
    res.send("helth api is running")
})



