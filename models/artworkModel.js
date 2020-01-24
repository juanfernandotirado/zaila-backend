const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require("dotenv").config();

//mongoose.connect('mongodb+srv://juan:juan9823@cluster0-fuumq.gcp.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true})

mongoose.connect(process.env.DB_CONN, {useNewUrlParser: true})
    .then(()=>console.log('Connnected!!!'))
    .catch(err=>console.log(err));

const ArtworkSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: Date.now
    },
    date: {
        type: Date,
        default: Date.now
    }

});

const Artwork = mongoose.model('artwork', ArtworkSchema);

exports.getAllArtwork = () => {
    return Artwork.find();
}

exports.createArtwork = (artwork) => {
    const newArtwork = new Artwork({
        title: artwork.title,
        author: artwork.author,
        description: artwork.description
    })
    
   return newArtwork.save();
        
}

