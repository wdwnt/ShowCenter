angular.module('fanlyfeud', ['ngRoute', 'ngMaterial', 'broadcastChannel'])
.constant('BROADCAST_CHANNEL', 'fanlyfeud')
.config(function($routeProvider, $mdThemingProvider){
	$routeProvider
        .when('/cp', {
            template: '<control-panel></control-panel>'
        })
    	.otherwise({
    		template: '<fanly-feud-splash></fanly-feud-splash>'
    	});
	
	$mdThemingProvider.theme('default')
		.primaryPalette('blue')
		.accentPalette('light-blue');
}).run(function($rootScope, $location){
	$rootScope.$location = $location;
	$rootScope.STATIC_BASE = STATIC_BASE;
});
