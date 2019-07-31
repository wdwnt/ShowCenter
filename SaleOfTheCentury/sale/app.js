angular.module('sale', ['ngRoute', 'ngMaterial', 'vMix', 'util', 'broadcastChannel'])
.constant('BROADCAST_CHANNEL', 'sale')
.config(function($routeProvider, $mdThemingProvider){
	$routeProvider
		.when('/cp', {
			template: '<control-panel></control-panel>'
		})
		.otherwise({
			template: '<main></main>'
		});

	$mdThemingProvider.theme('default')
		.primaryPalette('blue')
		.accentPalette('light-blue');
});