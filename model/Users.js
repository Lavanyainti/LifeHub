const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const userScheema=new mongoose.Schema({
    name:String,
    email:{
        type:String,
        required:true
    },
     password:{
        type:String,
        required:true
    },
     photo: {
        type: String, // we’ll store just the filename, not the whole image
        default: null
    }
})


userScheema.pre('save', async function(next){//asynch containes this next feature go to next after this function
    const user=this;//take reference of userScheema optional
    if(!user.isModified){//prevent hasing when not needed, it it is hashed then dont do again. Go to next if it is not modified or fresh data otherwise do hash if it is modifoied or fresh data
        return next();
    }
    let salt=await bcrypt.genSalt(10);//for number of rounds
    let hash=await bcrypt.hash(user.password,salt);
    user.password=hash;
    next();
})//encryption


userScheema.methods.comparePassword=async function(password)  {//decryption
    return bcrypt.compare(password,this.password)
}//comparePassword is our defined method, password is user typed password and this.password is hashed one
const Users=mongoose.model("Users",userScheema)//Users is the model and mongodb collection name

module.exports=Users;