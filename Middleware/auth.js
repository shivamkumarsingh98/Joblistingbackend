const jwt = require('jsonwebtoken')
const SECRET_KEY = "NODESAPI"
const auth = (req,res,next)=>{
    try{

        let token = req.headers.authorization;
        
        if(token){

            token = token.split(" ")[1];
            let user = jwt.verify(token,SECRET_KEY);
            req.userId = user.newUser    
        }
        else{
            res.status(401).json({message: "Unauthorize User"})
        }
        next()
    } catch (error){
        console.log(error);
        res.status(401).json({message:"Unauthorize User"});
    }
}
module.exports = auth