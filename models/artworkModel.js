const { cp } = require("../db/connection.js");
const { query } = require("../db/promise-mysql.js");

exports.getAllArtwork = (search) => {

    let sqlQuery = `SELECT *
    FROM artwork`

    if (search) {
        console.log('*** Artwork Search Reached ***');
        console.log('Key word: ' + search);

        sqlQuery += ` WHERE title like '%${search}%' or artistName like '%${search}%'`

    }

    let options = { sql: sqlQuery, nestTables: true };

    return query(cp, options);

}

exports.getAllDescriptions = () => {

    var options = {
        sql: `SELECT *
    FROM artworkDetails`,
        nestTables: false
    };

    return query(cp, options);
}

exports.getArtworkBySensorId = (sensorId) => {

    console.log('Sensor ID: ' + sensorId);

    var options = {
        sql: `SELECT * FROM artwork
    WHERE artwork.sensorId = "${sensorId}"
    `,
        nestTables: false
    };

    return query(cp, options);
}

exports.getArtworkById = (artworkId) => {

    console.log('Artwork ID: ' + artworkId);

    var options = {
        sql: `SELECT * FROM artwork
    WHERE artworkId = ${artworkId}
    `,
        nestTables: true
    };

    return query(cp, options);
}

exports.getArtworkDetailsByArtworkId = (artworkId, language) => {

    console.log('Artwork ID: ' + artworkId);
    console.log('Language Artwork ID: ' + language);

    if (!language) {

        var options = {
            sql: `SELECT * FROM artworkDetails
        WHERE artworkId = ${artworkId}
        `,
            nestTables: false
        };

        return query(cp, options);

    } else {

        var options = {
            sql: `SELECT * FROM artworkDetails
        WHERE artworkId = ${artworkId} AND languageCode = '${language}'
        `,
            nestTables: false
        };

        return query(cp, options);

    }


}

exports.getArtworkByIdAndLanguage = (artworkId, languageCode) => {

    console.log('Artwork ID: ' + artworkId);
    console.log('language: ' + languageCode);

    var options = {
        sql: `SELECT * FROM artwork
    INNER JOIN artworkDetails
    ON artwork.artworkId = artworkDetails.artworkId
    WHERE artwork.artworkId = ${artworkId} AND artworkDetails.languageCode = "${languageCode}" 
    `,
        nestTables: true
    };

    return query(cp, options);
}

exports.createArtwork = (artwork) => {

    var options = {
        sql: `INSERT INTO artwork
            (exhibitionId, 
            sensorId, 
            title, 
            imageURL, 
            artistName, 
            media, 
            year) 
    VALUES (${cp.escape(artwork.exhibitionId)}, 
            ${cp.escape(artwork.sensorId)}, 
            ${cp.escape(artwork.title)},
            ${cp.escape(artwork.imageURL)}, 
            ${cp.escape(artwork.artistName)}, 
            ${cp.escape(artwork.media)}, 
            ${cp.escape(artwork.year)})`
    };

    console.log("sql insert artwork: " + options.sql)
    return query(cp, options)
}

exports.createArtworkDetails = (artworkDetails, artworkId) => {

    var inserts = '';
    artworkDetails.forEach(detail => {
        inserts += `INSERT INTO artworkDetails 
            (artworkId, 
            description, 
            languageCode) 
        VALUES (${cp.escape(artworkId)}, 
                ${cp.escape(detail.description)}, 
                ${cp.escape(detail.languageCode)});`
    });

    let options = { sql: inserts };

    console.log("sql insert artwork Detail: " + options.sql)
    return query(cp, options)
}

exports.updateArtwork = (artwork, artworkDetails) => {
    console.log('**** Update Artwork Reached ****');

    let sqlQuery = ""

    if(artwork.artworkId){

        sqlQuery = `UPDATE artwork SET ` 

        if(artwork.exhibitionId){ sqlQuery+= `exhibitionId = ${cp.escape(artwork.exhibitionId)},`}
        if(artwork.sensorId){ sqlQuery+= `sensorId = ${cp.escape(artwork.sensorId)},`}
        if(artwork.title){ sqlQuery+= `title = ${cp.escape(artwork.title)},`}
        if(artwork.imageURL){ sqlQuery+= `imageURL = ${cp.escape(artwork.imageURL)},`}
        if(artwork.artistName){ sqlQuery+= `artistName = ${cp.escape(artwork.artistName)},`}
        if(artwork.media){ sqlQuery+= `media = ${cp.escape(artwork.media)},`}
        if(artwork.year){ sqlQuery+= `year = ${cp.escape(artwork.year)},`}
    
    
        sqlQuery = sqlQuery.slice(0, -1); 
    
        sqlQuery += ` WHERE artworkId = ${cp.escape(artwork.artworkId)};`

    }


    if(artworkDetails){

        artworkDetails.forEach(detail =>{

            sqlQuery+= `UPDATE artworkDetails SET `

            if(detail.description){sqlQuery+= `description = ${cp.escape(detail.description)},`}
            if(detail.languageCode){sqlQuery+= `languageCode = ${cp.escape(detail.languageCode)},`}


            sqlQuery = sqlQuery.slice(0, -1); 

            sqlQuery += ` WHERE artworkDetailsId = ${cp.escape(detail.artworkDetailsId)};`

        })

        

    }

    let options = {sql: sqlQuery};

    console.log("sql update artwork: " + options.sql)
    return query(cp, options)

}
