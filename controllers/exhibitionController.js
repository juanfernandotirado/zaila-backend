const exhibitionModel = require('../models/exhibitionModel.js');
const artworkModel = require('../models/artworkModel.js');
const {validationResult} = require('express-validator');
const {body} = require('express-validator')


exports.getAllExhibition = (req, res) => {

    let search = req.query.search
    let exhibitionId = req.params.exhibitionId

    let userId = 1

    let exhibitionArray = []

    exhibitionModel.getAllExhibition(exhibitionId, search)

    .then(result =>{

        exhibitionArray = result.map(item =>{

            item.exhibition.exhibition_category = item.exhibition_category
            delete item.exhibition.categoryId
            delete item.exhibition_category

            return item

        })     
        
    })
    .then(result =>{

        if(exhibitionId && userId){

            let artworkCount

            return artworkModel.getAllArtwork(search, exhibitionId)
            .then(result =>{

                artworkCount = result.length

                return exhibitionModel.getTappedArtworks(exhibitionId, userId)

            })
            .then(result =>{

                let exhibitionProgress

                if(result[0].artworksTapped == 0){

                    exhibitionProgress = 0

                }

                exhibitionProgress = (result[0].artworksTapped) / artworkCount

                exhibitionArray[0].exhibition.exhibitionProgress = exhibitionProgress

                res.send({'data':exhibitionArray[0]})
                
            })

        }else {

            if (exhibitionArray.length == 0) {
                res.send({ message: 'No data found', 'data': exhibitionArray })
            } else if (exhibitionArray.length == 1){
                res.send({ 'data': exhibitionArray[0]})
            }else {
                res.send({ 'data': exhibitionArray})
            }

        }

    })
    .catch(err => { 
        console.log(err) 
        res.send({ errorCode: 500, errorMessage: err.message })
    })


}

exports.createExhibition = (req, res) => {

    let exhibition = req.body.exhibition

    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
        console.log("errors in validation: ", errors.array())
        res.status(422);
        res.send({ errors: errors.array()})
        return;
    }

    exhibitionModel.createExhibition(exhibition)
    .then(result =>{

        exhibition.exhibitionId = result.insertId

        res.send({'data': {'exhibition': exhibition}})
    })
    .catch(err => { 
        console.log(err) 
        res.send({ errorCode: 500, errorMessage: err.message })
    })

}

exports.updateExhibition = (req,res) => {

    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
        console.log("errors in validation: ", errors.array())
        res.status(422);
        res.send({ errors: errors.array()})
        return;
    }

    exhibitionModel.updateExhibition(req.body.exhibition)
    .then(result =>{

        res.send(req.body.exhibition)

    })
    .catch(err => {
        console.log(err)
        res.send({ errorCode: err.code, errorMessage: err.sqlMessage });
    })

}


exports.validate = (method) => {
    switch (method) {
        case 'createExhibition': {
            return [ 
                body('exhibition', 'exhibition object is mandatory').exists(),
                body('exhibition.museumId', 'museumId is mandatory').not().isEmpty(),
                body('exhibition.name', 'name is mandatory').not().isEmpty(),
                body('exhibition.description', 'description is mandatory').not().isEmpty(),
                body('exhibition.imageURL', 'imageURL is mandatory').not().isEmpty(),
                body('exhibition.startDate', 'startDate is mandatory').not().isEmpty(),
                body('exhibition.endDate', 'endDate is mandatory').not().isEmpty(),
                body('exhibition.categoryId', 'categoryId is mandatory').not().isEmpty()
            ]   
        }
        case 'updateExhibition': {
            return [ 
                body('exhibition', 'exhibition object is mandatory').exists(),
                body('exhibition.exhibitionId', 'exhibitionId is mandatory').not().isEmpty()
            ]    
        }
    }
}

exports.exhibitionCategory = (req,res) => {

    exhibitionModel.getExhibitionCategory()
    .then(result =>{

        res.send({'data': result})

    })
    .catch(err => {
        console.log(err)
        res.send({ errorCode: err.code, errorMessage: err.sqlMessage });
    })

}