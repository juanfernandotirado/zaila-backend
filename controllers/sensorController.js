const sensorModel = require('../models/sensorModel.js')
const artworkModel = require('../models/artworkModel.js')

exports.getSensors = (req, res)=>{

    console.log('Sensor ID: ' + req.params.id);

    if (req.params.id == undefined){

    let sensorsArray = []
    let finalSensorsArray = []

    console.log('**** Get All Sensors ****')
    sensorModel.getAllSensors()
    .then(result =>{

        sensorsArray = result

        return artworkModel.getAllArtwork()

    })
    .then(result=>{

        sensorsArray.forEach(sensor =>{

            result.forEach(artwork => {

                console.log('NFCSensor = ' + sensor.nfcSensorId + ' ------ ArtworkSensor = ' + artwork.sensorId);

                if(sensor.nfcSensorId == artwork.sensorId){
                    
                    sensor.status = 'linked'
                    sensor.title = artwork.title
                    sensor.artworkId = artwork.artworkId
                    sensor.exhibitionId = artwork.exhibitionId

                    finalSensorsArray.push(sensor)


                }else {

                    sensor.status = 'available'

                    finalSensorsArray.push(sensor)

                }

            })
        })

        res.send(sensorsArray)
    })
    .catch(err => {console.log(err)})


}else{

    console.log('**** Get Single Sensors By Id ****')

    let sensorResult

    sensorModel.getSingleSensorById(req.params.id)
    .then(result=>{

        sensorResult = result[0]

        return artworkModel.getArtworkBySensorId(sensorResult.nfcSensorId)

    })
    .then(result =>{

        if (result.length == 0){
            sensorResult.status = "available"
        }else {

            sensorResult.status = "linked"
            sensorResult.title = result[0].title
            sensorResult.artworkId = result[0].artworkId
            sensorResult.exhibitionId = result[0].exhibitionId

        }

        res.send(sensorResult)

    })
    // .then(result =>{

    //     res.send(sensorResult)

    // })
    .catch(err => {console.log(err)})

}
    
}

