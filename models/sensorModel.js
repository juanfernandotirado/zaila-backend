const { cp } = require("../db/connection.js");
const { query } = require("../db/promise-mysql.js");

exports.getSensors = (sensorId, status) => {

    console.log('Status Requested: ' + status);

    console.log('Sensor Model Reached!!!');

    let sqlQuery = `SELECT sensor.nfcSensorId as sensorId, artwork.artworkId, artwork.title, exhibition.exhibitionId, exhibition.name
    FROM nfcSensor as sensor
    LEFT JOIN artwork on sensorId = nfcSensorId
    LEFT JOIN exhibition ON exhibition.exhibitionId = artwork.exhibitionId`

    if (sensorId) {

        sqlQuery += ` WHERE sensor.nfcSensorId = '${sensorId}'`

    }

    if (status == 'available'){

        sqlQuery += ` WHERE artworkId is null`

    }else if(status == 'linked'){

        sqlQuery += ` WHERE artworkId is not null`

    }

    var options = { sql: sqlQuery, nestTables: true }

    return query(cp, options)
}

