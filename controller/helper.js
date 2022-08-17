const readXlsxFile = require('read-excel-file/node');

async function readFile() {
	try {
		var rows = await readXlsxFile('/Users/cinoxil/Documents/GitHub/amazonApi/asin.xlsx');
	} catch (err) {
		console.log(err);
	}
	return rows;
}

async function apiReq() {
	var asins = await readFile();
	console.log(asins.length);
	if (!asins) return res.send().status({ message: 'File is empty.' });
	let paramsUsa = {};
	let paramsCa = {};
	asins.forEach(async (element) => {
		paramsUsa = {
			api_key: '35DB182C051A4D338AB427DAA69A274A',
			amazon_domain: domain,
			asin: 'amazon.com',
			type: 'product',
		};
		paramsCa = {
			api_key: '35DB182C051A4D338AB427DAA69A274A',
			amazon_domain: domain,
			asin: 'amazon.ca',
			type: 'product',
		};
		var [usa, ca] = await axios.all([
			'https://api.rainforestapi.com/request',
			{ paramsUsa },
			'https://api.rainforestapi.com/request',
			{ paramsCa },
		]);
	});

	return usa, ca;
}

module.exports = {
	readFile,
	apiReq,
};
