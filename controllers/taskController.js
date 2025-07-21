const task=require('../model/tasks');

exports.createTask=async (req,res)=>{
    try{
        const {title,desc}=req.body;
     if (!title || !desc) {
      return res.status(400).json({ message: "Title and description are required" });
    }
    const newTask=new task({
        user:req.user._id,
        title,
        desc,
    });

    const savedTask=await newTask.save();

    if(savedTask){
        res.status(200).json(savedTask);//sends entire task along with id status...
    }
    }catch(err){
        res.status(400).json({message:"Error while adding: ",err:err.message})
    }

}

exports.getTask=async (req,res)=>{
    try{
        const tasks=await task.find({user:req.user._id})
        res.status(200).json(tasks);
    }catch(err){
        res.status(400).json({message:"Server message"})
    }
}

exports.updateStatus=async (req,res)=>{
    const {status,completedOn}=req.body;
   try{
     const updatedTask=await task.findOneAndUpdate(
        {_id:req.params.id,user:req.user._id},//_id is the unique ID of the task (MongoDB automatically gives every document an _id), PUT /tasks/64d1234abc567, Here, req.params.id will be 64d1234abc567.
        {status,completedOn},//updating these
        {new:true,runValidators:true}
    )
    if(updatedTask){
        res.status(200).json(updatedTask);
    }
   }catch(err){
        res.status(400).json({message:"Cant update",err:err.message})
   }
}

exports.deleteTask=async (req,res)=>{
    try{
        const deletedTask=await task.findOneAndDelete({_id:req.params.id,user:req.user.id})
        if(deletedTask){
            res.status(200).json({message:"Deleted succesfully"});
        }
    }catch(err){
        res.status(400).json({message:"Error while deleting"})
    }
}