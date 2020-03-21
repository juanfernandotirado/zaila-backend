const { cp } = require("../db/connection.js");
const { query } = require("../db/promise-mysql.js");

exports.createUser = (user) => {
    //console.log('user', user)

    let options = { sql: `INSERT INTO user 
            (ageGroup, 
            preferredLanguage, 
            name, 
            password, 
            email, 
            autoPlayDescription, 
            autoEnrollQuest, 
            userXP,
            profileUrl) 
            VALUES (
                ${cp.escape(user.ageGroup)}, 
                ${cp.escape(user.preferredLanguage)}, 
                ${cp.escape(user.name)}, 
                ${cp.escape(user.password)}, 
                ${cp.escape(user.email)}, 
                ${cp.escape(user.autoPlayDescription)}, 
                ${cp.escape(user.autoEnrollQuest)}, 
                ${cp.escape(0)},
                ${cp.escape(user.profileUrl)})`
    , nestTables: true };

    return query(cp, options);
}

exports.getUserFromCredentials = (email, password) => {
    let passwd = `and password = ${cp.escape(password)}`
    let options = { sql: 
        `SELECT userId, preferredLanguage, name, email, autoPlayDescription, autoEnrollQuest, userXP, profileUrl FROM user
        where email = ${cp.escape(email)}
        ${password ? passwd : ''}`
    , nestTables: true };

    //console.log(options.sql)
    return query(cp, options);
}

exports.getUserById = (userId) => {
    let options = { sql: 
        `SELECT userId, preferredLanguage, name, email, autoPlayDescription, autoEnrollQuest, userXP FROM user
        where userId = ${cp.escape(userId)}`
    , nestTables: true };

    return query(cp, options);
}

exports.getUserFromEmail = (email) => {    
    let options = { sql: 
        `SELECT userId FROM user
        where email = ${cp.escape(email)}`
    , nestTables: true };

    return query(cp, options);
}

exports.updateUserXP = (userId, XP) => {

    console.log('*** Update User Reached ***');

    let sql = `UPDATE user 
    SET userXP = userXP + ${cp.escape(XP)}
    WHERE userId = ${cp.escape(userId)};
    SELECT *
    FROM user
    WHERE userId = ${cp.escape(userId)}`

    return query(cp, sql);
}
