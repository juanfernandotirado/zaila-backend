const express = require("express");
const router = express.Router();


const exhibitionController = require("../controllers/exhibitionController.js");
const artworkController = require("../controllers/artworkController.js");


router.get('/', exhibitionController.getAllExhibition);

router.get('/:exhibitionId',exhibitionController.getAllExhibition);

router.get('/:exhibitionId/artwork', artworkController.getAllArtwork);

router.post('/', exhibitionController.validate('createExhibition'),exhibitionController.createExhibition);

router.put('/:exhibitionId', exhibitionController.validate('updateExhibition'),exhibitionController.updateExhibition);


exports.exhibitionRouter = router;