const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController.js');

//Endpoint to read information from a user given their userId
router.get('/:userId', userController.getUser)

exports.userRouter = router;