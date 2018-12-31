angular.module('tts', ['ngRoute', 'ngMaterial', 'vMix', 'util'])
.config(function($routeProvider, $mdThemingProvider){
	$routeProvider
		.otherwise({
			template: '<game-board></game-board>'
		});

	$mdThemingProvider.theme('default')
		.primaryPalette('blue')
		.accentPalette('light-blue');
}).run(function($rootScope){

});
