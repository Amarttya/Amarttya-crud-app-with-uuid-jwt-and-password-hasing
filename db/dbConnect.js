const mysql = require('mysql');

const mySqlConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    waitForConnections: true,
    connectionLimit: process.env.DB_CONNECTION_LIMIT,
  })
  
  module.exports = mySqlConnection