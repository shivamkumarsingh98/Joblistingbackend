const express = require('express')
const recruiterRoute = express()
const bodyparser = require('body-parser');
const { admin } = require('../Controllers/recruiterController');


recruiterRoute.use(bodyparser.urlencoded({extended:false}))
recruiterRoute.use(express.json());
recruiterRoute.use(express.urlencoded({extended:true}));

recruiterRoute.post("/admin",admin)



module.exports =recruiterRoute