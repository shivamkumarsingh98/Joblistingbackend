const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const dotenv = require('dotenv')
const cors = require('cors');
const byct = require('bcrypt');
const jwt = require('jsonwebtoken')
dotenv.config()
const app = express()
app.use(cors());
const SECRET_KEY = "NODESAPI"

app.use(bodyparser.urlencoded({extended:false}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// app.use(session{sessionOpction});
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new localStrategy(PotalDataModel.authenticate()));

main().catch(err => console.log("main error",err));

async function main() {
  await mongoose.connect(process.env.URL_DataBas).then((res)=>console.log("mongoss is conected")).catch((error)=>
  console.log("mongoose cath error",error))
}

const Schema = mongoose.Schema;


const userData = new Schema({
    Name: String,
    Email: String,
    Mobile: Number,
    Password: String,
});

const PotalDataModel = new mongoose.model("PotalDataModel", userData);
// PotalDataModel.plugin(passportlocal);

app.listen(process.env.port,(req,res)=>{
     console.log('Port is 8080 is ok')

})

app.get("/", (req,res)=>{
    res.send("helth api is running")
})

app.post("/register", async (req,res)=>{

    try{
        console.log("ok",req.body);
        const{Name,Email,Mobile,Password}= req.body
        const userExgist = await PotalDataModel.findOne({Email:Email})
        if(userExgist){
            res.status(400).json({message:"user alred Exgist"})
        }

        const haspassword = await byct.hash(Password, 10);

        const newUser = await new PotalDataModel({
            Name,
            Email,
            Mobile,
            Password:haspassword,
        });
        await newUser.save();
        const token =jwt.sign({Email:newUser.Email, id : newUser._id}, SECRET_KEY)

      
        res.status(200).json({message:` User register successfully`, token: token})
    }catch(error){

        console.log("Error:", error.message)
        res.status(500).json("internal server error",error)
    }
})

app.post("/Login", async(req,res)=>{

    const{Email,Password}= req.body
    try{
        const userExgist = await PotalDataModel.findOne({Email:Email})
        if(!userExgist){
           return res.status(400).json({message:"user not found"})
        }
        const matchpassword = await byct.compare(Password, userExgist.Password);
        if(!matchpassword){
           return res.status(400).json({message:"Invaled password"})
        }
        const token =jwt.sign({Email:userExgist.Email, id : userExgist._id}, SECRET_KEY)
        res.status(200).json({message:` Login Succesfull`, token: token})
    }catch(error){

        console.log("Login Error:", error.message)
        res.status(500).json(" Login internal server error",error)
    }
})
