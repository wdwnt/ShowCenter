angular.module('mapgame', ['ngRoute', 'ngMaterial', 'util'])
.config(function($routeProvider, $mdThemingProvider){
	$routeProvider
        .when('/map/:rows/:cols/:img', {
            template: '<map></map>'
        })
    	.otherwise({
    		template: '<setup></setup>'
    	});
	
	$mdThemingProvider.theme('default')
		.primaryPalette('blue')
		.accentPalette('light-blue');
}).run(function($rootScope, $location){
	$rootScope.$location = $location;
});
