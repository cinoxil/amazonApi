const readXlsxFile = require('read-excel-file/node');

async function readFile() {
	try {
		var rows = await readXlsxFile('/Users/cinoxil/Documents/GitHub/amazonApi/asin.xlsx');
	} catch (err) {
		console.log(err);
	}
	return rows;
}

module.exports = {
	readFile,
};
