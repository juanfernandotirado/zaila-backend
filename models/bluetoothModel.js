const { cp } = require("../db/connection.js");
const { query } = require("../db/promise-mysql.js");

exports.getBluetooth = (bluetoothId, status) => {

    console.log('*** Get All Bluetooth Reached ***');

    console.log('Status Requested: ' + status);

    let sqlQuery = `SELECT bluetoothSensor.bluetoothSensorId as bluetoothId, quest.questId, quest.name, exhibition.exhibitionId, exhibition.name
    FROM bluetoothSensor
    LEFT JOIN quest on bluetoothSensor.bluetoothSensorId = quest.bluetoothSensorId
    LEFT JOIN exhibition on exhibition.exhibitionId = quest.exhibitionId`

    if (bluetoothId) {

        sqlQuery += ` WHERE bluetoothSensor.bluetoothSensorId = '${bluetoothId}'`

    }

    if (status == 'available'){

        sqlQuery += ` WHERE questId is null`

    }else if(status == 'linked'){

        sqlQuery += ` WHERE questId is not null`

    }

    var options = { sql: sqlQuery, nestTables: true }

    return query(cp, options)

    // return 'Bluetooth Reached'
}

