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
		// MainMenu->Appelli state
		.state('sections.appelli', {
			url: "/appelli",
			views: {
				'menuContent': {
					templateUrl: "templates/sections/appelli.html",
					controller: "AppelliCtrl"
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
		// MainMenu->Tabs state
		.state('sections.tabs', {
			url: "/tabs",
			abstract: true,
			views: {
				'menuContent': {
					templateUrl: "templates/sections/tabs.html"
				}
			}
		})
		.state('sections.tabs.first', {
			url: "/first",
			views: {
				'menuContent': {
					templateUrl: "templates/sections/tabs.html"
				},
				'tab-first': {
					templateUrl: "templates/sections/tabs/first.html",
					controller: "FirstTabCtrl"
				}
			}
		})
		.state('sections.tabs.second', {
			url: "/second",
			views: {
				'menuContent': {
					templateUrl: "templates/sections/tabs.html",
				},
				'tab-second': {
					templateUrl: "templates/sections/tabs/second.html"
				}
			}
		})
		.state('sections.tabs.third', {
			url: "/third",
			views: {
				'menuContent': {
					templateUrl: "templates/sections/tabs.html",
				},
				'tab-third': {
					templateUrl: "templates/sections/tabs/third.html"
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