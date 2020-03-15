const { cp } = require("../db/connection.js");
const { query } = require("../db/promise-mysql.js");

exports.getAllExhibition = (exhibitionId, search) => {

    console.log('*** Get All Exhibitions ***');
    

    let sqlQuery = `SELECT * FROM exhibition INNER JOIN exhibition_category 
    ON exhibition.categoryId = exhibition_category.categoryId`

    if (exhibitionId) {
        console.log('*** Get Exhibition By Id ***');
        console.log('Exhibition ID: ' + exhibitionId);

        sqlQuery += ` WHERE exhibition.exhibitionId = ${cp.escape(exhibitionId)}`

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
            description) 
    VALUES (${cp.escape(exhibition.name)}, 
            ${cp.escape(exhibition.imageURL)}, 
            ${cp.escape(exhibition.museumId)},
            ${cp.escape(exhibition.categoryId)},
            ${cp.escape(exhibition.startDate)},
            ${cp.escape(exhibition.endDate)},
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
    
        sqlQuery = sqlQuery.slice(0, -1); 
    
        sqlQuery += ` WHERE exhibitionId = ${cp.escape(exhibition.exhibitionId)};`
    }

    let options = {sql: sqlQuery};

    console.log("sql update exhibition: " + options.sql)
    return query(cp, options)

}

exports.getExhibitionCategory = () => {
    console.log('**** Get Exhibition Categories Reached ****');

    let sql = `SELECT * FROM exhibition_category`

    console.log("Exhibition Categories: " + sql)
    return query(cp, sql)

}

exports.getTappedArtworks = (exhibitionId, userId) => {
    console.log('**** Get Tapped Artworks in Exhibition ****');

    let sql = `SELECT COUNT (*) AS artworksTapped FROM activityLog 
    WHERE exhibitionId = ${cp.escape(exhibitionId)} AND userId = ${cp.escape(userId)}`

    console.log("Exhibition Categories: " + sql)
    return query(cp, sql)

}