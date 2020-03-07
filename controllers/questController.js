const questModel = require('../models/questModel.js');
const {validationResult} = require('express-validator');
const {body} = require('express-validator')

exports.getAllQuest = (req, res) => {

    let bluetoothId = req.query.bluetoothId
    let questId = req.params.id
    let questArray

    questModel.getAllQuest(bluetoothId,questId)

    .then(result => {

        questArray = result

        return questModel.getArtworksArray(questId)

    })
    .then(result => {

        let finalResponse = questArray.map(questItem =>{

            let artworksArray = result.filter(item => {
                // console.log('questItem ID: ' + questItem.quest.questId + '---' + item.questArtwork.questId + ' : questArtwork ID');
                
                return questItem.quest.questId == item.questArtwork.questId
            })

            let FinalArtworksArray = artworksArray.map(item =>{

                return item.questArtwork.artworkId

            })

            questItem.quest.artworkIdArray = FinalArtworksArray

            return questItem

        })

        if(finalResponse.length == 0){
            res.send({'message': 'No data found', 'data':finalResponse})
        }else if(finalResponse.length == 1){
            res.send({'data':finalResponse[0]})
        }else {
            res.send({'data':finalResponse})
        }

    })
    .catch(err => {
        console.log(err)
        res.send({ errorCode: err.code, errorMessage: err.sqlMessage });
    })

}

exports.createQuest = (req, res) => {

    let quest = req.body.quest

    questModel.createQuest(quest)
        .then((result) => {

            quest.questId = result.insertId

            return questModel.insertQuestArtwork(quest.questId, quest.artworkIdArray)

        })
        .then(result => {
            
            res.send({'data': quest})

        })
        .catch(err => {
            console.log(err)
            res.send({ errorCode: err.code, errorMessage: err.sqlMessage });
        })
}