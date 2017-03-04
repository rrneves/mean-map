app.config(function ($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'view/map.html',
		controller: 'mapCtrl',
		resolve: {
			session: function ($rootScope, $location) {
				if (!$rootScope.storage.getItem('user')) $location.path('/login');
			}
		}
	});
	$routeProvider.when('/login', {
		templateUrl: 'view/login.html',
		controller: 'signCtrl',
		resolve: {
			session: function ($rootScope, $location) {
				if ($rootScope.storage.getItem('user')) $location.path('/');
			}
		}
	});
	$routeProvider.when('/register', {
		templateUrl: 'view/register.html',
		controller: 'signCtrl',
		resolve: {
			session: function ($rootScope, $location) {
				if ($rootScope.storage.getItem('user')) $location.path('/');
			}
		}
	});
	$routeProvider.when('/first-config', {
		templateUrl: 'view/first-config.html',
		controller: 'configCtrl',
		resolve: {
			session: function ($rootScope, $location) {
				if (!$rootScope.storage.getItem('user')) $location.path('/login');
			}
		}
	});
	$routeProvider.when('/settings', {
		templateUrl: 'view/settings.html',
		controller: 'configCtrl',
		resolve: {
			session: function ($rootScope, $location) {
				if (!$rootScope.storage.getItem('user')) $location.path('/login');
			}
		}
	});
	$routeProvider.when('/user', {
		templateUrl: 'view/user.html',
		controller: 'configCtrl',
		resolve: {
			session: function ($rootScope, $location) {
				if (!$rootScope.storage.getItem('user')) $location.path('/login');
			}
		}
	});
	$routeProvider.when('/addresses', {
		templateUrl: 'view/addresses.html',
		controller: 'configCtrl',
		resolve: {
			session: function ($rootScope, $location) {
				if (!$rootScope.storage.getItem('user')) $location.path('/login');
			}
		}
	});
	$routeProvider.when('/add-address', {
		templateUrl: 'view/add-address.html',
		controller: 'configCtrl',
		returnEnabled: true,
		resolve: {
			session: function ($rootScope, $location) {
				if (!$rootScope.storage.getItem('user')) $location.path('/login');
			}
		}
	});
	$routeProvider.when('/edit-address/:address_id', {
		templateUrl: 'view/edit-address.html',
		controller: 'configCtrl',
		returnEnabled: true,
		resolve: {
			session: function ($rootScope, $location) {
				if (!$rootScope.storage.getItem('user')) $location.path('/login');
			}
		}
	});
	$routeProvider.when('/crop-profile-photo', {
		templateUrl: 'view/crop-profile-photo.html',
		controller: 'configCtrl',
		returnEnabled: true,
		resolve: {
			session: function ($rootScope, $location) {
				if (!$rootScope.storage.getItem('user')) $location.path('/login');
			},
			photo: function ($rootScope, $location) {
				if (!$rootScope.profilePhoto) $location.path('/user');
			}
		}
	});
	$routeProvider.when('/delete-account', {
		templateUrl: 'view/delete-account.html',
		controller: 'configCtrl',
		returnEnabled: true,
		resolve: {
			session: function ($rootScope, $location) {
				if (!$rootScope.storage.getItem('user')) $location.path('/login');
			}
		}
	});
	$routeProvider.when('/change-password', {
		templateUrl: 'view/change-password.html',
		controller: 'configCtrl',
		returnEnabled: true,
		resolve: {
			session: function ($rootScope, $location) {
				if (!$rootScope.storage.getItem('user')) $location.path('/login');
			}
		}
	});
	$routeProvider.when('/route', {
		templateUrl: 'view/route.html',
		controller: 'mapCtrl',
		returnEnabled: true,
		resolve: {
			session: function ($rootScope, $location) {
				if (!$rootScope.storage.getItem('user')) $location.path('/login');
			}
		}
	});
	$routeProvider.when('/travels', {
		templateUrl: 'view/travels.html',
		controller: 'configCtrl',
		resolve: {
			session: function ($rootScope, $location) {
				if (!$rootScope.storage.getItem('user')) $location.path('/login');
			}
		}
	});
	$routeProvider.when('/edit-address', {
		templateUrl: 'view/edit-address.html',
		controller: 'configCtrl',
		resolve: {
			session: function ($rootScope, $location) {
				if (!$rootScope.storage.getItem('user')) $location.path('/login');
			}
		}
	});
});
app.config(function ($httpProvider) {
	$httpProvider.interceptors.push('errorInterceptor');
});
app.config(function ($compileProvider) {
	$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|local|data):/);
});