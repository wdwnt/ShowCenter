angular.module('showController', ['ngRoute', 'ngMaterial', 'vMix', 'util'])
.config(function($routeProvider, $mdThemingProvider){
	$routeProvider
    	.otherwise({
			template: '<show-controller></show-controller>'
    	});
	
	$mdThemingProvider.theme('default')
		.primaryPalette('blue')
		.accentPalette('light-blue');
}).run(function($rootScope, $location){
	$rootScope.$location = $location;
});
