angular.module('units3.controllers', ['units3.services', 'base64', 'LocalStorageModule'])

.controller('DefaultCtrl', function($state, Utils, localStorageService, Updater) {
	// Controller of the default state opened when app is started for the
	// first time, or when it's closed and opened again
	if (Utils.loggedAndStay()) {
		// If user is set, and he asked to stay logged in, go to home
		$state.go(localStorageService.get('lastState'));

		Updater.updateData();
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

.controller('MainCtrl', function($scope, $ionicSideMenuDelegate, Utils, Updater) {
	$scope.updater = Updater;

	$scope.toggleLeft = function() {
		// Binding for menu opening
		$ionicSideMenuDelegate.toggleLeft();
	};

	$scope.logout = Utils.logout;

	$scope.updateData = Utils.updateData;
})

.controller('HomeCtrl', function($state, $scope, localStorageService, Utils) {
	$scope.getDate = Utils.getDate;
	$scope.$watch(function() {
		// value to watch for changes
		return angular.toJson(localStorageService.get('data').home)
	}, function () {
		// change to make
		$scope.userinfo = localStorageService.get('data').home;
	});

	localStorageService.set('lastState', $state.current.name);
})

.controller('LibrettoCtrl', function($state, $scope, localStorageService, $ionicModal, Esami) {
	$scope.esami = Esami;
	$scope.getDate = Utils.getDate;

	// Modal showing exam details
	$ionicModal.fromTemplateUrl('templates/sections/modal-esame.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});

	$scope.markClass = Utils.markClass;

	$scope.showModal = function(esame) {
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

	localStorageService.set('lastState', $state.current.name);
})

.controller('AppelliCtrl', function($state, $scope, localStorageService) {
	$scope.convDate = Utils.getDate;
	// This should update local data everytime localstorage changes
	// but it doesn't seem to work

	$scope.$watch(function() {
		// value to watch for changes
		return angular.toJson(localStorageService.get('data').prenotazione_appelli)
	}, function () {
		// change to make
		$scope.appelli = localStorageService.get('data').prenotazione_appelli;
	});

	localStorageService.set('lastState', $state.current.name);
})

.controller('TasseCtrl', function($state, $scope, localStorageService, Utils) {
	$scope.getDate = Utils.getDate;
	// This should update local data everytime localstorage changes
	// but it doesn't seem to work
	$scope.$watch(function() {
		// value to watch for changes
		return angular.toJson(localStorageService.get('data').pagamenti)
	}, function () {
		// change to make
		$scope.tasse = localStorageService.get('data').pagamenti;
	});

	localStorageService.set('lastState', $state.current.name);
})

.controller('TabsCtrl', function($scope, $state, $ionicTabsDelegate) {
	$scope.goToTab = function(index_to_go) {
		// Get current tab index number
		cur_tab_index = $ionicTabsDelegate.selectedIndex();

		if (cur_tab_index < index_to_go) {
			$scope.animation = 'slide-left-right';
		} else {
			$scope.animation = 'slide-right-left';
		}

		// Get tab to go name from index
		var tab_to_go;
		switch (index_to_go) {
			case 0: tab_to_go = 'first'; break;
			case 1: tab_to_go = 'second'; break;
			case 2: tab_to_go = 'third'; break;
		}

    	$state.go('sections.tabs.' + tab_to_go)
  	}
})

.controller('SettingsCtrl', function($scope, $rootScope, Updater) {
	Updater.hideIcon = true;

	$scope.$on('$destroy', function() {
		//Cleanup the modal when we're done with it!
		Updater.hideIcon = false;
	});
});
