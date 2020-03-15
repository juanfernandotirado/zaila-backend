const { cp } = require("../db/connection.js");
const { query } = require("../db/promise-mysql.js");

exports.getActivityLog = (user, artwork) => {

    console.log('*** Get ActivityLog Reached ***');
    console.log('User : ' + user.userId + ', Artwork: ' + artwork.artworkId);

    let sql = `SELECT *
    FROM activityLog
    WHERE userId =  ${cp.escape(user.userId)} AND artworkId = ${cp.escape(artwork.artworkId)}`    

        // sqlQuery += ` WHERE title like '%${search}%' or artistName like '%${search}%'`

    return query(cp, sql);

}

exports.createActivityLog = (user, artwork) => {

    console.log('*** Insert ActivityLog Reached ***');
    console.log('User : ' + user.userId + ', Artwork: ' + artwork.artworkId);

    let time = new Date();
    let day = String(time.getDate()).padStart(2, '0');
    let month = String(time.getMonth() + 1).padStart(2, '0'); //January is 0!
    let year = time.getFullYear();

    time = year + '/' + month + '/' + day;

    let sql = `INSERT INTO activityLog
        (artworkId, 
        exhibitionId, 
        languageCode, 
        userId, 
        time)
        VALUES (${cp.escape(artwork.artworkId)},
        ${cp.escape(artwork.exhibitionId)}, 
        ${cp.escape(user.preferredLanguage)}, 
        ${cp.escape(user.userId)},
        ${cp.escape(time)})`

    return query(cp, sql);

}