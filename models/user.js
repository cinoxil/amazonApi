const mongoose = require('mongoose');

var userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			unique: true,
			trim: true,
		},
		password: {
			type: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('users', userSchema);
