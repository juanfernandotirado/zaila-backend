const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://juantirado:juantirado@cluster0-fuumq.gcp.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true})

    .then(()=>{

        console.log('*** Connected to MongoDB...')

        conectionLog = '*** Connected to MongoDB...'

    })
    .catch(error=>{console.log('*** Error:' + error)})


// Create Schema
// const Schema = mongoose.Schema

// const SensorSchema = new Schema({
//     SensorId: String,
//     Status: String
// })

// Assign the new Sensor Schema to a model(a.k.a to a collection that will follow the Schema)
// const Sensor =  mongoose.model('sensors',SensorSchema)

// let Schema = mongoose.Schema;
// let MyModel = mongoose.model('sensors', new Schema({ 
//     SensorId: String , 
//     Status: String 
// }));

// let Sensor = mongoose.model('sensors', MyModel.schema);

// Returns an array of all the sensors

const getAllSensors = ()=>{

    let Schema = mongoose.Schema;
    let MyModel = mongoose.model('test', new Schema({ 
        name: String , 
        owner: String , 
        friends : [] 
    }));

    const dog = mongoose.model('dogs', MyModel.schema);

    let array = []

    // Sensor.find().then(r=>{
    //     console.log(r)
    //     sensorsArray = r
    // })

    dog.find({}).then(r=>{array=r}).catch(e=>{console.log('****' + e)})

    return array


}

exports.getAllSensors=getAllSensors