const exhibitionModel = require('../models/exhibitionModel.js');
const {validationResult} = require('express-validator');
const {body} = require('express-validator')


exports.getAllExhibition = (req, res) => {

    let search = req.query.search
    let exhibitionId = req.params.exhibitionId

    exhibitionModel.getAllExhibition(exhibitionId, search)

    .then(result =>{
        if (result.length == 0) {
            res.send({ message: 'No data found', 'data': result })
        } else if (result.length == 1){
            res.send({ 'data': result[0]})
        }else {
            res.send({ 'data': result})
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
                body('exhibition.categoryId', 'categoryId is mandatory').not().isEmpty(),
                body('exhibition.completionBadgeId', 'completionBadgeId is mandatory').not().isEmpty(),
                body('exhibition.completionXP', 'completionXP is mandatory').not().isEmpty()
            ]   
        }
        case 'updateExhibition': {
            return [ 
                body('exhibition', 'exhibition object is mandatory').exists(),
                body('exhibition.museumId', 'museumId is mandatory').not().isEmpty(),
                body('exhibition.name', 'name is mandatory').not().isEmpty(),
                body('exhibition.description', 'description is mandatory').not().isEmpty(),
                body('exhibition.imageURL', 'imageURL is mandatory').not().isEmpty(),
                body('exhibition.startDate', 'startDate is mandatory').not().isEmpty(),
                body('exhibition.endDate', 'endDate is mandatory').not().isEmpty(),
                body('exhibition.categoryId', 'categoryId is mandatory').not().isEmpty(),
                body('exhibition.completionBadgeId', 'completionBadgeId is mandatory').not().isEmpty(),
                body('exhibition.completionXP', 'completionXP is mandatory').not().isEmpty()
            ]    
        }
    }
}