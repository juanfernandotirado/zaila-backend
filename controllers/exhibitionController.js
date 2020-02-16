const exhibitionModel = require('../models/exhibitionModel.js');


exports.getAllExhibition = (req, res) => {

    let search = req.query.search
    let exhibitionId = req.params.exhibitionId

    exhibitionModel.getAllExhibition(exhibitionId, search)

    .then(result =>{
        if (result == 0) {
            res.send({ message: 'No matches found for exhibition name', 'data': result })
        } else {
            res.send({ 'data': result })
        }
    })
    .catch(err => { console.log(err) })


}

exports.createExhibition = (req, res) => {

    let exhibition = req.body.exhibition

    exhibitionModel.createExhibition(exhibition)
    .then(result =>{

        exhibition.exhibitionId = result.insertId

        res.send({'data': {'exhibition': exhibition}})
    })
    .catch(err => { console.log(err) })


}