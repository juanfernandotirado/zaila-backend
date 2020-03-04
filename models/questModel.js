const { cp } = require("../db/connection.js");
const { query } = require("../db/promise-mysql.js");

exports.getAllQuest = (bluetoothId, questId) => {

    console.log('*** Get All Quests Reached ***');

    let sqlQuery = `SELECT *
    FROM quest`

    if (bluetoothId) {
        console.log('*** Quest By Bluetooth Id ***');
        console.log('Bluetooth ID: ' + bluetoothId);

        sqlQuery += ` WHERE bluetoothSensorId = ${cp.escape(bluetoothId)}`

    }

    if (questId) {
        console.log('*** Quest By Quest Id ***');
        console.log('Quest ID: ' + questId);

        sqlQuery += ` WHERE questId = ${cp.escape(questId)}`

    }

    let options = { sql: sqlQuery, nestTables: true };

    return query(cp, options);

}

exports.getArtworksArray = (questId) => {

    console.log('*** Get ArtworksArray Reached ***');

    let sqlQuery = `SELECT *
    FROM questArtwork`

    if (questId) {
        console.log('*** Quest By Bluetooth Id ***');
        console.log('QuestId ID: ' + questId);

        sqlQuery += ` WHERE questId = ${questId}`

    }

    let options = { sql: sqlQuery, nestTables: true };

    return query(cp, options);

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

        sql += `INSERT INTO questArtwork
        (questId,
        artworkId) 
        VALUES (${cp.escape(questId)}, 
        ${cp.escape(artworkId)});`

    })

console.log("sql insert questArtwork: " + sql)
return query(cp, sql)
}