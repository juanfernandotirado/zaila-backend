const {cp} = require("../db/connection.js"); 
const {query} = require("../db/promise-mysql.js");

exports.getAllArtwork = (artworkId) => {

    var options = {sql: `select * from zaila_dev.artwork inner join zaila_dev.artworkDetails 
    on artwork.artworkId = artworkDetails.artworkId
    group by artworkDetails.artworkDetailsId`, nestTables: true};

    return query(cp, options);
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

