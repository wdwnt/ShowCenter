angular.module('fanlyfeud')
.component('show', {
	templateUrl: STATIC_BASE+'templates/show.template.html',
	controller: function($scope, broadcastBinding, $timeout, SHOW_STATES, QUEUE){
		let ctrl = this;

		const SOUNDS = {
			OPENING_THEME: 'openingTheme',
			DING: 'dingSound',
			STRIKE: 'strikeSound',
			ROUND_WIN: 'roundWinDings',
			SHORT_THEME: 'shortThemeSound',
			BUZZER_SOUND: 'buzzerSound',
			OUT_THEME: 'outTheme'
		};

		//courtesy http://www.qwizx.com/gssfx/usa/ff.htm
		const SOUND_URLS = {
			OPENING_THEME: '',
			DING: STATIC_BASE+'audio/ff-clang.wav',
			STRIKE: STATIC_BASE+'audio/ff-strike.wav',
			ROUND_WIN: STATIC_BASE+'audio/ff-dings.wav',
			SHORT_THEME: '',
			BUZZER_SOUND: STATIC_BASE+'audio/ff-ringin.wav',
			OUT_THEME: ''
		};

		ctrl.SOUNDS = SOUNDS;
		ctrl.SOUND_URLS = SOUND_URLS;

		function getQueue(){
			return ctrl.show.queue.splice(0,1)[0];
		}

		function playSound(id){
			document.getElementById(id).play();
		}

		function stopSound(id){
			document.getElementById(id).pause();
			document.getElementById(id).currentTime = 0;
		}

		function showStrikes(count){
			playSound(SOUNDS.STRIKE);
			ctrl.showStrikes = count;
			$timeout(function(){
				ctrl.showStrikes = 0;
			}, 1000);
		}

		function awardPoints(team){
			//TODO
			// wipe the points for the round
			// wipe the points for the team getting the points
			// add the points to that team
			// re-display the points for the team
		}

		function processQueue(){
			let command = getQueue();

			//set up a couple shorthand vars we'll use frequently
			let main = (ctrl.show && ctrl.show.main) || null;
			let curSurvey = (main && main.surveyData[main.currentRound]) || null;

			switch (command) {
				case QUEUE.PLAY_OPENING:
					playSound(SOUNDS.OPENING_THEME);
					break;
				case QUEUE.START_SHOW:
					stopSound(SOUNDS.OPENING_THEME);
					ctrl.show.state = SHOW_STATES.MAIN_ROUND;
					break;
				case QUEUE.SHOW_ANSWER:
					let answerToShow = getQueue();
					playSound(SOUNDS.DING);
					curSurvey.answers[answerToShow].revealed = true;
					if(ctrl.show.main.strikes < 3){
						//Because if there's 3 strikes, this MUST be the attempt to steal, so don't add the points.
						main.pointsOnBoard += curSurvey.answers[answerToShow].points * ctrl.currentPointMultiplier();
					}
					break;
				case QUEUE.ADD_STRIKE:
					main.strikes++;
					showStrikes(main.strikes);
					break;
				case QUEUE.SHOW_STRIKE:
					showStrikes(1);
					break;
				case QUEUE.AWARD_POINTS:
					let team = getQueue();
					awardPoints(team);
					break;
				case QUEUE.NEXT_ROUND:
					playSound(SOUNDS.SHORT_THEME);
					main.currentRound++;
					main.strikes = 0;
					main.pointsOnBoard = 0;
					break;
				case QUEUE.END_GAME:
					playSound(SOUNDS.OUT_THEME);
					break;
				default:
					ctrl.show.errorLog.unshift("Unknown queue command: "+command);
			}
		}

		ctrl.currentPointMultiplier = function(){
			let round = (ctrl.show && ctrl.show.main && ctrl.show.main.currentRound) || 0;
			return Math.min(1, round - 1); //for first 3 rounds, multipler is 1; 4th is 2; 5th is 3.
		};

		ctrl.getAnswer = function(index){
			if(!ctrl.show || !ctrl.show.main){
				return null;
			}

			let main = ctrl.show.main;
			let data = main.surveyData[main.currentRound];
			if(!data){
				return null;
			}

			let answer = data.answers[index];
			if(!answer){
				return null;
			}

			return answer;
		};

		ctrl.$onInit = function() {
			broadcastBinding($scope, undefined, "$ctrl.show");

			$scope.$watch(function(){
				return ctrl.show?ctrl.show.queue.length:0;
			}, function(){
				while(ctrl.show && ctrl.show.queue.length>0){
					processQueue();
				}
			});
		}
	}
});
