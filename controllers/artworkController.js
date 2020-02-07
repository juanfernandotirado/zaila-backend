const artworkModel = require('../models/artworkModel.js');

exports.getAllArtwork = (req, res) => {

    console.log(req.query.sensorId);
    console.log(req.query.language);

    let artworksArray 
    let detailsArray

    if(req.query.sensorId == undefined){

        console.log("*** Get All ***")

        //1. Get all artworks
        artworkModel.getAllArtwork()

        //2. Store the artworks and get all descriptions
        .then(result=>{
            artworksArray = result
            return artworkModel.getAllDescriptions()
        })

        //3. Store the descriptions
        .then(result=>{
            detailsArray = result

            //3.1 Map the artworks to append the respective array of details
            let finalResponse = artworksArray.map(item=>{

                let respectiveDetailsArray = detailsArray.filter(detail=>{
                    return item.artwork.artworkId == detail.artworkDetails.artworkId
                })

                //3.1.1 Appending the array to the details array as a new property of the artwork
                item.artwork.artworkDetailsArray = respectiveDetailsArray

                return item

            })

            res.send({ 'data':finalResponse} )

        })
        .catch(err => {console.log(err)})
    }else{
        console.log('*** Get Artwork By Sensor Id & Language Code ***');
        
        artworkModel.getArtworkBySensorId(req.query.sensorId, req.query.language)
        .then(result=>{
            console.log('Read Result'+result)
            res.send(result)
        })
        .catch(err => {console.log(err)})
        
    }

}


exports.getArtworkById = (req, res) => {

    console.log("*** Get Artwork By Id ***")

    console.log(req.params.artworkId);

    let artwork
    let artworkDetails

    if(req.query.language == undefined){

        artworkModel.getArtworkById(req.params.artworkId)
        .then(result=>{
            
            artwork = result
            return artworkModel.getArtworkDetailsByArtworkId(req.params.artworkId)
            
        })
        .then(result =>{

            artworkDetails = result

            artwork[0].artwork.artworkDetailsArray = artworkDetails

        })
        .then(()=>{

            res.send(artwork)
        })
        .catch(err => {console.log(err)})

    }else{

        artworkModel.getArtworkByIdAndLanguage(req.params.artworkId, req.query.language)
        .then(result=>{
            console.log('Read Result'+result)
            res.send(result)
        })
        .catch(err => {console.log(err)})

    }
    
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