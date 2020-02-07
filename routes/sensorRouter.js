const express = require('express')
const router = express.Router()

const sensorController = require("../controllers/sensorController.js");

// This is to handle:
// Retrieve all artework. example:  /api/sensor/
router.get('/:id?', sensorController.getSensors)

exports.sensorRouter = router;