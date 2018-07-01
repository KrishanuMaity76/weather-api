var https = require('https');
var express = require('express');
var app = express();
app.listen(1003, function() {
	console.log('Example app listening on port 3000!');
});

app.get('/weather/v1/forecasts', function(req, res) {
	req.on('data', function(chunk) {
		body.push(chunk);
	}).on('end', function() {
		var zipcode = req.query.zipcode;
		var options = {
		  host: 'api.openweathermap.org',
		  port: 443,
		  path: '/data/2.5/weather?appid=a7dbe2a8c33a2097071df476165cb5a6'+'&zip='+zipcode+',us',
		  method: 'GET'
		};

		var data = '';
		https.request(options, function(response) {
		  console.log('STATUS: ' + response.statusCode);
		  console.log('HEADERS: ' + JSON.stringify(response.headers));
		  response.setEncoding('utf8');
		  response.on('data', function (chunk) {
		    console.log('BODY: ' + chunk);
		    data = chunk;
		    res.setHeader('Content-Type', 'application/json')
		    res.status(200).send(chunk);
		  });
		}).end();
		
	});
});

