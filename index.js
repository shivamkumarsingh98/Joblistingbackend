const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()
const app = express()

app.use(bodyparser.urlencoded({extended:false}))

main().catch(err => console.log("main error",err));

async function main() {
  await mongoose.connect(process.env.URL_DataBas).then((res)=>console.log("mongoss is conected")).catch((error)=>
  console.log("mongoose cath error",error))
}

const Schema = mongoose.Schema;


const user = new Schema({
    Name: String,
    Email: String,
    Mobile: Number,
    Password: String,
});

const PotalDataModel = new mongoose.model("PotalDataModel", user);

app.listen(process.env.port,(req,res)=>{
     console.log('connect to mongodb')

})

app.get("/", (req,res)=>{
    res.send("helth api is running")
})
