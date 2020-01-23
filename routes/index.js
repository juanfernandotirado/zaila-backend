const express = require('express')
const router = express.Router()

const {sensorsRouter} = require('./sensors_routes')

router.use('/sensors', sensorsRouter)

exports.routerIndex = router;