const express = require("express");
const router = express.Router();

const questController = require("../controllers/questController.js");


router.get('/', questController.getAllQuest);

router.post('/', questController.createQuest);



exports.questRouter = router;