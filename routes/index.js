const express = require('express')
const router = express.Router()

const {artworkRouter} = require('./artworkRouter.js');
const {sensorRouter} = require('./sensorRouter.js');

router.use('/artwork', artworkRouter)
router.use('/sensor', sensorRouter)

exports.routerIndex = router;