const { apiReq, readFile, compareProducts } = require('./helper');

module.exports = {
	getDataFromApi: async (req, res) => {
		const file = await readFile();
		const [usa, ca] = await Promise.all([apiReq('amazon.com', file), apiReq('amazon.ca', file)]);

		res.send(compareProducts(usa, ca, 2, false, 4));

		// console.log(usa.length);
		// console.log(ca.length);
		// const siktim = [];
		// usa.forEach((element, index) => {
		// 	siktim.push({ usa: element.data, ca: ca[index].data });
		// });

		// return res.send(siktim);
	},
};
