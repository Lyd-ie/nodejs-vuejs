let http = require('http');
let url = require('url');
let monmodule = require('./monmodule');
let querystring = require('querystring');

let hostname = '127.0.0.1';
let port = 5000;

let server = http.createServer(function(req, res) {
    let page = url.parse(req.url).pathname;
    let params = querystring.parse(url.parse(req.url).query);

    res.setHeader('Content-Type', 'text/html');

    if (page == '/') {
        res.statusCode = 200;
        res.write('You are at home page');
    } else if (page == '/controller') {
        res.statusCode = 200;
        res.write('You are at the controller');
    } else if (page == '/controller/method') {
        res.statusCode = 200;	
        res.write('You are at the method of the controller');
    } else {
        res.statusCode = 404;
        res.write('Page does not exist');
    }
    
    if ('prenom' in params && 'nom' in params) {
        res.write('<br>Bonjour ' + params['prenom'] + ' ' + params['nom'] + " !");
    } else {
        res.write('<br>Les paramètres [prenom] et [nom] son vides !');
    }
    res.end();
});

server.listen(port, hostname, function() {
    console.log("Server running at http://" + hostname + ":" + port + "/");
});

app.get('/hello', function(request, response) {
    monmodule.direBonjour();
    monmodule.direBye();
})