require('dotenv').config();
const yargs = require('yargs');
const axios = require('axios');

const argv = yargs.options({
	address: {
		demand: true,
		alias: 'a',
		describe: 'address to fetch weather',
		string: true
	} 
}).help().alias('help', 'h').argv;

// ====================================

var encodedAddress = encodeURIComponent(argv.address);

var geocodeURL = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeURL).then((response) => {
	if(response.data.status === 'ZERO_RESULTS'){
		throw new Error('Unable to find address');
	}

	var lat = response.data.results[0].geometry.location.lat;
	var lng = response.data.results[0].geometry.location.lng;

	var weatherURL = `https://api.darksky.net/forecast/${process.env.FORECAST_IO_APIKEY}/${lat},${lng}`
	console.log(response.data.results[0].formatted_address);

	return axios.get(weatherURL);
}).then((response) => {
	var temp = response.data.currently.temperature;
	var apparentTemp = response.data.currently.apparentTemperature;
	console.log(`It's currently ${temp}. It feels like ${apparentTemp}`);
}).catch((e) => {
	if(e.code === 'ENOTFOUND'){
		console.log('Unable to connect to API servers.');
	} else {
		console.log(e.message);
	}
});