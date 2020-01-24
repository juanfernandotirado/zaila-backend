const artworkModel = require('../models/artworkmodel.js');

exports.getAllArtwork = (req, res) => {

    console.log("inside getAllArtwork controller")
    artworkModel.getAllArtwork()
        .then(result=>{
            console.log('Read Result'+result)
            res.send(result)
        })
        .catch(err => {console.log(err)})
}

exports.createArtwork = (req, res) => {

    let artwork = {
        title : req.body.title,
        author : req.body.author,
        description : req.body.description
    }
    //console.log("new artwork:"+ artwork.title)
    artworkModel.createArtwork(artwork)
        .then((result) => {
            console.log('saved: '+ result)
            res.send(result);    
        })
        .catch(err=>{console.log(err)})
}