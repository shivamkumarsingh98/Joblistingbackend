const userScima= require("../Models/userScima")
const SECRET_KEY = "NODESAPI"
const byct = require('bcrypt');
const jwt = require('jsonwebtoken')

const register = async (req,res)=>{
    try{
        console.log("ok",req.body);
        const{Name,Email,Mobile,Password}= req.body
        const userExgist = await userScima.findOne({Email:Email})
        if(userExgist){
           return res.status(400).json({message:"user alred Exgist"})
        }

        const haspassword = await byct.hash(Password, 10);

        const newUser =  new userScima({
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
        res.status(500).json(" register:-internal server error",error)
        next(error)
    }

}


const Login = async (req,res)=>{
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
        res.status(500).json({ message: "Login internal server error", error: error.message });
        next(error)

    }
}

module.exports= {register,Login}