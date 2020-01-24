const express = require("express");
const router = express.Router();

const artworkController = require("../controllers/artworkController.js");


router.get('/', artworkController.getAllArtwork);

router.post('/', artworkController.createArtwork)

exports.artworkRouter = router;