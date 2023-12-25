const express = require('express');
const { register, Login } = require('../Controllers/userController');
const userRoute = express.Router()
const bodyparser = require('body-parser')

userRoute.use(bodyparser.urlencoded({extended:false ,  limit: '10mb'}))
userRoute.use(express.json());
userRoute.use(express.urlencoded({extended:true}));

userRoute.post("/register",register )
userRoute.post("/Login",Login)

module.exports = userRoute