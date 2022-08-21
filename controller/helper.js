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
async function apiReq(domain, asins) {
	if (!asins) return res.send().status({ message: 'File is empty.' });

	var data = [];

	for (let i = 0; i < asins.length; i++) {
		const params = {
			api_key: '35DB182C051A4D338AB427DAA69A274A',
			amazon_domain: domain,
			asin: asins[i],
			type: 'product',
		};
		data[i] = await axios.get('https://api.rainforestapi.com/request', { params });
	}

	return data;
}
function compareProducts(listUsa, listCa, ratio, fbaStatus, rating) {
	var filteredProducts = [];

	listUsa.forEach((element, index) => {
		// console.log(usaSuccessValue);
		// console.log(usaPriceValue);
		// console.log(usaInStock);
		// console.log(usaIsFulfilledByAmazon);
		// console.log(usaRating);
		// console.log('--------------------------------');
		// console.log(caSuccessValue);
		// console.log(caPriceValue);
		// console.log(caInStock);
		// console.log(caIsFulfilledByAmazon);
		// console.log(caRating);
		try {
			var usaSuccessValue = element.data.request_info.success;
			var usaPriceValue = element.data.product.buybox_winner.price.value;
			var usaInStock = element.data.product.buybox_winner.availability.type;
			var usaIsFulfilledByAmazon = element.data.product.buybox_winner.fulfillment.is_fulfilled_by_amazon;
			var usaRating = element.data.product.rating;

			var caSuccessValue = listCa[index].data.request_info.success;
			var caPriceValue = listCa[index].data.product.buybox_winner.price.value;
			var caInStock = listCa[index].data.product.buybox_winner.availability.type;
			var caIsFulfilledByAmazon = listCa[index].data.product.buybox_winner.fulfillment.is_fulfilled_by_amazon;
			var caRating = listCa[index].data.product.rating;

			var priceRatio = caPriceValue / usaPriceValue;
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
					sellingPrice: caPriceValue,
				});
			}
		} catch (err) {
			console.log(err);
		}
	});

	return filteredProducts;
}

module.exports = {
	readFile,
	apiReq,
	compareProducts,
};
