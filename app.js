const request = require('request');
const yargs = require('yargs');

const argv = yargs.options({
	address: {
		demand: true,
		alias: 'a',
		describe: 'address to fetch weather',
		string: true
	} 
}).help().alias('help', 'h').argv;

let encodedAddress = encodeURIComponent(argv.address);

request({
		url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
		json: true
	}, (err, res, body) => {
	if(err){
		console.log('Unable to connect to Google server');
	} else if(body.status === 'ZERO_RESULTS') {
		console.log('Unable to find the provided address');
	} else if(body.status === 'OK'){
		console.log(`Address: ${body.results[0].formatted_address}`);
		console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
		console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
	}
});