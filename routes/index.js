const express = require('express')
const router = express.Router()

const {artworkRouter} = require('./artworkRouter.js');
const {sensorRouter} = require('./sensorRouter.js');
const {storageRouter} = require('./storageRouter.js');
const {exhibitionRouter} = require('./exhibitionRouter.js');
const {museumRouter} = require('./museumRouter.js');
const {userRouter} = require('./userRouter.js');
const verifyJwt = require('../middleware/authorization');

// use JWT middleware to verify JWT is valid
router.use(verifyJwt)

router.use('/artwork', artworkRouter)
router.use('/sensor', sensorRouter)
router.use('/storage', storageRouter)
router.use('/exhibition', exhibitionRouter)
router.use('/museum', museumRouter)
router.use('/user', userRouter)

exports.routerIndex = router;