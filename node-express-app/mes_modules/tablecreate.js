let createRestaurantsTable = function(connection) { // Création de la table restaurants

    let sql = "CREATE TABLE IF NOT EXISTS restaurants (id INT(11) AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100), city VARCHAR(100), nbcouverts INT(10), terrasse VARCHAR(3), parking VARCHAR(3))";

    connection.query(sql, function (err, result) {
    if (err) throw err;
        console.log('table "restaurants" créée');
    });
}

let createEmployesTable = function(connection) { // Création de la table employés

    let sql = "CREATE TABLE IF NOT EXISTS employes (id INT(11) AUTO_INCREMENT PRIMARY KEY, first_name VARCHAR(100), last_name VARCHAR(100), hire_date DATE, restaurant_id INT(11)) ";

    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log('table "employes" créée');
    });
}


exports.createRestaurantsTable = createRestaurantsTable;
exports.createEmployesTable = createEmployesTable;