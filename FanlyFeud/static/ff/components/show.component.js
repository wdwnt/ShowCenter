angular.module('fanlyfeud')
.component('show', {
	templateUrl: STATIC_BASE+'templates/show.template.html',
	controller: function($scope, broadcastBinding, $timeout, SHOW_STATES, QUEUE){
		let ctrl = this;

		const MAX_VOLUME = 0.15;

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
			OPENING_THEME: STATIC_BASE+'audio/feudIntro.mp3',
			DING: STATIC_BASE+'audio/ff-clang.wav',
			STRIKE: STATIC_BASE+'audio/ff-strike.wav',
			ROUND_WIN: STATIC_BASE+'audio/ff-dings.wav',
			SHORT_THEME: STATIC_BASE+'audio/feudShortIntro.mp3',
			BUZZER_SOUND: STATIC_BASE+'audio/ff-ringin.wav',
			OUT_THEME: STATIC_BASE+'audio/openingThemeRaw.mp3'
		};

		ctrl.SOUNDS = SOUNDS;
		ctrl.SOUND_URLS = SOUND_URLS;

		function getQueue(){
			return ctrl.show.queue.splice(0,1)[0];
		}

		function playSound(id){
			let sound = document.getElementById(id);
			sound.volume = MAX_VOLUME;
			sound.play();
		}

		function stopSound(id){
			let sound = document.getElementById(id);
			sound.pause();
			sound.currentTime = 0;
		}

		function fadeOutSound(id){
			const STEP = 0.05;
			const DELAY = 100;

			//this lets us specify STEP above as a percentage of MAX_VOLUME,
			//without having to think about what it's currently set to
			let actualStep = MAX_VOLUME * STEP;

			let sound = document.getElementById(id);
			let curVolume = MAX_VOLUME;
			let quietDown = function () {
				curVolume -= actualStep;
				if(curVolume<=0){
					curVolume=0;
				}else{
					$timeout(quietDown, DELAY);
				}
				sound.volume = curVolume;
			};
			quietDown();
		}

		function showStrikes(count){
			playSound(SOUNDS.STRIKE);
			ctrl.showStrikes = count;
			$timeout(function(){
				ctrl.showStrikes = 0;
			}, 1000);
		}

		function awardPoints(team){
			const DELAY = 250;

			let main = ctrl.show.main;
			let teams = ctrl.show.teams;

			//calculate the new points and save it locally
			let points = teams[team].points + main.pointsOnBoard;

			// wipe the points for the round
			main.pointsOnBoard = null;
			$timeout(function(){
				// wipe the points for the team getting the points
				teams[team].points = null;
				$timeout(function(){
					// display the points again
					teams[team].points = points;
				}, DELAY);
			}, DELAY);

			// set the strike count to 3 - this covertly stops points from being added when showing answers
			main.strikes = 3;
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
					playSound(SOUNDS.SHORT_THEME);
					ctrl.show.state = SHOW_STATES.MAIN_ROUND;
					main.currentRound = 0;
					main.strikes = 0;
					main.pointsOnBoard = 0;
					break;
				case QUEUE.BUZZ_IN:
					const BUZZ_DURATION = 1000;
					playSound(SOUNDS.BUZZER_SOUND);
					let buzzedTeam = getQueue();
					ctrl.show.teams[buzzedTeam].buzzedIn = true;
					$timeout(function(){
						ctrl.show.teams[buzzedTeam].buzzedIn = false;
					}, BUZZ_DURATION);
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
					playSound(SOUNDS.ROUND_WIN);
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
					ctrl.show.state = SHOW_STATES.END_SCREEN;
					ctrl.show.main.pointsOnBoard = null;
					if(ctrl.show.teams.left.points > ctrl.show.teams.right.points){
						ctrl.show.teams.left.winners = true;
					}else if(ctrl.show.teams.left.points < ctrl.show.teams.right.points){
						ctrl.show.teams.right.winners = true;
					}//else tie, don't tag winner
					break;
				case QUEUE.FADE_END_THEME:
					fadeOutSound(SOUNDS.OUT_THEME);
					break;
				default:
					ctrl.show.errorLog.unshift("Unknown queue command: "+command);
			}
		}

		ctrl.currentPointMultiplier = function(){
			let round = (ctrl.show && ctrl.show.main && ctrl.show.main.currentRound) || 0;
			return Math.max(1, round - 1); //for first 3 rounds, multipler is 1; 4th is 2; 5th is 3.
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
