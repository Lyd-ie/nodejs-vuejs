const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors');
const connection = require('./mes_modules/connect.js');
const creation = require('./mes_modules/tablecreate.js');
const router = require('./mes_modules/routes.js');

app.listen(5000, ()=> {
	console.log('Server is listening @5000');
});

// Middleware
app.use(express.json());
app.use(cors());

creation.createRestaurantsTable(connection);
creation.createEmployesTable(connection);
router.routes(connection, app, mysql);