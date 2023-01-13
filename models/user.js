const mongoose = require('mongoose');
const stringDb = 'mongodb+srv://amazonUser:Ugur12345.@cluster0.i8itvsc.mongodb.net/amazonApi';
mongoose.connect(stringDb);

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
		asinCount: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('users', userSchema);
