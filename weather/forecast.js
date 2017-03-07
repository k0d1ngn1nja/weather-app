require('dotenv').config();
const request = require('request');

let getForecast = (lat, lng, callback) => {
	request({
		url: `https://api.darksky.net/forecast/${process.env.FORECAST_IO_APIKEY}/${lat},${lng}`,
		json: true
	}, function(err, res, body){
		if(!err && res.statusCode === 200){
			callback(undefined, {
				temperature: body.currently.temperature,
				summary: body.currently.summary,
				humidity: body.currently.humidity
			});
		} else {
			callback('Unable to fetch weather.');
		}
	});
}

module.exports.getforeCast = getForecast;