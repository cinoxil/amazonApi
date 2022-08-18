const readXlsxFile = require('read-excel-file/node');
const axios = require('axios');

async function readFile() {
	try {
		var rows = await readXlsxFile('/Users/cinoxil/Documents/GitHub/amazonApi/asin.xlsx');
	} catch (err) {
		console.log(err);
	}
	return rows;
}
async function apiReqUsa() {
	var asins = await readFile();

	if (!asins) return res.send().status({ message: 'File is empty.' });

	var usa = [];

	for (let i = 0; i < asins.length; i++) {
		const params = {
			api_key: '35DB182C051A4D338AB427DAA69A274A',
			amazon_domain: 'amazon.com',
			asin: asins[i],
			type: 'product',
		};
		usa[i] = await axios.get('https://api.rainforestapi.com/request', { params });
	}

	return usa;
}
async function apiReqCa() {
	var asins = await readFile();

	if (!asins) return res.send().status({ message: 'File is empty.' });

	var ca = [];

	for (let i = 0; i < asins.length; i++) {
		const params = {
			api_key: '35DB182C051A4D338AB427DAA69A274A',
			amazon_domain: 'amazon.ca',
			asin: asins[i],
			type: 'product',
		};
		ca[i] = await axios.get('https://api.rainforestapi.com/request', { params });
	}

	return ca;
}

module.exports = {
	readFile,
	apiReqUsa,
	apiReqCa,
};
