const express = require('express')
const router = express.Router()

const {artworkRouter} = require('./artworkRouter.js');
const {sensorRouter} = require('./sensorRouter.js');
const {storageRouter} = require('./storageRouter.js');

router.use('/artwork', artworkRouter)
router.use('/sensor', sensorRouter)
router.use('/storage', storageRouter)

exports.routerIndex = router;