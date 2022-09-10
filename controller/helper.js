const readXlsxFile = require('read-excel-file/node');
const axios = require('axios');
const fs = require('fs');

function logError(errMessage) {
	var date = new Date();
	var dateNow = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
	fs.appendFileSync('errLog.txt', dateNow + ' ' + errMessage + '\n', 'UTF-8', { flags: 'a' });
}

async function readFile() {
	try {
		var rows = await readXlsxFile('asin.xlsx');
	} catch (err) {
		console.log(err);
	}
	return rows;
}
async function apiReq(domain, asins) {
	if (!asins) return res.send().status({ message: 'File is empty.' });

	var data = [];
	var asinList = [];

	for (let i = 0; i < asins.length; i++) {
		const params = {
			api_key: '35DB182C051A4D338AB427DAA69A274A',
			amazon_domain: domain,
			asin: asins[i],
			type: 'product',
		};
		asinList.push(
			axios.create({
				baseURL: 'https://api.rainforestapi.com/request',
				params: params,
			})
		);
	}
	data = await axios.all(asinList.map((endpoint) => endpoint.get()));

	return data;
}
function compareProducts(listUsa, listCa, ratio, fbaStatus, rating) {
	return new Promise((resolve, reject) => {
		const options = {
			method: 'GET',
			url: 'https://currencyscoop.p.rapidapi.com/latest',
			headers: {
				'X-RapidAPI-Key': 'e370a032c5mshcfc920f383bd638p198060jsnf2e7230051fc',
				'X-RapidAPI-Host': 'currencyscoop.p.rapidapi.com',
			},
		};

		axios
			.request(options)
			.then(function (response) {
				var filteredProducts = [];
				listUsa.forEach((element, index) => {
					try {
						var usaSuccessValue = element.data?.request_info?.success;

						var usaPriceValue = element.data?.product?.buybox_winner?.price?.value;
						var usaInStock = element.data?.product?.buybox_winner?.availability?.type;
						var usaIsFulfilledByAmazon =
							element.data?.product?.buybox_winner?.fulfillment?.is_fulfilled_by_amazon;
						//var usaRating = element.data.product.rating;

						var caSuccessValue = listCa[index].data?.request_info?.success;
						var caPriceValue = listCa[index].data?.product?.buybox_winner?.price?.value;
						//var caInStock = listCa[index].data.product.buybox_winner.availability.type;
						var caIsFulfilledByAmazon =
							listCa[index].data?.product?.buybox_winner?.fulfillment?.is_fulfilled_by_amazon;
						var caRating = listCa[index].data?.product?.rating;

						var priceRatio = caPriceValue / response.data.response.rates.CAD / usaPriceValue;

						if (fbaStatus == true) {
							if (
								usaSuccessValue == true &&
								caSuccessValue == true &&
								priceRatio > ratio &&
								usaInStock == 'in_stock' &&
								usaIsFulfilledByAmazon == true &&
								caRating >= rating
							) {
								filteredProducts.push({
									usaLink: element.data.product.link,
									caLink: listCa[index].data.product.link,
									asin: element.data.product.asin,
									priceRatio: priceRatio,
									rating: listCa[index].data.product.rating,
									buyingPrice: usaPriceValue,
									sellingPrice: caPriceValue / response.data.response.rates.CAD,
								});
							}
						} else {
							if (
								usaSuccessValue == true &&
								caSuccessValue == true &&
								priceRatio > ratio &&
								usaInStock == 'in_stock' &&
								usaIsFulfilledByAmazon == true &&
								caIsFulfilledByAmazon == fbaStatus &&
								caRating >= rating
							) {
								filteredProducts.push({
									usaLink: element.data.product.link,
									caLink: listCa[index].data.product.link,
									asin: element.data.product.asin,
									priceRatio: priceRatio,
									rating: listCa[index].data.product.rating,
									buyingPrice: usaPriceValue,
									sellingPrice: caPriceValue / response.data.response.rates.CAD,
								});
							}
						}
					} catch (err) {
						console.log(err);
						logError(err);
						reject(err);
					}
				});
				resolve(filteredProducts);
			})
			.catch(function (error) {
				console.log(error);
				logError(error);
				reject(error);
			});
	});
}

module.exports = {
	readFile,
	apiReq,
	compareProducts,
	logError,
};
