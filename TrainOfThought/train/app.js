angular.module(
	'train',
	['ngRoute', 'ngMaterial', 'util']
).config(function($routeProvider, $mdThemingProvider){
	$mdThemingProvider.theme('default')
		.primaryPalette('blue')
		.accentPalette('light-blue');
}).run(function($rootScope){
	const $scope = $rootScope;

	$scope.increment = 1;
	$scope.teams = [
		{name: "Team 1", score: 0},
		{name: "Team 2", score: 0}
	];

	$scope.load = function(){
		const answers = $scope.inputText.split("\n");
		$scope.words = [];
		angular.forEach(answers, function(answer){
			const word = {
				answer: answer,
				revealedText: ""
			};
			$scope.words.push(word);
		});
		$scope.revealAll($scope.words[0]);
		$scope.revealAll($scope.words[$scope.words.length-1]);
		$scope.inputText = "";
	};

	$scope.revealLetter = function(word){
		word.revealedText += word.answer[word.revealedText.length] || "";
	};

	$scope.revealAll = function(word){
		word.revealedText = word.answer;
	};
});
