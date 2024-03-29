angular.module('fanlyfeud')
.component('controlPanel', {
	templateUrl: 'templates/control-panel.template.html',
	controller: function($scope, broadcastBinding, times, SHOW_STATES, QUEUE){
		let ctrl = this;

		const DEFAULT_TEAM_DATA = {
			name: "",
			points: 0,
			members: [],
			buzzedIn: false,
			winners: false
		};

		ctrl.createSurveyQuestion = function(numAnswers){
			return {
				question: "",
				answers: times(numAnswers, function(){
					return {
						answer: "",
						points: 0,
						revealed: false
					};
				})
			}
		};

		ctrl.resetShow = function(){
			ctrl.show = {
				state: SHOW_STATES.PRESHOW,
				queue: [],
				errorLog: [],
				teams: {
					left: angular.copy(DEFAULT_TEAM_DATA),
					right: angular.copy(DEFAULT_TEAM_DATA)
				},
				main: {
					currentRound: 0,
					strikes: 0,
					pointsOnBoard: null,
					surveyData: []
				},
				/*fastMoney: {
					surveyData: [],
					firstAnswers: times(5, () => {
						return "";
					}),
					secondAnswers: times(5, () => {
						return "";
					}),
				}*/ //fast money is not currently implemented
			};
		};

		ctrl.loadJSON = function(){
			ctrl.show = JSON.parse(ctrl.jsonInput);
		};

		ctrl.queue = function(todo, arg1){
			ctrl.show.queue.push(todo);
			if(arg1){
				ctrl.show.queue.push(arg1);
			}
		};

		ctrl.keypress = function(key){
			if(key==="1"){
				ctrl.queue(QUEUE.BUZZ_IN, 'left');
			}else if(key==="2"){
				ctrl.queue(QUEUE.BUZZ_IN, 'right');
			}
		};

		ctrl.loadRoundFromText = function(roundNumber, text){
			let surveyData = ctrl.show.main.surveyData;

			let lines = text.split(/\n/);
			let question = lines.splice(0, 1)[0].trim();
			let answers = lines.map(function(line){
				let parts=line.split(/[,\t]/);
				return {
					answer: parts[0],
					points: parseInt(parts[1]),
					revealed: false
				};
			});

			surveyData[roundNumber] = {
				question: question,
				answers: answers
			};
		};

		ctrl.toggleAnswerVisible = function(index){
			let answer = ctrl.show.main.surveyData[ctrl.show.main.currentRound].answers[index];
			if(answer.revealed){
				answer.revealed = false;
				if(ctrl.show.main.strikes < 3){
					//Because if there's 3 strikes and you're hiding answers, don't remove the points.
					ctrl.show.main.pointsOnBoard -= answer.points * ctrl.currentPointMultiplier();
				}
			}else{
				ctrl.show.queue.push(QUEUE.SHOW_ANSWER, index);
			}
		};

		ctrl.currentPointMultiplier = function(){
			let round = (ctrl.show && ctrl.show.main && ctrl.show.main.currentRound) || 0;
			return Math.max(1, round - 1); //for first 3 rounds, multipler is 1; 4th is 2; 5th is 3.
		};

		ctrl.$onInit = function(){
			ctrl.show = angular.fromJson(localStorage.getItem("fanlyFeud"));
			if(!ctrl.show){
				ctrl.resetShow();
			}

			$scope.$watch(function(){
				return angular.toJson(ctrl.show);
			}, function(){
				localStorage.setItem("fanlyFeud", angular.toJson(ctrl.show));
			});

			broadcastBinding($scope, undefined, "$ctrl.show");
		};
	}
});
