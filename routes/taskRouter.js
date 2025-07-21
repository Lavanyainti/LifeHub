const express=require('express');
const {createTask, getTask, updateStatus,deleteTask}=require("../controllers/taskController")
const authmiddleware=require('../Middleware/authmiddleware')
const router=express.Router();

router.post("/tasks",authmiddleware,createTask);
router.get("/tasks",authmiddleware,getTask);
router.patch("/tasks/:id",authmiddleware,updateStatus);
router.delete("/tasks/:id",authmiddleware,deleteTask)


module.exports=router;