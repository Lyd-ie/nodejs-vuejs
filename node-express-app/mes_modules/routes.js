let routes = function(connection, app, mysql) {

    app.post('/restaurant', (req, res) => {
        let sql = "INSERT INTO restaurants (name, city, nbcouverts, terrasse, parking) VALUES ('" +
            req.body.name + "', '" +
            req.body.city + "', '" +
            req.body.nbcouverts + "', '" +
            req.body.terrasse + "', '" +
            req.body.parking + "')";
    
        connection.query(sql, function (err, results) {
            if (err) {
                console.error("Error inserting restaurant:", err);
                res.status(500).send("Error creating restaurant");
            } else {
                console.log("Restaurant inserted successfully");
                res.status(200).send("Restaurant created successfully");
            }
        });
    });

    // Route /GET/restaurants
    app.get('/restaurants', (req, res) => {
        let sql_template = "SELECT restaurants.id AS restaurant_id, restaurants.name, restaurants.city, restaurants.nbcouverts, restaurants.terrasse, restaurants.parking, employes.id, employes.first_name, employes.last_name FROM restaurants LEFT JOIN employes ON restaurants.id = employes.restaurant_id";
        let replaces = ['restaurants'];

        sql = mysql.format(sql_template, replaces);

        connection.query(sql, function(err, rows) {
            if (err) throw err;
            
            // Initialisation d'un array restaurants pour stocker les résultats de la requête
            const restaurants = [];
            let restaurant = null;

            for (const row of rows) {
                if (!restaurant || restaurant.id !== row.restaurant_id) {
                    restaurant = {
                        id: row.restaurant_id,
                        name: row.name,
                        city: row.city,
                        nbcouverts: row.nbcouverts,
                        terrasse: row.terrasse,
                        parking: row.parking,
                        employees: []
                    };
                    restaurants.push(restaurant);
                }

                restaurant.employees.push({
                    employee_id: row.id,
                    first_name: row.first_name,
                    last_name: row.last_name,
                    // Add other employee fields here
                });
                // console.log("coucou");
            }
            
            res.send(restaurants);
            res.status(200);
        });

    });



    // Route /GET/restaurants/:id
    app.get('/restaurants/:id', (req, res) => {
        let id = parseInt(req.params.id);
        
        let sql_template = "Select * from ?? WHERE ?? = " + id;
        let replaces = ['restaurants', 'id'];

        sql = mysql.format(sql_template, replaces);

        connection.query(sql, function(err, row, fields) {
            if (err) throw err;
            res.send(row);
        });
        res.status(200);
    });

    // Route /PUT/restaurants/:id
    app.put('/restaurants/:id', (req, res) => {
        let id = parseInt(req.params.id);

        let sql_template = "UPDATE ??" + 
                            "SET name ='" + req.body.name +
                            "', city ='" + req.body.city +
                            "', nbcouverts ='" + req.body.nbcouverts + 
                            "', terrasse = '" + req.body.terrasse +
                            "', parking = '" + req.body.parking  +
                            "'WHERE ?? = " + id;
        let replaces = ['restaurants', 'id'];
        
        sql = mysql.format(sql_template, replaces);
        
        connection.query(sql, function(err, row, fields) {
            if (err) throw err;
            res.send(row);
            res.status(200);
        });
    })


    //Route /DELETE/restaurants/:id
    app.delete('/restaurants/:id', (req, res) => {
        let id = parseInt(req.params.id);
        
        let sql_template = "DELETE from ?? WHERE ?? = " + id;
        
        let replaces = ['restaurants', 'id'];
        sql = mysql.format(sql_template, replaces);

        connection.query(sql, function(err, row, fields) {
            if (err) throw err;
        });
        
        let replaces2 = ['employes', 'restaurant_id'];
        sql2 = mysql.format(sql_template, replaces2);

        connection.query(sql2, function(err, row, fields) {
            if (err) throw err;
            res.send(row);
        });

        res.status(200);
    });


    // POST /employe
    app.post('/employe', (req, res) => {
    
        let sql = "INSERT INTO employes (first_name, last_name, hire_date, restaurant_id) " +
        " VALUES ('" + req.body.first_name + "', '" 
                        + req.body.last_name + "', STR_TO_DATE('"
                        + req.body.hire_date + "','%Y-%m-%d'), '"
                        + req.body.restaurant_id + "') ";

        connection.query(sql, function(err, results) {
            if (err) throw err;
        res.status(200).send("Employé embauché !");
        });
    });

    // GET /restaurants/:idResto /employes
    app.get('/restaurants/:idResto/employes', (req, res) => {
        let idResto = parseInt(req.params.idResto);

        var sql_template = "Select * from ?? WHERE ?? =" + idResto;
        var replaces = ['employes', 'restaurant_id'];

        sql = mysql.format(sql_template, replaces);

        connection.query(sql, function(err, rows) {
            if (err) throw err;
            res.send(rows)
        });
        res.status(200);
    });


    // GET /restaurants/:idResto /employes/:idEmploye
    app.get('/restaurants/:idResto/employes/:id', (req, res) => {
        let idResto = parseInt(req.params.idResto);
        let id = parseInt(req.params.id);

        let sql_template = "Select * from ?? WHERE ?? = '" + idResto + "' AND ?? = " + id;
        let replaces = ['employes', 'restaurant_id', 'id'];

        sql = mysql.format(sql_template, replaces);

        connection.query(sql, function(err, row, fields) {
            if (err) throw err;
            res.send(row);
        });
        res.status(200);
    });


    // PUT /restaurants/:idResto /employes/:idEmploye
    app.put('/restaurants/:idResto/employes/:id', (req, res) => {
        let idResto = parseInt(req.params.idResto);
        let id = parseInt(req.params.id);

        let sql_template = "UPDATE ??" + 
                            "SET first_name ='" + req.body.first_name +
                            "', last_name ='" + req.body.last_name +
                            "', hire_date ='" + req.body.hire_date +    
                            "'WHERE ?? = '" + idResto +
                            "' AND ?? = " + id;
            let replaces = ['employes', 'restaurant_id', 'id'];
        
        sql = mysql.format(sql_template, replaces);
        
        connection.query(sql, function(err, row, fields) {
            if (err) throw err;
            res.send(row);
        });
        res.status(200);
    });


    // DELETE/restaurants/employes/:idEmploye
    app.delete('/restaurants/employes/:id', (req, res) => {
        let id = parseInt(req.params.id);
        
        let sql_template = "DELETE from ?? WHERE ?? = " + id;
        let replaces = ['employes', 'id'];

        sql = mysql.format(sql_template, replaces);

        connection.query(sql, function(err, row, fields) {
            if (err) throw err;
            res.send(row);
        });
        res.status(200);
    });

}

exports.routes = routes;