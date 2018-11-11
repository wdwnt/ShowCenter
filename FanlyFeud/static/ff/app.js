angular.module('fanlyfeud', ['ngRoute', 'ngMaterial', 'vMix'])
.config(function($routeProvider, $mdThemingProvider){
	$routeProvider
        .when('/cp', {
            template: '<control-panel></control-panel>'
        })
    	.otherwise({
    		template: '<fanly-feud></fanly-feud>'
    	});
	
	$mdThemingProvider.theme('default')
		.primaryPalette('blue')
		.accentPalette('light-blue');
}).run(function($rootScope, $location){
	$rootScope.$location = $location;
	$rootScope.STATIC_BASE = STATIC_BASE;
});
