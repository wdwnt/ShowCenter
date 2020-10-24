angular.module('millionaire', ['ngRoute', 'ngMaterial', 'vMix', 'util'])
.config(function($routeProvider, $mdThemingProvider){
	$routeProvider
        // .when('/sogs', {
        //     template: '<sogs-main></sogs-main>'
        // })
    	.otherwise({
			template: `
<div style="display: flex">
	<div>
		<millionaire-question game="$root.game"></millionaire-question>
		<millionaire-admin game="$root.game"></millionaire-admin>
	</div>
	<millionaire-status game="$root.game"></millionaire-status>
</div>
`
    	});
	$mdThemingProvider.theme('default')
		.primaryPalette('blue')
		.accentPalette('light-blue');
}).run(function($rootScope){
	const LEVEL_DEFAULTS = [{
		amount: "CB$1",
		difficulty: "easy",
		answered: false,
		floor: false,
	}, {
		amount: "CB$2",
		difficulty: "easy",
		answered: false,
		floor: true,
	}, {
		amount: "CB$5",
		difficulty: "medium",
		answered: false,
		floor: false,
	}, {
		amount: "CB$10",
		difficulty: "medium",
		answered: false,
		floor: false,
	}, {
		amount: "CB$15",
		difficulty: "medium",
		answered: false,
		floor: true,
	}, {
		amount: "CB$25",
		difficulty: "hard",
		answered: false,
		floor: false,
	}, {
		amount: "CB$50",
		difficulty: "insane",
		answered: false,
		floor: false,
	}]

	$rootScope.game = {
		lifelinesAvailable: {
			audience: true,
			phone: true,
			fifty: true,
		},
		levels: angular.copy(LEVEL_DEFAULTS),
		questionBank: {
			easy: [],
			medium: [],
			hard: [],
			insane: [],
		},
		currentQuestion: {
			question: "This is a sample question. I made it really, really long so we could see if it wraps two lines. Like, oh my gosh, it's so long. Does it wrap?",
			answers: [
				"Answer one",
				"Answer two (correct)",
				"Answer three",
				"Answer four",
			],
			correctAnswer: 1,
			// These are only available on currentQuestion
			visibleAnswers: 0,
			selectedAnswer: null,
			correctAnswerRevealed: false,
		}
	};
});
