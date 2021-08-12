angular.module('sogs', ['ngRoute', 'ngMaterial', 'vMix', 'util'])
.config(function($routeProvider, $mdThemingProvider){
	$routeProvider
        .when('/sogs', {
            template: '<sogs-main></sogs-main>'
        })
    	.otherwise({
			template: '<sogs-main></sogs-main>'
    	});
	
	$mdThemingProvider.theme('default')
		.primaryPalette('blue')
		.accentPalette('light-blue');
}).run(function($rootScope, $location){
	$rootScope.$location = $location;
});
