app.controller('navCtrl', function ($rootScope, $scope, $location) {
	$scope.logout = function () {
		$rootScope.user = null;
		$scope.storage.removeItem('user');
		$location.path('/login');
	};
	$scope.goBack = function () {
		window.history.back();
	};
});
app.controller('mapCtrl', function ($rootScope, $scope, $location, mapsAPI, $cordovaGeolocation, NgMap) {
	$('#filter-modal').modal();
	$('#origin-modal').modal();
	$('#destination-modal').modal();
	$('#confirm-modal').modal();
	$cordovaGeolocation.getCurrentPosition({timeout: 10000, enableHighAccuracy: false}).then(function (position) {
		$rootScope.user.location = [position.coords.latitude, position.coords.longitude];
		console.log('posicao minha', position)
		mapsAPI.get({lat: position.coords.latitude, lng: position.coords.longitude}).then(function success (address) {

			console.log('adress encontradoooo', address)
			$scope.origin = address.data.results[0].formatted_address;
		});
	}, function (err) {
		Materialize.toast('Não foi possível obter sua localização.', 2000);
	});
	NgMap.getMap().then(function (map) {
		$scope.map = map;
	});
	$scope.confirmTravel = function (origin, destination) {
		mapsAPI.postTravel({origin: origin, destination: destination, id: $scope.user._id}).then(function success (travel) {
			$rootScope.user.travels.push(travel.data);
			$scope.storage.setItem('user', JSON.stringify($scope.user));
			$('#loading-modal').modal('open');
			Materialize.toast('Requisitando o motorista mais próximo.', 2000);
			$('#loading-modal').modal('close');
		});
	};
	$scope.updateLocation = function () {
		$cordovaGeolocation.getCurrentPosition({timeout: 10000, enableHighAccuracy: false}).then(function (position) {
			$scope.map.setCenter({lat: position.coords.latitude, lng: position.coords.longitude});
		}, function (err) {
			Materialize.toast('Não foi possível obter sua localização.', 2000);
		});
	};
});
app.controller('configCtrl', function ($rootScope, $scope, userAPI, addressesAPI, $location, $routeParams, $cordovaGeolocation, mapsAPI) {
	$('#home-config-modal').modal();
	$('#work-config-modal').modal();
	$('#success-config-modal').modal();
	if ($routeParams.address_id) {
		addressesAPI.get($routeParams.address_id).then(function success (address) {
			$scope.address = address.data;
			$scope.addressEdit = address.data;
		});
	};
	$scope.updateConfig = function (item, value) {
		$rootScope.user.config[item] = value;
		$scope.storage.setItem('user', JSON.stringify($scope.user));
	};
	$scope.deleteAccount = function (phone, password) {
		userAPI.delete({id: $scope.user._id, phone: phone, password: password}).then(function success (err) {
			if (err.data) {
				Materialize.toast('Número de telefone ou senha estão incorretos.', 2000);
			} else {
				$rootScope.user = null;
				$scope.storage.removeItem('user');
				$location.path('/login');
			};
		});
	};
	$scope.putPassword = function (currentPassword, newPassword) {
		userAPI.putPassword({currentPassword: currentPassword, newPassword: newPassword, id: $scope.user._id}).then(function success (user) {
			if (user.data === 'error') {
				Materialize.toast('Senha inserida está incorreta.', 2000);
			} else {
				$rootScope.user.password = user.data.password;
				$scope.storage.setItem('user', JSON.stringify($scope.user));
				Materialize.toast('Senha atualizada com sucesso.', 2000);
				$location.path('/user');
			};
		});
	};
	$scope.triggerUploadPhoto = function () {
		$('#profile-img-upload').trigger('click');
	};
	$scope.uploadPhoto = function (photo) {
		$rootScope.profilePhoto = 'data:image/png;base64,' + photo.base64;
		$location.path('/crop-profile-photo');
	};
	$scope.updatePhoto = function (photo) {
		$('#loading-modal').modal('open');
		userAPI.putPhoto({id: $scope.user._id, photo: photo}).then(function success (user) {
			$rootScope.user.photo = user.data.photo;
			$scope.storage.setItem('user', JSON.stringify($scope.user));
			Materialize.toast('Foto atualizada com sucesso.', 2000);
			$('#loading-modal').modal('close');
			$location.path('/user');
		});
	};
	$scope.openHomeConfig = function () {
		$('#loading-modal').modal('open');
		$cordovaGeolocation.getCurrentPosition({timeout: 10000, enableHighAccuracy: false}).then(function (position) {
			mapsAPI.get({lat: position.coords.latitude, lng: position.coords.longitude}).then(function success (address) {
				$scope.home = address.data.results[0].formatted_address;
				$('#loading-modal').modal('close');
				$('#home-config-modal').modal('open');
			});
		}, function (err) {
			$('#loading-modal').modal('close');
			Materialize.toast('Não foi possível obter sua localização.', 2000);
			$('#home-config-modal').modal('open');
		});
	};
	$scope.updateName = function (name) {
		userAPI.putName({name: name, id: $scope.user._id}).then(function success (user) {
			$rootScope.user.name = user.data.name;
			$scope.storage.setItem('user', JSON.stringify($scope.user));
			Materialize.toast('Nome atualizado com sucesso.', 2000);
		});
	};
	$scope.updateAddress = function (name, address, id) {
		addressesAPI.put({name: name, address: address, id: id, userId: $scope.user._id}).then(function success (addresses) {
			$rootScope.user.addresses = addresses.data;
			$scope.storage.setItem('user', JSON.stringify($scope.user));
			Materialize.toast('Endereço alterado.', 2000);
			$location.path('/addresses');
		});
	};
	$scope.postAddress = function (name, address, dontRedirect) {
		addressesAPI.post({name: name, address: address, id: $scope.user._id}).then(function success (address) {
			$rootScope.user.addresses.push(address.data);
			$scope.storage.setItem('user', JSON.stringify($scope.user));
			Materialize.toast('Endereço adicionado.', 2000);
			if (!dontRedirect) {
				$location.path('/addresses');
			};
		});
	};
	$scope.deleteAddress = function (id) {
		addressesAPI.delete(id).then(function success (addresses) {
			$rootScope.user.addresses = addresses.data;
			$scope.storage.setItem('user', JSON.stringify($scope.user));
			Materialize.toast('Endereço removido.', 2000);
		});
	};
});
app.controller('signCtrl', function ($rootScope, $scope, userAPI, $location, addressesAPI, mapsAPI , $cordovaGeolocation) {
	$scope.login = function (phone, password) {
		userAPI.login({phone: phone, password: password}).then(function success (user) {
			if (user.data === 'error') {
				Materialize.toast('Número de telefone ou senha estão incorretos.', 2000);
			} else {
				$rootScope.user = user.data;
				$rootScope.user.config = {notifications: true, statistics: true};
				addressesAPI.getUser(user.data._id).then(function success (addresses) {
					$rootScope.user.addresses = addresses.data;
					mapsAPI.getTravels(user.data._id).then(function success (travels) {
						$rootScope.user.travels = travels.data;
						$scope.storage.setItem('user', JSON.stringify(user.data));
						$location.path('/');
					});
				});
			};
		});
	};
	$scope.register = function (name, email, phone, password) {
		userAPI.verify({email: email, phone: phone}).then(function success (err) {
			if (err.data === 'invalid-phone') {
				Materialize.toast('Este número de telefone já está cadastrado.', 2000);
			} else {
				if (err.data === 'invalid-email') {
					Materialize.toast('Este endereço de e-mail já está cadastrado.', 2000);
				} else {
					userAPI.post({name: name, email: email, phone: phone, password: password}).then(function success (user) {
						$rootScope.user = user.data;
						$rootScope.user.config = {notifications: true, statistics: true};
						$rootScope.user.addresses = [];
						$rootScope.user.travels = [];
						$scope.storage.setItem('user', JSON.stringify(user.data));
						$location.path('/first-config');
					});
				};
			};
		});
	};
});