const axios = require('axios');
const { readFile } = require('./helper');

module.exports = {
	getDataFromApi: async (req, res) => {
		var data = await getData();
		res.json(data);
	},
};

async function getData() {
	var asins = await readFile();
	if (asins) {
		var result = [];
		for (i = 0; i < asins.length; i++) {
			// set up the request parameters
			const params = {
				api_key: '35DB182C051A4D338AB427DAA69A274A',
				amazon_domain: 'amazon.com',
				asin: asins[i],
				type: 'product',
			};
			// make the http GET request to Rainforest API
			await axios
				.get('https://api.rainforestapi.com/request', { params })
				.then((response) => {
					// print the JSON response from Rainforest API
					result.push(response.data);
				})
				.catch((error) => {
					// catch and print the error
					console.log(error);
				});
		}
		return result;
	}
}
