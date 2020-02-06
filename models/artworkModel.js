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
    INNER JOIN artworkDetails
    ON artwork.artworkId = artworkDetails.artworkId
    WHERE artwork.artworkId = ${artworkId}
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
//     const newArtwork = new Artwork({
//         title: artwork.title,
//         author: artwork.author,
//         description: artwork.description
//     })
    
//    return newArtwork.save();
    return null;
        
}

