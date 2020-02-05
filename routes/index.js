const express = require('express')
const router = express.Router()

const {artworkRouter} = require('./artworkRouter.js');

router.use('/artwork', artworkRouter)

exports.routerIndex = router;