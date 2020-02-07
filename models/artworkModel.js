const {cp} = require("../db/connection.js"); 
const {query} = require("../db/promise-mysql.js");

exports.getAllArtwork = () => {

    var options = {sql: `SELECT *
    FROM artwork`, 
    nestTables: true};

    return query(cp, options);
}

exports.getAllDescriptions = () => {

    var options = {sql: `SELECT artworkId, languageCode, description
    FROM artworkDetails`, 
    nestTables: true};

    return query(cp, options);
}

exports.getArtworkBySensorId = (sensorId,languageCode) =>{

    console.log('Sensor ID: ' + sensorId);
    console.log('Language: ' + languageCode);
    
    var options = {sql: `SELECT * FROM artwork
    INNER JOIN artworkDetails 
    ON artwork.artworkId = artworkDetails.artworkId
    WHERE artwork.sensorId = "${sensorId}" AND artworkDetails.languageCode = "${languageCode}"
    `, 
    nestTables: true};

    return query(cp,options);
}

exports.getArtworkById = (artworkId) =>{

    console.log('Artwork ID: ' + artworkId);
    
    var options = {sql: `SELECT * FROM artwork
    WHERE artworkId = ${artworkId}
    `, 
    nestTables: true};

    return query(cp,options);
}

exports.getArtworkDetailsByArtworkId = (artworkId) =>{

    console.log('Artwork ID: ' + artworkId);
    
    var options = {sql: `SELECT languageCode, description, artworkId FROM artworkDetails
    WHERE artworkId = ${artworkId}
    `, 
    nestTables: true};

    return query(cp,options);
}

exports.getArtworkByIdAndLanguage = (artworkId,languageCode) =>{

    console.log('Artwork ID: ' + artworkId);
    console.log('language: ' + languageCode);
    
    var options = {sql: `SELECT * FROM artwork
    INNER JOIN artworkDetails
    ON artwork.artworkId = artworkDetails.artworkId
    WHERE artwork.artworkId = ${artworkId} AND artworkDetails.languageCode = "${languageCode}" 
    `, 
    nestTables: true};

    return query(cp,options);
}

exports.createArtwork = (artwork) => {

    var options = {sql: `INSERT INTO artwork
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
            ${cp.escape(artwork.year)})`};
    
    console.log("sql insert artwork: "+ options.sql)
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

    let options = {sql: inserts};
    
    console.log("sql insert artwork Detail: "+ options.sql)
    return query(cp, options)
}