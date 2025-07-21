const Journal=require('../model/mood');
const { all } = require('../routes/taskRouter');

exports.addThoughts=async (req,res)=>{
    const {title,desc,addedOn}=req.body;
    if(!title || !desc || !addedOn){
        return res.status(400).json({message:"All fields are required"})
    }
   try{
         const newThought=new Journal({
        user:req.user._id,
        title,
        desc,
        addedOn
    })
    const addThought=await newThought.save();
    if(addThought){
        res.status(200).json(addThought)
    }
   }catch(err){
    res.status(400).json("Error while adding")
   }

}

exports.getThoughts=async (req,res)=>{
    try{
        const allThoughts=await Journal.find({user:req.user._id});
        if(allThoughts){
            res.status(200).json(allThoughts)
        }
    }catch(err){
        res.status(400).json({message:"Error while fetching"});
    }
}