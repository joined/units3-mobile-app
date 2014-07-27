angular.module('units3.services', ['base64'])

.factory('WebApi', function($http, $base64) {
	return {
		// Get user data
		getData: function(user) {
			// Encode auth with base64
			encoded_auth = $base64.encode(user.username + ':' + user.password);

			// Set authorization header for HTTP Basic auth
			$http.defaults.headers.common = {
				'Authorization': 'Basic ' + encoded_auth,
			};

			return $http.get(
				'http://api.units3.tk/?select=home,libretto,prenotazione_appelli,pagamenti',
				// 'http://localhost:5000/?select=home,libretto,prenotazione_appelli,pagamenti',
				{timeout: 5000});
		}
	};
})

.service('Utils', function($state, $ionicPopup, $ionicLoading, CordovaNetwork, WebApi, localStorageService) {
	Utils = this;

	this.showAlert = function (text) {
		// Show alert
		$ionicPopup.alert({
			title: 'Errore',
			template: text,
			okType: 'button-assertive'
		});
	};

	this.showLoading = function() {
		// Show loading popup
		$ionicLoading.show({
			template: 'Caricamento... <i class="icon ion-loading-c"></i>'
		});
	};
	
	this.hideLoading = function() {
		// Hide loading popup
		$ionicLoading.hide();
	};

	this.logout = function() {
		// Clear local data and go to signin page
		localStorageService.clearAll();
		$state.go('signin');
	};

	this.saveData = function(user, data) {
		localStorageService.set('data', data);
		localStorageService.set('user', user);
	};

	this.loggedAndStay = function() {
		return localStorageService.get('user')
			&& localStorageService.get('user').staylogged;
	};

	this.signIn = function(user) {
		// Login handler
		if (!user.username || !user.password) {
			Utils.showAlert('Inserisci le credenziali.');
		}
		else if (!CordovaNetwork.isOnline()) {
			// If we are offline, show an alert.
			Utils.showAlert('Sei offline. Connettiti e riprova.');
		} else {
			// Show loading popup
			Utils.showLoading();

			// Get user data
			WebApi.getData(user).then(
				function(result) {
					// Handle success
					Utils.hideLoading();

					Utils.saveData(user, result.data);

					$state.go('sections.home');
				}, 
				function(result) {
					// Handle error
					Utils.hideLoading();
					
					if (result.status == 401) {
						Utils.showAlert('Credenziali errate');
					} else {
						Utils.showAlert('Errore di rete');
					}
					
				}
			);
		}
	};
})

.service('Updater', function(Utils, CordovaNetwork, WebApi, localStorageService) {
	this.refreshIcon = 'ion-refresh';

	Updater = this;

	this.updateData = function() {
		// Refresh handler
		if (!CordovaNetwork.isOnline()) {
			// If we are offline, show an alert.
			Utils.showAlert('Sei offline. Connettiti e riprova.');
		} else {
			// On refresh button click, make icon spin
			Updater.refreshIcon = 'ion-refreshing';

			// Get user info from local storage
			user = localStorageService.get('user');

			// Get user data
			WebApi.getData(user).then(
				function(result) {
					// Handle success
					Updater.refreshIcon = 'ion-refresh';
					
					Utils.saveData(user, result.data);
				}, 
				function(result) {
					// Handle error
					Updater.refreshIcon = 'ion-refresh';

					Utils.showAlert('Errore di rete');
				}
			);
		}
	};
})

.service('Esami', function(localStorageService) {
	Esami = this;

	this.examData = localStorageService.get('data').libretto;

	this.getDate = function(datestring) {
		d = new Date(datestring);
		return d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();
	}

	this.getColor = function(voto) {
		if (isNaN(voto)) return 'black';
		else {
			conv = (voto - 18) * 0.03;
			RGB = Esami.HSLtoRGB(conv, 1, 0.35);
			return 'rgb(' + RGB[0] + ',' +
				   RGB[1] + ',' + RGB[2] + ')';
		}
	}

	this.HSLtoRGB = function(h, s, l) {
		var r, g, b;

	    if (s == 0) {
	        r = g = b = l; // achromatic
	    } else {
	        function hue2rgb(p, q, t) {
	            if(t < 0) t += 1;
	            if(t > 1) t -= 1;
	            if(t < 1/6) return p + (q - p) * 6 * t;
	            if(t < 1/2) return q;
	            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
	            return p;
	        }

	        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	        var p = 2 * l - q;
	        r = hue2rgb(p, q, h + 1/3);
	        g = hue2rgb(p, q, h);
	        b = hue2rgb(p, q, h - 1/3);
	    }

	    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
	};
})

.factory('CordovaNetwork', function($window) {
	return {
		// Uses Cordova to detect online state or not
		isOnline: function () {
			return (typeof $window.navigator.connection == "undefined") 
				|| ($window.navigator.connection.type !== 'none');
		}
	};
});