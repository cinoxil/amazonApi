const axios = require('axios');
const { readFile } = require('./helper');

module.exports = {
	getDataFromApi: async (req, res) => {
		var asins = await readFile();
		if (!asins) return res.send().status({ message: 'File is empty.' });
		let paramsUSA = {};
		let paramsCA = {};

		const ca = await asins.forEach(async (element) => {
			let resultUSA = [];
			let resultCA = [];
			paramsUSA = {
				api_key: '35DB182C051A4D338AB427DAA69A274A',
				amazon_domain: 'amazon.com',
				asin: element,
				type: 'product',
			};
			paramsCA = {
				api_key: '35DB182C051A4D338AB427DAA69A274A',
				amazon_domain: 'amazon.ca',
				asin: element,
				type: 'product',
			};
			await axios
				.get('https://api.rainforestapi.com/request', { paramsUSA })
				.then((response) => {
					// print the JSON response from Rainforest API
					resultUSA.push(response.data);
				})
				.catch((error) => {
					// catch and print the error
					console.log(error);
				});
			await axios
				.get('https://api.rainforestapi.com/request', { paramsCA })
				.then((response) => {
					// print the JSON response from Rainforest API
					resultCA.push(response.data);
				})
				.catch((error) => {
					// catch and print the error
					console.log(error);
				});
			return resultUSA, resultCA;
		});

		res.json(ca);
	},
};
