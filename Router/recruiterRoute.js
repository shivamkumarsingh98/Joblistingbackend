const express = require('express')
const recruiterRoute = express()
const bodyparser = require('body-parser');
const {jobpost, getjob, jobfilter, updatejob } = require('../Controllers/recruiterController');
const auth = require('../Middleware/auth');


recruiterRoute.use(bodyparser.urlencoded({extended:false}))
recruiterRoute.use(express.json());
recruiterRoute.use(express.urlencoded({extended:true})); 

recruiterRoute.get("/job-posts/:id",getjob)
recruiterRoute.post("/jobpost",auth, jobpost)
recruiterRoute.get("/job-post",jobfilter)
recruiterRoute.put("/job-post/:id",auth,updatejob)



module.exports =recruiterRoute