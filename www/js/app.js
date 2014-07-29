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
		.state('sections', {
			url: "/sections",
			abstract: true,
			templateUrl: "templates/side-menu.html",
			controller: 'MainCtrl'
		})
		// MainMenu->Home state
		.state('sections.home', {
			url: "/home",
			views: {
				'menuContent': {
					templateUrl: "templates/sections/home.html",
					controller: "HomeCtrl"
				}
			}
		})
		// MainMenu->Libretto state
		.state('sections.libretto', {
			url: "/libretto",
			views: {
				'menuContent': {
					templateUrl: "templates/sections/libretto.html",
					controller: "LibrettoCtrl"
				}
			}
		})
		// MainMenu->Tasse state
		.state('sections.tasse', {
			url: "/tasse",
			views: {
				'menuContent': {
					templateUrl: "templates/sections/tasse.html",
					controller: "TasseCtrl"
				}
			}
		})
		// MainMenu->Appelli state
		.state('sections.appelli', {
			url: "/appelli",
			abstract: true,
			views: {
				'menuContent': {
					templateUrl: "templates/sections/appelli.html",
				}
			}
		})
		.state('sections.appelli.disponibili', {
			url: "/disponibili",
			views: {
				'menuContent': {
					templateUrl: "templates/sections/appelli.html"
				},
				'tab-disponibili': {
					templateUrl: "templates/sections/appelli/disponibili.html",
					controller: "AppDispCtrl"
				}
			}
		})
		.state('sections.appelli.prenotati', {
			url: "/prenotati",
			views: {
				'menuContent': {
					templateUrl: "templates/sections/appelli.html"
				},
				'tab-prenotati': {
					templateUrl: "templates/sections/appelli/prenotati.html",
					controller: "AppPrenCtrl"
				}
			}
		})
		// MainMenu->Settings state
		.state('sections.settings', {
			url: "/settings",
			views: {
				'menuContent': {
					templateUrl: "templates/sections/settings.html",
					controller: "SettingsCtrl"
				}
			}
		})
	// Fallback to default state
	$urlRouterProvider.otherwise("/");
});