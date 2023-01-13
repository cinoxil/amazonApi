const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const user = require('../models/user');
const { logError } = require('./helper');

const saltRounds = 10;
require('dotenv').config({ path: `./.env` });
module.exports.authController = {
	get: async (req, res) => {
		var userd = await user.find();
		let userArr = [];
		userd.forEach((element) => {
			userArr.push({ email: element.email, count: element.asinCount });
		});
		res.send(userArr);
	},
	create: async (req, res) => {
		var { email, password } = req.body;
		var hashedPassword;
		var userd = await user.findOne({ email: email });

		if (userd) {
			return res.status(400).send('Bu email zaten kaydedilmiş');
		} else {
			bcrypt
				.hash(password, saltRounds)
				.then((result) => {
					hashedPassword = result;
					var usert = new user({
						email: email,
						password: hashedPassword,
					}).save(function (err) {
						if (err) {
							return res.sendStatus(500);
						} else {
							res.sendStatus(201);
						}
					});
				})
				.catch((err) => {
					logError(err);
					console.log(err);
				});
		}
	},
	update: async (req, res) => {
		var { email, password } = req.body;
		var hashedPassword;
		bcrypt
			.hash(password, saltRounds)
			.then((result) => {
				hashedPassword = result;
			})
			.catch((err) => {
				console.log(err);
				logError(err);
				return res.sendStatus(500);
			});
		try {
			await user.findOneAndUpdate({ email: email }, { password: hashedPassword });
			res.sendStatus(200);
		} catch (error) {
			logError(error);
			res.sendStatus(500);
		}
	},
	delete: async (req, res) => {
		const { email } = req.params;
		if (email === 'admin') return res.status(400).send('Bu email silinemez!');
		try {
			await user.findOneAndDelete({ email: email });
			res.sendStatus(200);
		} catch (error) {
			logError(error);
			res.sendStatus(500);
		}
	},
	signIn: async (req, res) => {
		var { email, password } = req.body;
		var userd = await user.findOne({ email: email });

		if (userd) {
			const match = await bcrypt.compare(password, userd.password);

			if (match) {
				const token = jwt.sign({ email: userd.email }, process.env.ACCESS_SECRET_KEY, {
					expiresIn: '1y',
				});
				res.send(token);
			} else {
				res.sendStatus(401);
			}
		} else {
			res.sendStatus(401);
		}
	},
};
