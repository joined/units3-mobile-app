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

    this.markClass = function(mark) {
        if (isNaN(mark)) return 'nan';
        else if (mark < 20) return 'less20';
        else if (mark < 24) return 'less24';
        else if (mark < 27) return 'less27';
        else return 'more27';
    }

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

                    $state.go('mainmenu.home');
                }, 
                function(result) {
                    // Handle error
                    Utils.hideLoading();

                    Utils.showAlert(angular.toJson(result));

                    /*
                    if (result.status == 401) {
                        Utils.showAlert('Credenziali errate');
                    } else {
                        Utils.showAlert('Errore di rete');
                    }
                    */
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

.factory('CordovaNetwork', function($window) {
    return {
        // Uses Cordova to detect online state or not
        isOnline: function () {
            return (typeof $window.navigator.connection == "undefined") 
                || ($window.navigator.connection.type !== 'none');
        }
    };
});