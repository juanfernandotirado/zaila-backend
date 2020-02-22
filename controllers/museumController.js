const museumModel = require('../models/museumModel.js');
const exhibitionModel = require('../models/exhibitionModel.js');
const { validationResult } = require('express-validator');
const { body } = require('express-validator')

exports.getAllMuseum = (req, res) => {

    let museumArray

    let museumId = req.params.museumId
    let city = req.query.city

    if (!museumId) {

        museumModel.getAllMuseum(museumId, city)

            .then(result => {
                if (result.length == 0) {
                    res.send({ message: 'No data found', 'data': result })
                } else {
                    res.send({ 'data': result })
                }
            })
            .catch(err => { 
                console.log(err) 
                res.send({ errorCode: 500, errorMessage: err.message })
            })

    } else {

        museumModel.getAllMuseum(museumId, city)

            .then(result => {

                museumArray = result

                return exhibitionModel.getAllExhibition()

            })
            .then(result => {

                let exhibitionArray = result.filter(item => {
                    return item.exhibition.museumId == museumId
                })

                let finalExhibitions = exhibitionArray.map(item => {
                    return item.exhibition
                })

                museumArray[0].museum.exhibitionsList = finalExhibitions

                return museumModel.getHours(museumId)


            })
            .then(result => {

                museumArray[0].museum.openingHours = result

                if (result.length == 0) {
                    res.send({ message: 'No data found', 'data': museumArray })
                } else if (museumArray.length == 1) {
                    res.send({ 'data': museumArray[0] })
                } else {
                    res.send({ 'data': museumArray })
                }
            })
            .catch(err => { 
                console.log(err) 
                res.send({ errorCode: 500, errorMessage: err.message })
            })
    }



}