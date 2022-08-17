const axios = require('axios');
const { readFile, apiReq } = require('./helper');

module.exports = {
	getDataFromApi: async (req, res) => {
		var [resultUsa, resultCa] = apiReq();
		res.json(resultUSA, resultCA);
	},
};
