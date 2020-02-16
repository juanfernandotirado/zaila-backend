const { cp } = require("../db/connection.js");
const { query } = require("../db/promise-mysql.js");

exports.getAllExhibition = (exhibitionId, search) => {

    console.log('*** Get All Exhibitions ***');
    

    let sqlQuery = `SELECT * FROM exhibition`

    if (exhibitionId) {
        console.log('*** Get Exhibition By Id ***');
        console.log('Exhibition ID: ' + exhibitionId);

        sqlQuery += ` WHERE exhibitionId = ${cp.escape(exhibitionId)}`

    }

    if (search) {
        console.log('*** Exhibition Search Reached ***');
        console.log('Key word: ' + search);

        sqlQuery += ` WHERE name like '%${search}%'`

    }

    let options = { sql: sqlQuery, nestTables: true };

    console.log("sql: " + options.sql)

    return query(cp, options);

}

exports.createExhibition = (exhibition) => {

    var options = {
        sql: `INSERT INTO exhibition
            (name, 
            imageURL, 
            museumId, 
            description) 
    VALUES (${cp.escape(exhibition.name)}, 
            ${cp.escape(exhibition.imageURL)}, 
            ${cp.escape(exhibition.museumId)},
            ${cp.escape(exhibition.description)})`
    };

    console.log("sql insert exhibition: " + options.sql)
    return query(cp, options)

}