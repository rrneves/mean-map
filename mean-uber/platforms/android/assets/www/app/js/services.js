app.factory('userAPI', function ($http) {
	var _post = function (data) {
		return $http.post('https://mean-uber-api.heliojuniorkroger.com/users', data);
	};
	var _login = function (data) {
		return $http.post('https://mean-uber-api.heliojuniorkroger.com/users/login', data);
	};
	var _verify = function (data) {
		return $http.post('https://mean-uber-api.heliojuniorkroger.com/users/verify', data);
	};
	var _putName = function (data) {
		return $http.put('https://mean-uber-api.heliojuniorkroger.com/users/put-name', data);
	};
	var _putPhoto = function (data) {
		return $http.put('https://mean-uber-api.heliojuniorkroger.com/users/put-photo', data);
	};
	var _delete = function (data) {
		return $http.post('https://mean-uber-api.heliojuniorkroger.com/users/delete-verify', data);
	};
	var _putPassword = function (data) {
		return $http.put('https://mean-uber-api.heliojuniorkroger.com/users/password', data);
	};
	return {
		post: _post,
		login: _login,
		verify: _verify,
		putName: _putName,
		putPhoto: _putPhoto,
		delete: _delete,
		putPassword: _putPassword
	};
});
app.factory('addressesAPI', function ($http) {
	var _post = function (data) {
		return $http.post('https://mean-uber-api.heliojuniorkroger.com/addresses', data);
	};
	var _get = function (id) {
		return $http.get('https://mean-uber-api.heliojuniorkroger.com/addresses/' + id);
	};
	var _delete = function (id) {
		return $http.delete('https://mean-uber-api.heliojuniorkroger.com/addresses/' + id);
	};
	var _getUser = function (id) {
		return $http.get('https://mean-uber-api.heliojuniorkroger.com/users/addresses/' + id);
	};
	var _put = function (data) {
		return $http.put('https://mean-uber-api.heliojuniorkroger.com/addresses', data);
	};
	return {
		post: _post,
		get: _get,
		delete: _delete,
		getUser: _getUser,
		put: _put
	};
});
app.factory('mapsAPI', function ($http) {
	var _get = function (data) {
		return $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + data.lat + ',' + data.lng + '&key=AIzaSyBnIjrrpNIZfL11aOBG7fH5lWuEfvt1Uc4');
	};
	var _postTravel = function (data) {
		return $http.post('https://mean-uber-api.heliojuniorkroger.com/travels', data);
	};
	var _getTravels = function (id) {
		return $http.get('https://mean-uber-api.heliojuniorkroger.com/travels/' + id);
	};
	return {
		get: _get,
		postTravel: _postTravel,
		getTravels: _getTravels
	};
});