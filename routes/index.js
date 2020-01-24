const express = require('express')
const router = express.Router()

const {artworkRouter} = require('./artworkRouter.js');

router.use('/artworks', artworkRouter)

exports.routerIndex = router;