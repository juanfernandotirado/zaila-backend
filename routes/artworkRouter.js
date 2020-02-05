const express = require("express");
const router = express.Router();

const artworkController = require("../controllers/artworkController.js");

// This is to handle:
// Retrieve all artework. example:  /api/artwork/
// Retrieve one artework by sensorID. example:  /api/artwork/?sensorId=12345ABCDE&language=en-CA
router.get('/', artworkController.getAllArtwork);

// This is to handle:
// Retrieve One artwork (path variable id). Example: /api/artwork/:artworkId
// Retrieve one artework by sensorID. example:  /api/artwork/:artworkId/?language=en-CA
router.get('/:artworkId', artworkController.getArtworkById);

router.post('/', artworkController.createArtwork)

exports.artworkRouter = router;