angular.module('units3', ['ionic', 'units3.controllers'])

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
})

.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider
		// Default state. From here we redirect the user
		// to signin or home
		.state('default', {
			url: "/",
			controller: 'DefaultCtrl'
		})
		// Signin state, with form
		.state('signin', {
			url: "/sign-in",
			templateUrl: "templates/sign-in.html",
			controller: 'SignInCtrl'
		})
		// Abstract handler for side menus
		.state('mainmenu', {
			url: "/main",
			abstract: true,
			templateUrl: "templates/main-menu.html",
			controller: 'MainCtrl'
		})
		// MainMenu->Home state
		.state('mainmenu.home', {
			url: "/home",
			views: {
				'menuContent': {
					templateUrl: "templates/home.html",
					controller: "HomeCtrl"
				}
			}
		})
		// MainMenu->Libretto state
		.state('mainmenu.libretto', {
			url: "/libretto",
			views: {
				'menuContent': {
					templateUrl: "templates/libretto.html",
					controller: "LibrettoCtrl"
				}
			}
		})
		// MainMenu->Appelli state
		.state('mainmenu.appelli', {
			url: "/appelli",
			views: {
				'menuContent': {
					templateUrl: "templates/appelli.html",
					controller: "AppelliCtrl"
				}
			}
		})
		// MainMenu->Tasse state
		.state('mainmenu.tasse', {
			url: "/tasse",
			views: {
				'menuContent': {
					templateUrl: "templates/tasse.html",
					controller: "TasseCtrl"
				}
			}
		});

	// Fallback to default state
	$urlRouterProvider.otherwise("/");
});