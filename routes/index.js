const express = require('express')
const router = express.Router()

const {artworkRouter} = require('./artworkRouter.js');
const {sensorRouter} = require('./sensorRouter.js');
const {storageRouter} = require('./storageRouter.js');
const {exhibitionRouter} = require('./exhibitionRouter.js');
const {museumRouter} = require('./museumRouter.js');
const {questRouter} = require('./questRouter.js');
const {bluetoothRouter} = require('./bluetoothRouter.js');

router.use('/artwork', artworkRouter)
router.use('/sensor', sensorRouter)
router.use('/storage', storageRouter)
router.use('/exhibition', exhibitionRouter)
router.use('/museum', museumRouter)
router.use('/quest', questRouter)
router.use('/bluetooth', bluetoothRouter)

exports.routerIndex = router;