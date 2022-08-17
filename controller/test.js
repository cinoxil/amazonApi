const axios = require('axios');
paramsUSA = {
	api_key: '35DB182C051A4D338AB427DAA69A274A',
	amazon_domain: 'amazon.com',
	asin: 'B0009I3T3S',
	type: 'product',
};

axios
	.get('https://api.rainforestapi.com/request', { paramsUSA })
	.then((response) => {
		// print the JSON response from Rainforest API

		console.log(JSON.stringify(response.data, 0, 2));
	})
	.catch((error) => {
		// catch and print the error
		console.log(error);
	});
