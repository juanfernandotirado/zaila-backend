const artworkModel = require('../models/artworkModel.js');
const activityLogModel = require('../models/activityLogModel.js')
const userModel = require('../models/userModel.js')
const {validationResult} = require('express-validator');
const {body} = require('express-validator')

exports.getAllArtwork = (req, res) => {

    console.log(req.query.sensorId);
    console.log(req.query.language);

    let user = req.body.signedUser

    let artworksArray
    let detailsArray

    if (req.query.sensorId == undefined) {

        console.log("*** Get All ***")

        //1. Get all artworks
        artworkModel.getAllArtwork(req.query.search, req.params.exhibitionId)

            //2. Store the artworks and get all descriptions
            .then(result => {
                artworksArray = result
                return artworkModel.getAllDescriptions()
            })

            //3. Store the descriptions
            .then(result => {
                detailsArray = result

                //3.1 Map the artworks to append the respective array of details
                let finalResponse = artworksArray.map(item => {

                    let respectiveDetailsArray = detailsArray.filter(detail => {
                        return item.artwork.artworkId == detail.artworkId
                    })

                    //3.1.1 Appending the array to the details array as a new property of the artwork
                    item.artwork.artworkDetails = respectiveDetailsArray

                    return item

                })

                console.log('*** Search Returned ***');

                if (finalResponse.length == 0) {
                    res.send({ message: 'No matches found', 'data': finalResponse })
                } else {
                    res.send({ 'data': finalResponse })
                }

            })
            .catch(err => { 
                console.log(err) 
                res.send({ errorCode: 500, errorMessage: err.message })
            })

    } else {
        console.log('*** Get Artwork By Sensor Id & Language Code ***');
        console.log('*** User: ' + user.userId);

        let artwork
        let detailsArray
        let updatedUser

        artworkModel.getArtworkBySensorId(req.query.sensorId)
            .then(result => {
                console.log('getArtworkBySensorId: ' + result)
                artwork = result

                return artworkModel.getArtworkDetailsByArtworkId(artwork[0].artworkId, req.query.language)
            })
            .then(result => {

                detailsArray = result

                return activityLogModel.getActivityLog(user,artwork[0])

            })
            .then(result => {

                let XP

                if (result.length == 0){
                    console.log('*** XP + 10');
                    XP = 10
                    // This method returns the results of 2 queries, Update the user and return the updated user
                    // So the result is an array with another array inside
                    return userModel.updateUserXP(user.userId, (XP + 10))
                    .then(result =>{
                        // Only the user object of the whole response is needed
                        updatedUser = result[1][0]
                        return activityLogModel.createActivityLog(user,artwork[0])
                    })
                    .catch(err => { 
                        console.log(err) 
                        res.send({ errorCode: 500, errorMessage: err.message })
                    })
                }else {
                    console.log('*** No XP');
                    XP = 0
                    // This method returns the results of 2 queries, Update the user and return the updated user
                    // So the result is an array with another array inside
                    return userModel.updateUserXP(user.userId, (XP + 0))
                    .then(result =>{
                        // Only the user object of the whole response is needed
                        updatedUser = result[1][0]
                        return activityLogModel.createActivityLog(updatedUser,artwork[0])
                    })
                    .catch(err => { 
                        console.log(err) 
                        res.send({ errorCode: 500, errorMessage: err.message })
                    })
                    
                }

            })
            .then(result =>{

                // let finalResponse

                artwork[0].artworkDetails = detailsArray
                // finalResponse.user = updatedUser

                let data = {
                    'artwork': artwork[0],
                    'user': updatedUser
                }
                

                res.send({ 'data': data})

            })
            .catch(err => { 
                console.log(err) 
                res.send({ errorCode: 500, errorMessage: err.message })
            })

    }

}


exports.getArtworkById = (req, res) => {

    console.log("*** Get Artwork By Id ***")

    console.log(req.params.artworkId);

    let artwork
    let artworkDetails

    if (req.query.language == undefined) {

        artworkModel.getArtworkById(req.params.artworkId)
            .then(result => {
                console.log('--->', result)
                artwork = result
                return artworkModel.getArtworkDetailsByArtworkId(req.params.artworkId)

            })
            .then(result => {

                artworkDetails = result

                artwork[0].artwork.artworkDetails = artworkDetails

            })
            .then(() => {

                res.send({ data: artwork[0] })
            })
            .catch(err => { 
                console.log('--->',err) 
                res.send({ errorCode: 500, errorMessage: err.message })
            })

    } else {

        artworkModel.getArtworkByIdAndLanguage(req.params.artworkId, req.query.language)
            .then(result => {

                let artworkDetails = []

                result[0].artwork.artworkDetails = artworkDetails

                result[0].artwork.artworkDetails.push(result[0].artworkDetails)

                delete result[0].artworkDetails

                res.send({ data: result[0] })
            })
            .catch(err => { 
                console.log(err) 
                res.send({ errorCode: 500, errorMessage: err.message })
            })

    }

}


exports.createArtwork = (req, res) => {

    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
        console.log("errors in validation: ", errors.array())
        res.status(422);
        res.send({ errors: errors.array()})
        return;
    }

    let artwork = req.body.artwork

    //Save artwork record
    artworkModel.createArtwork(artwork)
        .then((result) => {

            artwork.artworkId = result.insertId

            return artworkModel.createArtworkDetails(artwork.artworkDetails, artwork.artworkId)
        })
        .then(resultDetails => {

            artwork.artworkDetails.forEach((detail, index) => {
                detail.artworkDetailsId = resultDetails[index].insertId
            });

            console.log("===>" + JSON.stringify(artwork))
            res.send(artwork)

        })
        .catch(err => {
            console.log(err)
            res.send({ errorCode: err.code, errorMessage: err.sqlMessage });
        })
}

exports.updateArtwork = (req,res) => {

    console.log('update')
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
        console.log("errors in validation: ", errors.array())
        res.status(422);
        res.send({ errors: errors.array()})
        return;
    }

    artworkModel.updateArtwork(req.body.artwork, req.body.artwork.artworkDetails)
    .then(result =>{

        res.send(req.body.artwork)

    })
    .catch(err => {
        console.log(err)
        res.send({ errorCode: err.code, errorMessage: err.sqlMessage });
    })

}

exports.validate = (method) => {
    switch (method) {
        case 'createArtwork': {
            return [ 
                body('artwork', 'artwork object is mandatory').exists(),
                body('artwork.exhibitionId', 'exhibitionId is mandatory').not().isEmpty(),
                body('artwork.sensorId', 'sensorId is mandatory').not().isEmpty(),
                body('artwork.title', 'title is mandatory').not().isEmpty(),
                body('artwork.imageURL', 'imageURL is mandatory').not().isEmpty(),
                body('artwork.width', 'width is mandatory').not().isEmpty(),
                body('artwork.height', 'height is mandatory').not().isEmpty(),
                body('artwork.artworkDetails', 'artworkDetails must have at least one item').not().isEmpty()
            ]   
        }
        case 'updateArtwork': {
            return [ 
                body('artwork', 'artwork object is mandatory').exists(),
                body('artwork.artworkId', 'artworkId is mandatory').not().isEmpty(),
                body('artwork.exhibitionId', 'exhibitionId is mandatory').not().isEmpty(),
                body('artwork.sensorId', 'sensorId is mandatory').not().isEmpty(),
                body('artwork.title', 'title is mandatory').not().isEmpty(),
                body('artwork.imageURL', 'imageURL is mandatory').not().isEmpty(),
                body('artwork.artworkDetails', 'artworkDetails must have at least one item').not().isEmpty(),
                body('artwork.artworkDetails').custom((value, { req }) => {
                    let artworkDetails = value

                    console.log('*** Custom Validator Value: ' + JSON.stringify(artworkDetails));
                    
                        console.log("test",artworkDetails)

                        for (let i = 0; i < artworkDetails.length; i++) {
                            if (artworkDetails[i].artworkDetailsId == undefined){
                                console.log("test",(artworkDetails[i].artworkDetailsId))
                                throw new Error('artworkDetails.artworkDetailsId is mandatory');
                            }
                            else if (artworkDetails[i].artworkDetailsId.length == 0) {
                                console.log("test===",(artworkDetails[i].artworkDetailsId))
                                throw new Error('artworkDetails.artworkDetailsId is mandatory');    
                            } 
                        }

                        return true;   
                    
                })
                //add new validation for update here
            ]   
        }
    }
}