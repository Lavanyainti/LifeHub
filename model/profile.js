const mongoose=require('mongoose');

const userProfile=new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",//this collection name
        required: true
    },  /*need to write this in the schema. Because even though you already have req.user._id from the token on the backend:

        That is only available during the request.
        It is not automatically stored in the MongoDB Profile document.

        To permanently store the user’s ID inside the profile data, you must define a field in your Profile schema to hold it.*/
    nickName:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    }
})

const Profile=mongoose.model("profile",userProfile);
module.exports=Profile;