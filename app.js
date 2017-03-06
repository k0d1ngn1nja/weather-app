const request = require('request');

request({
		url: 'http://maps.googleapis.com/maps/api/geocode/json?address=40%20hill%20street%20london',
		json: true
	}, (err, res, body) => {
		// console.log(`Address: ${body.results[0].formatted_address}`);
		console.log(`Latitude: ${body.results[0].geometry.location.lat}`,`Longitude: ${body.results[0].geometry.location.lng}` );
});