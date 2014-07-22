angular.module('units3.controllers', ['units3.services', 'base64', 'LocalStorageModule'])

.controller('DefaultCtrl', function($scope, $state, localStorageService) {
	// Default state controller which is opened when app is opened for the
	// first time, or when it's closed and opened again
	if (localStorageService.get('user') && localStorageService.get('user').staylogged) {
		// If user is set, and he asked to stay logged in, go to home
		$state.go('mainmenu.home');
	} else {
		// If user is not set, or if he asked not to stay logged in,
		// clear storage and go to signin
		localStorageService.clearAll();
		$state.go('signin');
	}
})

.controller('SignInCtrl', function($scope, $state, $ionicLoading, $ionicPopup, CordovaNetwork, localStorageService, webapi) {
	$scope.user = {staylogged: true};

	$scope.showAlert = function(testo) {
		// Show error alert with custom text
		$ionicPopup.alert({
			title: 'Errore',
			template: testo,
			okType: 'button-assertive'
		});
	};
	$scope.showLoading = function() {
		// Show loading popup
		$ionicLoading.show({
			template: 'Caricamento... <i class="icon ion-loading-c"></i>'
		});
	};
	$scope.hideLoading = function() {
		// Hide loading popup
		$ionicLoading.hide();
	};

	$scope.signIn = function(user) {
		// Login handler
		if (!user.username || !user.password) {
			$scope.showAlert('Inserisci le credenziali.');
		}
		else if (!CordovaNetwork.isOnline()) {
			// If we are offline, show an alert.
			$scope.showAlert('Sei offline. Connettiti e riprova.');
		} else {
			// Show loading popup
			$scope.showLoading();

			// Get user data
			webapi.getData(user).then(function(result) {
				// When finished, hide loading popup
				$scope.hideLoading();

				if (!result.success) {
					// If the request failed, show an alert
					if (result.status == 401) {
						$scope.showAlert('Credenziali non valide.');
					} else {
						$scope.showAlert('Errore di rete.');
					}
				} else {
					// If the request succeded, save data in localstorage
					localStorageService.set('data', result.data);
					localStorageService.set('user', user);

					// Then go to main menu
					$state.go('mainmenu.home');
				}
			});
		}
	};
})

.controller('MainCtrl', function($scope, $ionicSideMenuDelegate, $ionicPopup, localStorageService, webapi, CordovaNetwork) {
	// Set icon to the "still" one
	$scope.refresh_icon = 'ion-refresh';

	$scope.toggleLeft = function() {
		// Binding for menu opening
		$ionicSideMenuDelegate.toggleLeft();
	};

	$scope.logout = function() {
		// On logout, clear all saved data
		localStorageService.clearAll();
	};

	$scope.showAlert = function(testo) {
		// Show error alert with custom text
		$ionicPopup.alert({
			title: 'Errore',
			template: testo,
			okType: 'button-assertive'
		});
	};

	$scope.refresh = function() {
		// Refresh handler
		if (!CordovaNetwork.isOnline()) {
			// If we are offline, show an alert.
			$scope.showAlert('Sei offline. Connettiti e riprova.');
		} else {
			// On refresh button click, make icon spin
			$scope.refresh_icon = 'ion-refreshing';

			// Get user info from local storage
			user = localStorageService.get('user');

			// Make new request to update data
			webapi.getData(user).then(function(result) {
				// Stop icon spin
				$scope.refresh_icon = 'ion-refresh';
				
				if (!result.success) {
					// If the request failed, show an alert
					$scope.showAlert('Errore di rete.');
				} else {
					// If the request succeded, save data in localstorage
					localStorageService.set('data', result.data);
					localStorageService.set('user', user);
				}
			});
		}
	};
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