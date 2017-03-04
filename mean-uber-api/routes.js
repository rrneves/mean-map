var password = require('password-hash-and-salt');
var fs = require('fs');
module.exports = function (app, models) {
	app.post('/api/users', function (req, res) {
		password(req.body.password).hash(function (err, password) {
			if (err) console.log(err);
			models.User.create({
				name: req.body.name,
				phone: req.body.phone,
				email: req.body.email,
				password: password,
				photo: 'app/images/user-default.png'
			}, function (err, user) {
				if (err) console.log(err);
				res.json(user);
			});
		});
	});
	app.post('/api/users/login', function (req, res) {
		models.User.findOne({
			phone: req.body.phone
		}, function (err, user) {
			if (err) console.log(err);
			if (user) {
				password(req.body.password).verifyAgainst(user.password, function (err, verified) {
					if (err) console.log(err);
					verified ? res.json(user) : res.send('error');
				});
			} else {
				res.send('error');
			};
		});
	});
	app.post('/api/users/verify', function (req, res) {
		models.User.findOne({$or: [
				{
					email: req.body.email
				}, {
					phone: req.body.phone
				}
			]}, function(err, user) {
			if (err) console.log(err);
			if (user) {
				user.email === req.body.email ? res.send('invalid-email') : res.send('invalid-phone');
			} else {
				res.send(false);
			};
		});
	});
	app.put('/api/users/put-name', function (req, res){
		models.User.findOneAndUpdate({
			_id: req.body.id
		}, {$set: {
			name: req.body.name
		}}, {new: true}, function (err, user) {
			if (err) console.log(err);
			res.json(user);
		});
	});
	app.put('/api/users/put-photo', function (req, res) {
		var photo = {};
		photo.file = req.body.photo.replace(/^data:image\/png;base64,/, '');
		photo.name = req.body.id + new Date().getTime() + '.png';
		fs.writeFile('public/profile_pictures/' + photo.name, photo.file, 'base64', function (err) {
			if (err) console.log(err);
			models.User.findOneAndUpdate({
				_id: req.body.id
			}, {$set: {
				photo: 'http://localhost:3000/profile_pictures/' + photo.name
			}}, {new: true}, function (err, user) {
				if (err) console.log(err);
				res.json(user);
			});
		});
	});
	app.post('/api/addresses', function (req, res) {
		models.UserAddresses.create({
			userId: req.body.id,
			name: req.body.name,
			address: req.body.address
		}, function (err, address) {
			if (err) console.log(err);
			res.json(address);
		});
	});
	app.get('/api/users/addresses/:user_id', function (req, res) {
		models.UserAddresses.find({
			userId: req.params.user_id
		}, function (err, addresses) {
			if (err) console.log(err);
			res.json(addresses);
		});
	});
	app.delete('/api/addresses/:id', function (req, res) {
		models.UserAddresses.remove({
			_id: req.params.id
		}, function (err, address) {
			if (err) console.log(err);
			models.UserAddresses.find(function (err, addresses) {
				if (err) console.log(err);
				res.json(addresses);
			});
		});
	});
	app.get('/api/addresses/:id', function (req, res) {
		models.UserAddresses.findOne({
			_id: req.params.id
		}, function (err, address) {
			if (err) console.log(err);
			res.json(address);
		});
	});
	app.put('/api/addresses', function (req, res) {
		models.UserAddresses.findOneAndUpdate({
			_id: req.body.id
		}, {$set: {
			name: req.body.name,
			address: req.body.address
		}}, function (err) {
			if (err) console.log(err);
			models.UserAddresses.find({
				userId: req.body.userId
			}, function (err, addresses) {
				if (err) console.log(err);
				res.json(addresses);
			});
		});
	});
	app.post('/api/users/delete-verify', function (req, res) {
		models.User.findOne({
			_id: req.body.id,
			phone: req.body.phone
		}, function (err, user) {
			if (err) console.log(err);
			if (user) {
				password(req.body.password).verifyAgainst(user.password, function (err, verified) {
					if (err) console.log(err);
					if (verified) {
						models.User.remove({
							_id: user.id
						}, function (err) {
							if (err) console.log(err);
							models.UserAddresses.remove({
								userId: user.id
							}, function (err) {
								if (err) console.log(err);
								res.send(false);
							});
						});
					} else {
						res.send(true);
					};
				});
			} else {
				res.send(true);
			};
		});
	});
	app.put('/api/users/password', function (req, res) {
		models.User.findOne({
			_id: req.body.id,
		}, function (err, user) {
			password(req.body.currentPassword).verifyAgainst(user.password, function (err, verified) {
				if (err) console.log(err);
				if (verified) {
					password(req.body.newPassword).hash(function (err, password) {
						models.User.findOneAndUpdate({
							_id: req.body.id
						}, {$set: {
							password: password
						}}, {new: true}, function (err, user) {
							res.json(user);
						});
					});
				} else {
					res.send('error');
				};
			});
		});
	});
	app.post('/api/travels', function (req, res) {
		models.UserTravels.create({
			origin: req.body.origin,
			destination: req.body.destination,
			userId: req.body.id
		}, function (err, travel) {
			if (err) console.log(err);
			res.json(travel);
		});
	});
	app.get('/api/travels/:user_id', function (req, res) {
		models.UserTravels.find({
			userId: req.params.user_id
		}, function (err, travels) {
			if (err) console.log(err);
			res.json(travels);
		});
	});
};