const { cp } = require("../db/connection.js");
const { query } = require("../db/promise-mysql.js");

exports.getAllMuseum = (museumId, city) => {

    let sqlQuery = `SELECT *
    FROM museum
    INNER JOIN museum_category
    ON museum.categoryId = museum_category.categoryId
    `

    if (museumId) {
        console.log('*** Museum By ID ***');
        console.log('Museum ID: ' + museumId);

        sqlQuery += ` WHERE museumId = ${cp.escape(museumId)}`

    }

    if (city) {
        console.log('*** Museum By City ***');
        console.log('City: ' + city);

        sqlQuery += ` WHERE city = ${cp.escape(city)}`

    }

    let options = { sql: sqlQuery, nestTables: true };

    return query(cp, options);

}

exports.getHours = (museumId) => {

    console.log('*** Opening Hours By Museum ID ***');
    console.log('Museum ID: : ' + museumId);

    let sqlQuery = `SELECT *
    FROM opening_hours
    WHERE museumId = ${cp.escape(museumId)}
    `

    let options = { sql: sqlQuery, nestTables: false };

    return query(cp, options);

}

exports.getMuseumCategory = (museumId) => {

    console.log('*** Opening Hours By Museum ID ***');
    console.log('Museum ID: : ' + museumId);

    let sqlQuery = `SELECT *
    FROM opening_hours
    WHERE museumId = ${cp.escape(museumId)}
    `

    let options = { sql: sqlQuery, nestTables: false };

    return query(cp, options);

}

