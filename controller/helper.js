const readXlsxFile = require('read-excel-file/node');

async function readFile() {
	try {
		var rows = await readXlsxFile('/Users/cinoxil/Documents/GitHub/amazonApi/asin.xlsx');
	} catch (err) {
		console.log(err);
	}
	return rows;
}

//new promise yerine async await yapısı da kullanılabilir
// const readFile = new Promise((resolve, reject) => {
// 	readXlsxFile('/Users/cinoxil/Documents/amazonApi/asin.xlsx')
// 		.then((result) => {
// 			resolve(result);
// 		})
// 		.catch((err) => {
// 			reject(err);
// 		});
// });

module.exports = {
	readFile,
};
