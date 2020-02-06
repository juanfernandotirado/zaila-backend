const {cp} = require("../db/connection.js"); 
const {query} = require("../db/promise-mysql.js");

exports.getAllSensors = () => {

    console.log('Sensor Model Reached!!!');
    
    var options = `SELECT * FROM nfcSensor`

    return query(cp, options)
}

exports.getSingleSensorById = (sensorId) => {

    console.log('Sensor Model Reached!!!');
    
    var options = `SELECT *
    FROM nfcSensor
    WHERE nfcSensorId = "${sensorId}"`

    return query(cp, options)
}