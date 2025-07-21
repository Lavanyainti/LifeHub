const express=require('express');
const AuthContoller = require('../controllers/profileController');//we are taking entire page
const profileController = require('../controllers/profileController');
const router=express.Router();
const protect=require('../Middleware/authmiddleware');

router.post('/profile',protect,profileController.createProfile);
router.get('/profile',protect,profileController.getProfile);
router.put('/profile',protect,profileController.updateProfile)
module.exports=router;