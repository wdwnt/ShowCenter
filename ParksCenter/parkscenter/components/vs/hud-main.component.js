angular.module('parkscenter')
.component('vsHudMain', {
	templateUrl: 'templates/vs/hud-main.template.html',
	controller: function($scope, $rootScope, $location, $timeout, $filter){
		var ctrl = this;

		ctrl.getAudioOutputs = function(){
			ctrl.audioOuts = [];
			navigator.mediaDevices.getUserMedia({audio: true}).then(function(){
				navigator.mediaDevices.enumerateDevices().then(function(d){
					ctrl.audioOuts = $filter('filter')(d, {kind: 'audiooutput'});
					ctrl.audioOuts = $filter('orderBy')(ctrl.audioOuts, "label");
				});
			});
		};
		ctrl.setAllAudioOuts = function(deviceId){
			angular.forEach(document.getElementsByTagName("audio"), function(audio){
				audio.setSinkId(deviceId);
			});
		};
		
		ctrl.$onInit = function(){
			if(!$rootScope.vsShowData){
				$location.url("/vs/edit");
			}else{
				ctrl.clock = -1;
				ctrl.state={
					footer: "Welcome to ParksCenter Vs.!",
					bracketVisible: false,
					sidebarRound: 0,
					curGame: null,
					curGameVotes: null
				};
				ctrl.voters = ['a','b','c','d','e'];
				ctrl.getAudioOutputs();
			}
		};
		
		ctrl.tick = function(){
			if(ctrl.clock>0){
				ctrl.clock--;
				ctrl.timeoutCallback = $timeout(function(){ctrl.tick();}, 1000);
				ctrl.clockDate = new Date(1970, 0, 1).setSeconds(ctrl.clock);
				if(ctrl.clock===0){
					document.getElementById("buzzer").play();
				}
			}else if(ctrl.clock<0){
				ctrl.clockDate = null;
			}
			$timeout(function(){$scope.$apply();}, 0);
		};
		
		ctrl.restartTimeout = function() {
			if (ctrl.timeoutCallback){
				$timeout.cancel(ctrl.timeoutCallback);
			}
			ctrl.clock = 210;
			ctrl.tick();
		};

		ctrl.sidebarRound = function(diff){
			ctrl.state.sidebarRound += diff;
			if(ctrl.state.sidebarRound < 0){
				ctrl.state.sidebarRound = 0;
			}
			if(ctrl.state.sidebarRound > 2){
				ctrl.state.sidebarRound = 2;
			}
		};

		ctrl.setGame = function(game){
			ctrl.state.curGame = game;
			ctrl.state.curGameVotes = [0,0,0,0,0];
			ctrl.state.footer = 'fight';
			ctrl.restartTimeout();
		};

		ctrl.updateScores = function(){
			var game = ctrl.state.curGame;
			var votes = ctrl.state.curGameVotes;
			game.top.score = 0;
			game.bottom.score = 0;
			angular.forEach(votes, function(e){
				if(e===-1){
					game.top.score++;
				}else if(e===1){
					game.bottom.score++;
				}
			});
		};

		ctrl.finalizeCurGame = function(){
			var game = ctrl.state.curGame;
			ctrl.updateScores();
			game.isFinal = true;
			var winnerName = game.top.name;
			if(game.top.score < game.bottom.score){
				winnerName = game.bottom.name;
			}

			var nextRound = ctrl.state.sidebarRound+1;
			if(nextRound < $rootScope.vsShowData.length) {
				var curGameNumber = $rootScope.vsShowData[ctrl.state.sidebarRound].indexOf(game);
				var nextGame = Math.floor(curGameNumber / 2);
				var topOrBottom = (curGameNumber % 2 === 0 ? 'top' : 'bottom');
				if (!$rootScope.vsShowData[nextRound][nextGame]) {
					$rootScope.vsShowData[nextRound][nextGame] = {
						isFinal: false
					};
				}
				$rootScope.vsShowData[nextRound][nextGame][topOrBottom] = {
					name: winnerName,
					score: 0
				};
			}else{
				ctrl.state.footer = winnerName+" wins!";
			}
		};

		ctrl.dumpGame = function(){
			console.log($rootScope.vsShowData);
		};
	}
});
