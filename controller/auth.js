const user = require('../models/user');
const bcrypt = require('bcrypt');
const user = require('../models/user');
var jwt = require('jsonwebtoken');

const saltRounds = 10;

module.exports = {
	signUp: (req, res) => {
		var { email, password } = req.body;
		var hashedPassword;
		var user = user.findOne({ email });
		user
			? res.status(400).send('Bu email zaten kaydedilmiş')
			: bcrypt
					.hash(password, saltRounds)
					.then((result) => {
						hashedPassword = result;
					})
					.catch((err) => {
						console.log(err);
					});
		var user = new user({
			email: email,
			password: hashedPassword,
		})
			.then(() => {
				res.status(201).send('Başarılı');
			})
			.catch((err) => {
				res.sendStatus(500);
			});
	},
	signIn: async (req, res) => {
		var { email, password } = req.body;
		var user = user.findOne({ email });

		const match = await bcrypt.compare(password, user.password);
		if (match) {
			const token = jwt.sign({ email: user.email }, process.env.TOEKN_KEY, {
				expiresIn: '1y',
			});
			res.send(token);
		} else {
			res.status(401);
		}
	},
};
