app.factory('errorInterceptor', function ($q) {
	return {
		responseError: function (rejection) {
			Materialize.toast('Não foi possível completar a ação.', 2000);
			$('#loading-modal').modal('close');
		}
	};
});