const express = require("express");
const router = express.Router();

const museumController = require("../controllers/museumController.js");


router.get('/:museumId?', museumController.getAllMuseum);




exports.museumRouter = router;