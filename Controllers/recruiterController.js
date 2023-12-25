const jobScima = require('../Models/jobScima');


const admin = async (req,res)=>{
    try{

            console.log("ok", req.body);
            const { name, logourl, position, salary, jobtype,worktype,location,description,about,skills,information, } = req.body
        
            const jobfild =  new jobScima({
                name,
                logourl,
                position,
                salary,
                jobtype,
                worktype,
                location,
                description,
                about,
                skills,
                information,
        
            });
            await jobfild.save();
            res.status(200).json({message:` User register successfully`, jobfild})
        }catch(error){
            console.log("Error:", error.message)
            res.status(500).json("internal server error",error)
        }

}


module.exports={admin} 