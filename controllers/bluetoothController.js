const bluetoothModel = require('../models/bluetoothModel.js')

exports.getBluetooth = (req, res)=>{

    console.log('Bluetooth ID: ' + req.params.id);

    bluetoothModel.getBluetooth(req.params.id, req.query.status)
    .then(result => {        

        result.forEach(item => {
            if(!item.quest.questId){

                item.bluetoothSensor.status = 'Available'
                delete item.quest
                delete item.exhibition

            }else {

                item.bluetoothSensor.status = 'linked'

            }
        });

        if(result.length > 1){

            res.send({ data : result})

        }else {

            res.send({ data : result[0]})

        }


    })
    .catch(err => {
        console.log(err)
        res.send({ errorCode: 500, errorMessage: err.message })
    })
    
}