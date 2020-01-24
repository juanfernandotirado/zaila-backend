const sensorModel = require('../models/sensors.js')


const getAllSensors = (req, res, next)=>{
    console.log('reached sensor controller')
    res.send(sensorModel.getAllSensors())
}

exports.getAllSensors=getAllSensors