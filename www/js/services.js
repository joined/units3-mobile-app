angular.module('units3.services', ['base64'])

.factory('webapi', function($http, $base64) {
    return {
        // Get user data
        getData: function(user) {
            // Encode auth with base64
            encoded_auth = $base64.encode(user.username + ':' + user.password);

            // Set authorization header for HTTP Basic auth
            $http.defaults.headers.common = {
                'Authorization': 'Basic ' + encoded_auth
            };

            return $http.get(
                'http://api.units3.tk/?select=home,libretto,prenotazione_appelli,pagamenti',
                {withCredentials: true, timeout: 5000}
                ).then(
                    function(result) {
                        // If fetching went ok, set flag
                        result.success = true;
                        return result;
                    }, 
                    function(result) {
                        // If fetching failed, set flag
                        result.success = false;
                        return result;
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