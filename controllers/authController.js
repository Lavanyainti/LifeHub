const User=require('../model/Users')
const jwt=require('jsonwebtoken')
require('dotenv').config();

const secret=process.env.JWT_SECRET;

async function registerUser(req,res) {
    let {name,email,password}=req.body;
    const photo = req.file ? req.file.path : null; 
    try{
        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:'User Already Existed'})
        }

        const newUser=new User({name,email,password,photo});
        const result=await newUser.save();
        console.log(result)
        return res.status(200).json({message:"User Registered Successfully.!",
            user: {
                id: result._id,
                name: result.name,
                email: result.email,
                photo: result.photo
            }
        })
    }catch(err){
        console.log(err);
         res.status(500).json({message:"Somehting went wrong", error:err.message})
    }
}

async function loginUser(req,res) {

    try{
        let {email,password}=req.body
        if(!email || !password){
            return res.status(400).json({message:"Require all the fields"})
        }

        const user=await User.findOne({email});//it gives copy of User model with that email
        if(!user){
            return res.status(500).json({message:"User not found"})
        }
        const isValidPassword=await user.comparePassword(password);
        if(!isValidPassword){
            return res.status(400).json({message:"Invalid Password"})
        }


        let token=await jwt.sign({id:user._id},secret,{expiresIn:"1hr"});//"id:" this id same at every use

        let finalData={
            id:user?._id,//this id same at every use
            name:user?.name,
            email:user?.email,
            photo:user?.photo,
            token
        }
       return res.status(200).json({
            message: "User Logged In Successfully",
            data: finalData
            });

    }catch(err){
        console.log(err)
        res.status(500).json({message:"Something went wrong",error:err.message})
    }

    
    
}

const AuthController={
    registerUser,
    loginUser
}//we are exporting function

module.exports=AuthController