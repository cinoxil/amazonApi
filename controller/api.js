const axios = require('axios');
const { readFile, apiReqUsa, apiReqCa } = require('./helper');

module.exports = {
	getDataFromApi: async (req, res) => {
		const [usa, ca] = await Promise.all([apiReqUsa(), apiReqCa()]);
	},
};
