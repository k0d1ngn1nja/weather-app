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
		console.log(`Address: ${body.results[0].address_components[3].short_name}`);
		console.log(`Latitude: ${body.results[0].geometry.location.lat}`,`Longitude: ${body.results[0].geometry.location.lng}` );
});