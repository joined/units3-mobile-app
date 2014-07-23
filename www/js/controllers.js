angular.module('units3.controllers', ['units3.services', 'base64', 'LocalStorageModule'])

.controller('DefaultCtrl', function($state, Utils, localStorageService) {
	// Controller of the default state opened when app is started for the
	// first time, or when it's closed and opened again
	if (Utils.loggedAndStay()) {
		// If user is set, and he asked to stay logged in, go to home
		$state.go('mainmenu.home');
	} else {
		// If user is not set, or if he asked not to stay logged in,
		// clear storage and go to signin
		Utils.logout();
	}
})

.controller('SignInCtrl', function($scope, Utils) {
	$scope.user = {staylogged: true};

	$scope.signIn = Utils.signIn;
})

.controller('MainCtrl', function($scope, $ionicSideMenuDelegate, Utils, localStorageService, WebApi, CordovaNetwork) {
	// Set icon to the "still" one
	$scope.refresh_icon = Utils.refreshIcon;

	$scope.toggleLeft = function() {
		// Binding for menu opening
		$ionicSideMenuDelegate.toggleLeft();
	};

	$scope.logout = Utils.logout;

	$scope.updateData = Utils.updateData;
})

.controller('HomeCtrl', function($scope, localStorageService) {
	// This should update userinfo everytime localstorage changes
	// but it doesn't seem to work
	$scope.$watch(function() {
		// value to watch for changes
		return angular.toJson(localStorageService.get('data').home)
	}, function () {
		// change to make
		$scope.userinfo = localStorageService.get('data').home;
	});
})

.controller('LibrettoCtrl', function($scope, localStorageService, $ionicModal) {
	// This should update esami everytime localstorage changes
	// but it doesn't seem to work
	$scope.$watch(function() {
		// value to watch for changes
		return angular.toJson(localStorageService.get('data').libretto)
	}, function () {
		// change to make
		$scope.esami = localStorageService.get('data').libretto;
	});

	// Modal showing exam details
	$ionicModal.fromTemplateUrl('templates/modal-esame.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});

	$scope.openModal = function(esame) {
		// We use modalData to pass info to modal
		$scope.modalData = esame;
		$scope.modal.show();
	};

	$scope.closeModal = function() {
		// Modal hiding
	 	$scope.modal.hide();
	};

	$scope.$on('$destroy', function() {
		//Cleanup the modal when we're done with it!
		$scope.modal.remove();
	});
})

.controller('AppelliCtrl', function($scope, localStorageService) {
	// This should update local data everytime localstorage changes
	// but it doesn't seem to work

	$scope.$watch(function() {
		// value to watch for changes
		return angular.toJson(localStorageService.get('data').prenotazione_appelli)
	}, function () {
		// change to make
		$scope.appelli = localStorageService.get('data').prenotazione_appelli;
	});
})

.controller('TasseCtrl', function($scope, localStorageService) {
	// This should update local data everytime localstorage changes
	// but it doesn't seem to work
	$scope.$watch(function() {
		// value to watch for changes
		return angular.toJson(localStorageService.get('data').pagamenti)
	}, function () {
		// change to make
		$scope.tasse = localStorageService.get('data').pagamenti;
	});
});