const mysql = require('mysql');
const database= require('./../db.json');

const getConnection = () => {
    return mysql.createConnection(database);
}
const connection = getConnection();
module.exports = connection;