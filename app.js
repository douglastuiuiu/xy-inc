var express = require('express'),
	bodyParser = require('body-parser'),
	schemas = require('./schemas/poi.js'),
	config = require('./config');

//CONFIG
var	app = express();
app.use(bodyParser.json()); 
var port = process.env.PORT || config.port; 
var basePath = '/api/poi';

//AUX FUNCTION
var buildQuery = function(req, res){
	var query = {};
	var xUp, xDown, yUp, yDown;
	xUp = req.body.x + req.body.range;
	xDown = req.body.x - req.body.range;
	yUp = req.body.y + req.body.range;
	yDown = req.body.y - req.body.range;

	var x = {};
	var y = {};
	
	if(!!xDown){
		x = {"$gte": xDown};
	}
	if(!!xUp){
		x = {"$lte": xUp};
	}

	if(!!yDown){
		y = {"$gte": yDown};
	}
	if(!!yUp){
		y = {"$lte": yUp};
	}

	if(!!x){
		query.x = x;
	}
	if(!!y){
		query.y = y;
	}

	return query;
}

//ROUTES
app.get(basePath, function(req, res) {
	dbSchemas.Poi.find(function (err, pois) {
		if (err) {
			console.log(err);
			res.status(400).send(err);
		}else{
			res.status(200).send(pois);
		}
	});
});

app.post(basePath + '/query', function(req, res) {
	if(!req.body.x || (req.body.x && req.body.x < 0)){
		res.status(400).send({message: 'X coordinate cannot be null/negative!'});
		return;
	}else if(!req.body.y || (req.body.y && req.body.y < 0)){
		res.status(400).send({message: 'Y coordinate cannot be null/negative!'});
		return;
	}else if(!req.body.range || (req.body.range && req.body.range < 0)){
		res.status(400).send({message: 'Range cannot be null or black!'});
		return;
	}

	var query = buildQuery(req, res);

	dbSchemas.Poi.find(query, function (err, pois) {
		if (err) {
			console.log(err);
			res.status(400).send(err);
		}else{
			res.status(200).send(pois);
		}
	});
});

app.post(basePath, function(req, res) {
	if(!req.body.x || (req.body.x && req.body.x < 0)){
		res.status(400).send({message: 'X coordinate cannot be null/negative!'});
		return;
	}else if(!req.body.y || (req.body.y && req.body.y < 0)){
		res.status(400).send({message: 'Y coordinate cannot be null/negative!'});
		return;
	}else if(!req.body.name || (req.body.name && req.body.name.length === 0)){
		res.status(400).send({message: 'Poi\'s name cannot be null or black!'});
		return;
	}

	var poi = new dbSchemas.Poi(req.body);

	poi.save(function(err){
		if(err) {
			console.log(err);
			res.status(400).send(err);
		} else {
			res.status(201).send(poi);
		}
	});
});

//RUN
app.listen(port);
console.log('[xy_inc] Server started on port ' + port);