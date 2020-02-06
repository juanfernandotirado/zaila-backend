const sensorModel = require('../models/sensorModel.js')


exports.getSensors = (req, res)=>{

    console.log('Sensor ID: ' + req.params.id);

    if (req.params.id == undefined){

    console.log('**** Get All Sensors ****')
    sensorModel.getAllSensors()
    .then(result=>{
        res.send(result)
    })
    .catch(err => {console.log(err)})


}else{

    console.log('**** Get Single Sensors By Id ****')
    sensorModel.getSingleSensorById(req.params.id)
    .then(result=>{
        res.send(result)
    })
    .catch(err => {console.log(err)})

}
    
}

