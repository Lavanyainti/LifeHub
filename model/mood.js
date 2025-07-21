const mongoose=require('mongoose')
const moodSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    addedOn:{
        type:Date,
        require:true
    }
})
module.exports=mongoose.model("Journal",moodSchema);

