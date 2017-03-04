var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mean-uber');
var models = {};
models.User = mongoose.model('User', {
	name: String,
	phone: String,
	email: String,
	password: String,
	photo: String
});
models.UserAddresses = mongoose.model('UserAddresses', {
	name: String,
	address: String,
	userId: String
});
models.UserTravels = mongoose.model('UserTravels', {
	origin: String,
	destination: String,
	userId: String
});
module.exports = models;