const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController.js');

//public endpoint to register / Sign Up a new user (no JWT is checked for this route) 
router.post('/registerUser', userController.createUser)

//public endpoint to login / Sign In an existing user (JWT is created in this route if credentials are valid) 
router.post('/login', userController.signInUser)

exports.authRouter = router;