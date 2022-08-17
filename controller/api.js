const axios = require('axios');
const { readFile } = require('./helper');

module.exports = {
	getDataFromApi: async (req, res) => {
		var asins = await readFile();
		if (!asins) return res.send().status({ message: 'File is empty.' });
		let paramsUSA = {};
		let paramsCA = {};
		let resultUSA = [];
		let resultCA = [];
		asins.forEach(async (element) => {
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
			var aMERICA = await axios.get('https://api.rainforestapi.com/request', { paramsUSA });

			var cANADA = await axios.get('https://api.rainforestapi.com/request', { paramsCA });
		});

		res.json(resultUSA, resultCA);
	},
};
