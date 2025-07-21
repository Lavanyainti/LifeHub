const express=require('express');
const authmiddleware=require('../Middleware/authmiddleware')
const {addThoughts, getThoughts}=require('../controllers/MoodController')
const router=express.Router();

router.post('/thoughts',authmiddleware,addThoughts);
router.get('/thoughts',authmiddleware,getThoughts);
module.exports=router;
