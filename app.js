require('dotenv').config();
// const yargs = require('yargs');
// const argv = yargs.options({
// 	address: {
// 		demand: true,
// 		alias: 'a',
// 		describe: 'address to fetch weather',
// 		string: true
// 	} 
// }).help().alias('help', 'h').argv;

// const geoCode = require('./geocode/geocoder.js');

// geoCode.geocodeAddress(argv.address, (err, result) => {
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log(JSON.stringify(result, undefined, 2));
// 	}
// });





const request = require('request');
// WEATHER REQUEST
request({
	url: `https://api.darksky.net/forecast/${process.env.FORECAST_IO_APIKEY}/6.441659,3.4137724`,
	json: true
}, function(err, res, body){
	if(!err && res.statusCode === 200){
		console.log(body.currently.temperature);
	} else {
		console.log('Unable to fetch weather.');
	}
});
