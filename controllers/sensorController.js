const sensorModel = require('../models/sensorModel.js')
const artworkModel = require('../models/artworkModel.js')

exports.getSensors = (req, res)=>{

    console.log('Sensor ID: ' + req.params.id);

    sensorModel.getSensors(req.params.id, req.query.status)
    .then(result => {        

        result.forEach(item => {
            if(!item.artwork.artworkId){

                item.sensor.status = 'Available'
                delete item.artwork

            }else {

                item.sensor.status = 'linked'

            }
        });

        res.send(result)


    })
    .catch(err => {console.log(err)})
    
}

