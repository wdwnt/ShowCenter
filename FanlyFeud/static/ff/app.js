angular.module('fanlyfeud', ['ngRoute', 'ngMaterial', 'broadcastChannel', 'util'])
.constant('BROADCAST_CHANNEL', 'fanlyfeud')
.constant('SHOW_STATES', {
	PRESHOW: 0,
	MAIN_ROUND: 1,
	FAST_MONEY: 2,
	END_SCREEN: 3
})
.constant('QUEUE',{
	PLAY_OPENING: 0,
	START_SHOW: 1,
	SHOW_ANSWER: 2, //arg: which answer to show
	ADD_STRIKE: 3,
	SHOW_STRIKE: 4,
	AWARD_POINTS: 5, //arg: which team gets the points
	NEXT_ROUND: 6,
	END_GAME: 7
	//more to come for fast money
})
.config(function($routeProvider, $mdThemingProvider){
	$routeProvider
		.when('/cp', {
			template: '<control-panel></control-panel>'
		})
		.when('/show', {
			template: '<show></show>'
		})
		.otherwise({
			template: '<a target="_blank" href="#!show">Show window</a><br><a target="_blank" href="#!cp">Control panel</a>'
		});

	$mdThemingProvider.theme('default')
		.primaryPalette('blue')
		.accentPalette('light-blue');
}).run(function($rootScope, $location, SHOW_STATES, QUEUE){
	$rootScope.$location = $location;
	$rootScope.STATIC_BASE = STATIC_BASE;
	$rootScope.SHOW_STATES = SHOW_STATES;
	$rootScope.QUEUE = QUEUE;
});
