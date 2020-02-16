const express = require("express");
const router = express.Router();


const exhibitionController = require("../controllers/exhibitionController.js");


router.get('/', exhibitionController.getAllExhibition);

router.get('/:exhibitionId',exhibitionController.getAllExhibition);

router.post('/',exhibitionController.createExhibition);


exports.exhibitionRouter = router;