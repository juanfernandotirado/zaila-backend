const express = require('express')
const router = express.Router()

const bluetoothController = require("../controllers/bluetoothController.js");

router.get('/:id?', bluetoothController.getBluetooth)

exports.bluetoothRouter = router;