let mysql = require('mysql');

console.log('Get connection ...');

var connection = mysql.createConnection({ // connexion à la base de données
    database: 'testnodejs',
    host: "localhost",
    user: "root",
    password: "root"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    
    let date = "20/11/1995";
    var sql_template = "Select * from employes WHERE Hire_date >= STR_TO_DATE('" + date + "', '%d/%m/%Y')";
    var replaces = ['employes'];
    
    sql = mysql.format(sql_template, replaces);

    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;

        rows.forEach((employee) => 
            console.log(employee.id + ". " + employee.FirstName + " " + employee.LastName + ", embauché le " + employee.Hire_date.toLocaleDateString('fr-FR'))
        )
    });
});