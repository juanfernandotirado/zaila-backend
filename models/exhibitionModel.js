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
            categoryId,
            startDate,
            endDate,
            completionBadgeId,
            completionXP,
            description) 
    VALUES (${cp.escape(exhibition.name)}, 
            ${cp.escape(exhibition.imageURL)}, 
            ${cp.escape(exhibition.museumId)},
            ${cp.escape(exhibition.categoryId)},
            ${cp.escape(exhibition.startDate)},
            ${cp.escape(exhibition.endDate)},
            ${cp.escape(exhibition.completionBadgeId)},
            ${cp.escape(exhibition.completionXP)},
            ${cp.escape(exhibition.description)})`
    };

    console.log("sql insert exhibition: " + options.sql)
    return query(cp, options)

}


exports.updateExhibition = (exhibition) => {
    console.log('**** Update Exhibition Reached ****');

    let sqlQuery = ""

    if(exhibition.exhibitionId){

        sqlQuery = `UPDATE exhibition SET ` 

        if(exhibition.museumId){ sqlQuery+= `museumId = ${cp.escape(exhibition.museumId)},`}
        if(exhibition.name){ sqlQuery+= `name = ${cp.escape(exhibition.name)},`}
        if(exhibition.description){ sqlQuery+= `description = ${cp.escape(exhibition.description)},`}
        if(exhibition.imageURL){ sqlQuery+= `imageURL = ${cp.escape(exhibition.imageURL)},`}
        if(exhibition.startDate){ sqlQuery+= `startDate = ${cp.escape(exhibition.startDate)},`}
        if(exhibition.endDate){ sqlQuery+= `endDate = ${cp.escape(exhibition.endDate)},`}
        if(exhibition.categoryId){ sqlQuery+= `categoryId = ${cp.escape(exhibition.categoryId   )},`}
        if(exhibition.completionBadgeId){ sqlQuery+= `completionBadgeId = ${cp.escape(exhibition.completionBadgeId)},`}
        if(exhibition.completionXP){ sqlQuery+= `completionXP = ${cp.escape(exhibition.completionXP)},`}
    
    
        sqlQuery = sqlQuery.slice(0, -1); 
    
        sqlQuery += ` WHERE exhibitionId = ${cp.escape(exhibition.exhibitionId)};`

        

    }

    let options = {sql: sqlQuery};

    console.log("sql update exhibition: " + options.sql)
    return query(cp, options)

}
