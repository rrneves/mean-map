app.run(function ($rootScope, $route, $location) {
	$rootScope.storage = window.localStorage;
	$rootScope.route = $route;
	if ($rootScope.storage.getItem('user')) {
		$rootScope.user = JSON.parse($rootScope.storage.getItem('user'));
	};
	$rootScope.openModal = function (modal) {
		$(modal).modal('open');
	};
	$('#loading-modal').modal({dismissible: false});
});