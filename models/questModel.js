const { cp } = require("../db/connection.js");
const { query } = require("../db/promise-mysql.js");

exports.getAllQuest = () => {

    console.log('*** Get All Quests Reached ***');

    return '*** Get All Quests Reached ***'

}

exports.createQuest = (quest) => {
    
        let sql = `INSERT INTO quest
            (exhibitionId,
            bluetoothSensorId,
            completionBadgeId,
            completionXP, 
            description,
            name) 
            VALUES (${cp.escape(quest.exhibitionId)}, 
            ${cp.escape(quest.bluetoothSensorId)}, 
            ${cp.escape(quest.completionBadgeId)}, 
            ${cp.escape(quest.completionXP)}, 
            ${cp.escape(quest.description)}, 
            ${cp.escape(quest.name)});`

    console.log("sql insert quest: " + sql)
    return query(cp, sql)
}

exports.insertQuestArtwork = (questId,artworkIdArray) => {

    let sql = ''

    artworkIdArray.forEach(artworkId =>{

        insert += `INSERT INTO quest-artwork
        (questId,
        artworkId) 
        VALUES (${cp.escape(questId)}, 
        ${cp.escape(artworkId)});`

    })

console.log("sql insert quest-artwork: " + sql)
return query(cp, sql)
}