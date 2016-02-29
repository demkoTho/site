var express = require('express'); //import de la bibliothèque Express
var app = express(); //instanciation d'une application Express

//ici on définira ensuite les "routes" = les requêtes HTTP acceptées par l'application
app.listen(8000); //commence à accepter les requêtes
console.log("App listening on port 8000...");

app.get('/tierlist', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.json(require(__dirname + "/data/cardtier.json"));
	
});

app.get('/cards', function(req, res) {
	
	res.header("Access-Control-Allow-Origin", "*");
	res.json(require(__dirname + "/data/cards.json"));
	
});

