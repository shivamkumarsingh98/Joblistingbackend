// const express = require('express')
// const router = express()
// const { PotalDataModel, JOBCREATE } = require('./userScima');

// router.use(express.json());
// router.use(express.urlencoded({extended:true}));

// router.post("/protected", async (req, res) => {
//     try{

//     console.log("ok", req.body);
//     const { name, logourl, position, salary, jobtype, worktype, location, description, about, skills, information } = req.body

//     const jobfild = await new JOBCREATE({
//         name,
//         logourl,
//         position,
//         salary,
//         jobtype,
//         worktype,
//         location,
//         description,
//         about,
//         skills,
//         information,

//     });
//     await jobfild.save();
//     res.status(200).json({message:` User register successfully`, jobfild})
// }catch(error){
//     console.log("Error:", error.message)
//     res.status(500).json("internal server error",error)
// }
// })
// module.exports = router;