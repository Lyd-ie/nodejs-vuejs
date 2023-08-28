let mysql = require('mysql');
console.log("Connexion en cours...");

let connection = mysql.createConnection({
  database: 'restaurants',
  host: "localhost",
  user: "root",
  password: "root"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connecté !");
});

module.exports = connection;