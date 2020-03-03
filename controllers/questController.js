const questModel = require('../models/questModel.js');
const {validationResult} = require('express-validator');
const {body} = require('express-validator')

exports.getAllQuest = (req, res) => {

    res.send(questModel.getAllQuest())
    

}

exports.createQuest = (req, res) => {

    let quest = req.body.quest

    questModel.createQuest(quest)
        .then((result) => {

            quest.questId = result.insertId

            return questModel.insertQuestArtwork(quest.questId, quest.artworkIdArray)

        })
        .then(result => {

            res.send(quest)

        })
        .catch(err => {
            console.log(err)
            res.send({ errorCode: err.code, errorMessage: err.sqlMessage });
        })
}