const jobScima = require('../Models/jobScima');

const jobpost = async (req,res)=>{
console.log(req.userId)
try{

    console.log("ok", req.body);
    const { name,
         logourl,
          position, 
          salary, 
          jobtype,
          worktype,
          location,
          description,
          about,
          skills,
          information, } = req.body
          const recruiterName = req.body.name;
          let skillArray = skills;
          if(typeof skills === 'string'){
            skillArray = skills.split(',').map(skill => skill.trim());
          }

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
        skills:skillArray,
        information,

    });
    await jobfild.save();
    res.status(200).json({message:` User register successfully`, name: recruiterName})
}catch(error){
    console.log("Error:", error.message)
    res.status(500).json("internal server error",error)
}
}

const updatejob = async (req,res)=>{
    const jobId = req.params.id
    const{name,jobtype,skills}= req.body;
    const recruiterName = req.body.name;

    try{
        const jobpost =await jobScima.findById(jobId);
        if(!jobpost){
            return res.status(404).json({ message: 'Job post not found' })
        }
        let skillArray = skills;
          if(typeof skills === 'string'){
            skillArray = skills.split(',').map(skill => skill.trim());
          }
        jobpost.name = name;
        jobpost.jobtype = jobtype;
        jobpost.skills = skillArray;
        jobpost.recruiterName = recruiterName;
        

        await jobpost.save();
        return res.json({ message: 'Job post updated successfully' });
    }catch(err){
        console.error(err);
        return res.status(500).json({ message: 'put request Internal server error' });

    }

}

const getjob = async (req,res)=>{
    const jobId = req.params.id;

  try {
    const jobpost = await jobScima.findById(jobId);

    if (jobpost) {
      return res.status(200).json({ message: 'Job post found',jobpost });
    }

    if (!jobpost) {
      return res.status(404).json({ message: 'Job post not found' });
    }

    return res.json({ jobpost });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }

}

const jobfilter = async (req,res) =>{

  const {jobtype, skills}= req.query;

  try{
    let query = {};
    if(jobtype){
      query.jobtype =jobtype;
    }
    if(skills){
      query.skills = {$in: skills.split('&')}

    }
    console.log("job:",query);
    const jobdata = await jobScima.find(query).sort({createdAt: -1})
    return res.json({jobdata});
  }catch (error){
console.log(error)
return res.status(500).json({message:"somthing error"})
  }
}




module.exports={jobpost,updatejob,getjob,jobfilter} 