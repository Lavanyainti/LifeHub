const mongoose=require('mongoose');
const taskSchema=new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},//need to user attribute only at every place for profile
    title:{type:String,required:true},
    desc:{type:String,required:true},
    status:{type:String, enum:["incomplete","Completed"], default:"incomplete"},//enum defines that status contains only these values
    completedOn:{type:String}//works only when status changes, at first it is empty we dont give any value while adding task
},{timestamps:true})//timestamp by default contains two things, completedAt and updatedAt

module.exports=mongoose.model("Task",taskSchema)