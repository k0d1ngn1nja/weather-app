const request = require('request');

let geoCodeAddress = (address, callback) => {
	let encodedAddress = encodeURIComponent(address);

	request({
			url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
			json: true
		}, (err, res, body) => {
		if(err){
			callback('Unable to connect to Google server');
		} else if(body.status === 'ZERO_RESULTS') {
			callback('Unable to find the provided address');
		} else if(body.status === 'OK'){
			callback(undefined, {
				address: body.results[0].formatted_address,
				latitude: body.results[0].geometry.location.lat,
				longitude: body.results[0].geometry.location.lng
			});
		}
	});
}

module.exports.geocodeAddress = geoCodeAddress;