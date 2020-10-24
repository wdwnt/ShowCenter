angular.module('millionaire')
	.component('millionaireQuestion', {
		bindings: {
			game: '=',
		},
		templateUrl: 'question/millionaire-question.component.html',
		controller: function () {
			const ctrl = this;

			ctrl.answerLabels = ["A", "B", "C", "D"];

			ctrl.clickAnswer = (index) => {
				ctrl.game.currentQuestion.selectedAnswer = index;
			};

			ctrl.getClassForAnswer = (index) => {
				if(ctrl.game.currentQuestion.visibleAnswers <= index) {
					return ['hidden'];
				}else if(ctrl.game.currentQuestion.correctAnswerRevealed && ctrl.game.currentQuestion.correctAnswer === index){
					return ['correct'];
				}else if(ctrl.game.currentQuestion.selectedAnswer === index){
					return ['selected'];
				}else{
					return [];
				}
			}
		}
	});