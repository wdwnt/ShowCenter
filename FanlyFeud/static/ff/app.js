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
	BUZZ_IN: 2, //arg: which team buzzed in
	SHOW_ANSWER: 3, //arg: which answer to show
	ADD_STRIKE: 4,
	SHOW_STRIKE: 5,
	AWARD_POINTS: 6, //arg: which team gets the points
	NEXT_ROUND: 7,
	END_GAME: 8,
	FADE_END_THEME: 9
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
}).filter('points', function(){
	return function(points){
		if((!points && points !== 0) || points<0){
			return '   ';
		}else if(points<10){
			return ' '+points+' ';
		}else if(points<100){
			return ' '+points;
		}else{
			return points;
		}
	};
}).filter('multiplier', function(){
	return function(number){
		if(number===3){
			return 'TRIPLE'.split('').join('\n');
		}else if(number===2){
			return 'DOUBLE'.split('').join('\n');
		}else{
			return '';
		}
	};
});
