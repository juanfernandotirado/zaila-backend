const express = require('express')
const router = express.Router()

const {getAllSensors} = require('../controllers/sensorsController.js')

// const {hello} = require('../test.js')

router.get('/all', getAllSensors)

exports.sensorsRouter = router;