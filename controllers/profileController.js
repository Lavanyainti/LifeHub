const Profile=require('../model/profile')

const createProfile=async (req,res)=>{
    try{
            const { nickName, language, country, mobile, designation, gender } = req.body;
            if(!nickName || !language || !country ||!mobile || !designation ||!gender){
                return res.status(400).json({message:"All fields are required"});
            }

            const newProfile=new Profile({
                user:req.user._id,//same as model schema //id: this id is same at every use
                nickName,
                language,
                country,
                mobile,
                designation,
                gender
            })
            console.log("🔐 req.user = ", req.user);

            await newProfile.save();
            res.status(200).json({message:"Profile created successfully"})
    }catch(err){
        console.error("Server Error:", err);
        res.status(500).json({message:"Server error",err:err.message})
    }
}

const getProfile=async (req,res)=>{
    const profile=await Profile.findOne({user:req.user._id})
    if(!profile){
        return res.status(400).json({message:"Could not found the profile"})
    }

    res.status(200).json({profile})
}

const updateProfile=async (req,res)=>{
    try{
        const updated=await Profile.findOneAndUpdate(
            {user:req.user._id},
            {...req.body},//this contains {nickNAme:"Vinayaka",....} like this
            {new:true, runValidators:true}//by default By default, findOneAndUpdate returns the old document (before update), If new: true, it returns the updated document
            //runValidators: true, Forces Mongoose to run schema validators during update (like required fields, types, custom validations, etc.), Without this, validation only happens on .save(), not on update
        );
        if(updated){
            return res.status(200).json({message:"Profile updated successfully"})
        }
    }catch(err){
        res.status(400).json({message:"Profile cant be updated"+err.message})
    }
}

const profileController={
    createProfile,
    getProfile,
    updateProfile
}


module.exports=profileController;