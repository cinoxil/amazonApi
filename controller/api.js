const { apiReq, readFile, compareProducts, logError } = require('./helper');

module.exports = {
	getDataFromApi: async (req, res) => {
		const { asins, ratio, fbaStatus, rating } = req.body;

		if (!asins || !ratio || fbaStatus == null || !rating) return res.sendStatus(400);

		try {
			const [usa, ca] = await Promise.all([apiReq('amazon.com', asins), apiReq('amazon.ca', asins)]);
		} catch (error) {
			logError(error);
		}

		res.send(await compareProducts(usa, ca, ratio, fbaStatus, rating));
	},
};
