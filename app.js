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

geoCode.geocodeAddress(argv.address, (err, result) => {
	if(err){
		console.log(err);
	} else {
		console.log(JSON.stringify(result, undefined, 2));
	}
});