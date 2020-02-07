const {cp} = require("../db/connection.js"); 
const {query} = require("../db/promise-mysql.js");

exports.getAllArtwork = (artworkId) => {

    var options = {sql: ` select * from zaila_dev.artwork inner join zaila_dev.artworkDetails 
    on artwork.artworkId = artworkDetails.artworkId`, nestTables: false};

    return query(cp, options);
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