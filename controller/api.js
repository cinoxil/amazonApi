const user = require('../models/user');

const { apiReq, readFile, compareProducts, logError } = require('./helper');

module.exports = {
	getDataFromApi: async (req, res) => {
		const { asins, ratio, fbaStatus, rating } = req.body;

		if (!asins || !ratio || fbaStatus == null || !rating) return res.sendStatus(400);

		try {
			const [usa, ca] = await Promise.all([apiReq('amazon.com', asins), apiReq('amazon.ca', asins)]);

			res.send(await compareProducts(usa, ca, ratio, fbaStatus, rating));

			const newData = await user.findOneAndUpdate(
				{ email: res.locals.user.email },
				{ $inc: { asinCount: usa.length } },
				{ new: true }
			);
		} catch (error) {
			logError(error);
		}
	},
};
