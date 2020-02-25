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

                    result.forEach(item =>{
                        item.museum.museum_category = item.museum_category
                        delete item.museum.categoryId
                        delete item.museum_category
                    })

                    museumArray = result

                    return exhibitionModel.getAllExhibition()
                }
            })
            .then(result =>{

                museumArray.map(museumItem =>{

                    let exhibitionsArray = result.filter(item => {
                        
                        return item.exhibition.museumId == museumItem.museum.museumId
                    })

                    let newExhibitionsArray = []

                    exhibitionsArray.forEach(item =>{

                        delete item.exhibition.description
                        delete item.exhibition.museumId
                        delete item.exhibition.imageURL
                        delete item.exhibition.categoryId
                        delete item.exhibition.startDate
                        delete item.exhibition.endDate
                        delete item.exhibition.completionXP
                        delete item.exhibition.completionBadgeId

                        newExhibitionsArray.push(item.exhibition)

                    })

                    museumItem.museum.exhibitionsList = newExhibitionsArray

                    return museumItem

                })

                res.send({ 'data': museumArray })

            })
            .catch(err => { 
                console.log(err) 
                res.send({ errorCode: 500, errorMessage: err.message })
            })

    } else {

        museumModel.getAllMuseum(museumId, city)

            .then(result => {

                result.forEach(item =>{
                    item.museum.museum_category = item.museum_category
                    delete item.museum.categoryId
                    delete item.museum_category
                })

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