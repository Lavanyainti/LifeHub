const jwt=require('jsonwebtoken');
const user=require('../model/Users');
require('dotenv').config();

const protect=async (req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        try{
            const token=authHeader.split(" ")[1];
            console.log(token)
            const decoded=jwt.verify(token, process.env.JWT_SECRET);
            console.log("🔑 Decoded token = ", decoded);
            req.user=await user.findById(decoded.id).select("-password");//we are getting user details with that id except password, id along with the token is the user id we attached along with the token while creation
                    /*    when we decoded we get result like this decoded={
                                                                        "id": "64cb9f07a1c2e3d408a4bc19", 
                                                                        "iat": ..., 
                                                                        "exp": ...
                                                                       }   */
            console.log("👤 User from DB:", req.user); 
            next();
        }catch(err){
            return res.status(401).json({message:"Invalid token"})
        }
    }else{
        return res.status(400).json({message:"No token provided"})
    }
}
module.exports=protect;