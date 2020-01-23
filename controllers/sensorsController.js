const mongoose = require('mongoose')

// Create Schema
const Schema = mongoose.Schema

const SensorSchema = new Schema({
    SensorId: String,
    Status: String
})

// Assign the new Sensor Schema to a model(a.k.a to a collection that will follow the Schema)
const Sensor =  mongoose.model('sensors',SensorSchema)

////////////////////////////////////////////////////////////////////////////////////////////

// Require the models
// const Sensor = require('../models/sensors.js')

////////////////////////////////////////////////////////////////////////////////////////////

// Returns an array of all the sensors

const getAllSensors = (req, res, next)=>{
    
    //  res.send('Hola')

    Sensor.find()

        .sort({sensorID: -1})

            .then(sensors => {

                res.send(sensors)

            })
                .catch(err => {
                    if (err) {
                        const e = new Error(err)
                        e.status = 404

                        next(e)
                    } else {
                        next(err)
                    }
                })

}

exports.getAllSensors=getAllSensors