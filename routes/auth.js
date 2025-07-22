const mongoose=require('mongoose')
const express=require('express');
const AuthContoller = require('../controllers/authController');//we are taking entire page
const router=express.Router();

const multer=require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../Config/cloudinary');
const path=require('path')

// Set up storage for uploaded files
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'lifehub-profile-photos',  // Cloudinary folder
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});
const upload = multer({ storage });


router.post('/register', upload.single('photo'), AuthContoller.registerUser);//we can directly write code here but we maintain structure so srite in controller it is completely optional

router.post('/login',AuthContoller.loginUser)
module.exports=router;//use it in server.js