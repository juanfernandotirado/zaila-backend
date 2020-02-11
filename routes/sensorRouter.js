const express = require('express')
const router = express.Router()

const sensorController = require("../controllers/sensorController.js");

// This is to handle:
// Retrieve all sensors. example:  /api/sensor/
router.get('/:id?', sensorController.getSensors)

exports.sensorRouter = router;