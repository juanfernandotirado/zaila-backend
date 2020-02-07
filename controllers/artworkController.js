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

exports.getArtworkById = (req, res) => {
    
}
exports.createArtwork = (req, res) => {

    let artwork = req.body.artwork
    
    //Save artwork record
    artworkModel.createArtwork(artwork)
        .then((result) => {
            
            artwork.artworkId = result.insertId

            artworkModel.createArtworkDetails(artwork.artworkDetails, artwork.artworkId)
                .then(resultDetails => {

                        artwork.artworkDetails.forEach((detail, index) => {
                        detail.artworkDetailsId = resultDetails[index].insertId
                    }); 
                      
                    console.log("===>"+JSON.stringify(artwork))
                    res.send(artwork)
                })
                .catch(err=>{
                    console.log(err)
                    res.send({errorCode: err.code, errorMessage: err.sqlMessage});   
                })
        })
        .catch(err=>{
            console.log(err)
            res.send({errorCode: err.code, errorMessage: err.sqlMessage});   
        })
}