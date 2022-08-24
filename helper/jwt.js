const jwt = require('jsonwebtoken');

function getVerifyToken(token, secret) {
	return new Promise((resolve, reject) => {
		jwt.verify(token, secret, function (err, decoded) {
			if (err) {
				resolve(false);
			}
			resolve(decoded);
		});
		reject();
	});
}

function getToken(data, secret, time) {
	return new Promise((resolve, reject) => {
		resolve(
			jwt.sign(
				{
					data: data,
				},
				secret,
				{ expiresIn: time }
			)
		);
	});
}

module.exports = {
	createToken: async (data, secret, time) => {
		return await getToken(data, secret, time);
	},
	verifyToken: async (token, secret) => {
		return await getVerifyToken(token, secret);
	},
};
