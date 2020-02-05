const mysql = require("mysql");
require("dotenv").config();

//Create a pool of connections
const connectionPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  multipleStatements: true,
  connectionLimit: 100
});

exports.cp = connectionPool;
