var mysql = require("mysql");

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MTck94727",
  database: "bkksg",
});

db.connect();

module.exports = db;
