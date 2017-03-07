const yargs = require('yargs');
const argv = yargs.options({
	address: {
		demand: true,
		alias: 'a',
		describe: 'address to fetch weather',
		string: true
	} 
}).help().alias('help', 'h').argv;

const geoCode = require('./geocode/geocoder.js');
const weather = require('./weather/forecast');
// ====================================


geoCode.geocodeAddress(argv.address, (err, result) => {
	if(err){
		console.log(err);
	} else {
		console.log(result.address);
		weather.getforeCast(result.latitude, result.longitude,  (err, weatherResults) => {
			if(err){
				console.log(err);
			} else {
				console.log(`The current temperature is ${weatherResults.temperature} and the humidity index level is ${weatherResults.humidity}.`);
			}
		});
	}
});