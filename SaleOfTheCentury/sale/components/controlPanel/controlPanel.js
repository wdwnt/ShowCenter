angular.module('sale')
.component('controlPanel', {
	templateUrl: 'components/controlPanel/controlPanel.html',
	controller: function($scope, $timeout, DEFAULT_SETTINGS, DEFAULT_SHOW, broadcastBinding){
		let ctrl = this;

		ctrl.buzzIn = function(player){
			if(player >= 0 && player < ctrl.show.players.length) {
				ctrl.show.activePlayer = player;
				ctrl.show.players[player].selected = true;
			}
		};

		ctrl.resetBuzzers = function(){
			ctrl.show.activePlayer = null;
			angular.forEach(ctrl.show.players, function(player){
				player.selected = false;
			});
			$timeout(function(){
				document.getElementById("buzzerInMain").focus();
			}, 0);
		};

		ctrl.activePlayer = function(){
			return ctrl.show && ctrl.show.players[ctrl.show.activePlayer];
		};

		ctrl.revealBoard = function(board){
			board.isRevealed = true;
			if(board.isMoney){
				board.revealedValue = "$"+board.moneyValue;
				ctrl.activePlayer().score += board.moneyValue;
			}else{
				board.revealedValue = ctrl.currentPrize();
			}
		};

		ctrl.currentPrize = function(){
			return ctrl.SETTINGS && ctrl.SETTINGS.prizeList[ctrl.show.nextNumbersRound-1];
		};

		ctrl.showMoney = function(){
			angular.forEach(ctrl.show.numbersBoard, function(board){
				if(board.isMoney){
					board.isRevealed = true;
					board.revealedValue = '$'+board.moneyValue;
				}
			})
		};

		ctrl.timerRunning = false;
		let tick = function(){
			let curQuestion = ctrl.show.bonusRound.questions[ctrl.show.bonusRound.curQuestion];
			if(!ctrl.timerRunning || !ctrl.show.bonusRound.timer || !curQuestion){
				ctrl.timerRunning = false;
				return;
			}

			ctrl.show.bonusRound.timer--;

			$timeout(tick, 1200);
		};
		let clue = function(){
			let curQuestion = ctrl.show.bonusRound.questions[ctrl.show.bonusRound.curQuestion];
			if(!ctrl.timerRunning || !ctrl.show.bonusRound.timer || !curQuestion){
				ctrl.timerRunning = false;
				return;
			}

			let foundOne = false;
			angular.forEach(curQuestion.clues, function(clue){
				if(!clue.revealed && !foundOne){
					clue.revealed = true;
					foundOne = true;
				}
			});

			$timeout(clue, 1500);
		};
		ctrl.startTimer = function(){
			ctrl.timerRunning = true;
			clue();
			$timeout(tick, 500);
			document.getElementById("buzzerIn").focus();
		};
		ctrl.stopTimer = function(){
			ctrl.timerRunning = false;
		};

		ctrl.nextQuestion = function(){
			ctrl.show.bonusRound.questions[ctrl.show.bonusRound.curQuestion].solved = true;
			ctrl.show.bonusRound.curQuestion++;
		};

		ctrl.gotoBlank = function(){
			ctrl.show.state='blank';
			ctrl.show.activePlayer=null;
		};

		ctrl.gotoLogo = function(){
			ctrl.show.state='logo';
			ctrl.show.activePlayer=null;
		};

		ctrl.gotoDefault = function(){
			ctrl.show.state='default';
			ctrl.show.activePlayer=null;
			$timeout(function(){
				document.getElementById("buzzerInMain").focus();
			}, 0);
		};

		ctrl.gotoPrizeWall = function(activePlayer){
			let moneyToAdd = ctrl.SETTINGS.numberSelectBonuses[ctrl.show.nextNumbersRound];
			angular.forEach(moneyToAdd, function(money){
				let square = {isMoney: true}; //priming value to let us in the loop below
				while(square.isMoney || square.isRevealed){ //find an unrevealed, non-money square
					square = ctrl.show.numbersBoard[Math.floor(Math.random()*ctrl.show.numbersBoard.length)];
				}
				square.isMoney = true;
				square.moneyValue = money;
			});

			ctrl.show.nextNumbersRound++;
			ctrl.show.state = 'numberSelect';
			ctrl.show.activePlayer = activePlayer;
		};

		ctrl.gotoEndGame = function(activePlayer){
			ctrl.show.state = 'endGame';
			ctrl.show.activePlayer = activePlayer;
		};

		ctrl.reset = function(){
			ctrl.show = angular.copy(DEFAULT_SHOW);
			ctrl.SETTINGS = angular.copy(DEFAULT_SETTINGS);
		};

		ctrl.$onInit = function(){
			broadcastBinding($scope, undefined, "$ctrl.show");
			$timeout(function(){
				if(ctrl.show === undefined){
					ctrl.show = angular.copy(DEFAULT_SHOW);
				}
			}, 5000);
			broadcastBinding($scope, undefined, "$ctrl.SETTINGS");
			$timeout(function(){
				if(ctrl.SETTINGS === undefined){
					ctrl.SETTINGS = angular.copy(DEFAULT_SETTINGS);
				}
			}, 5000);
		};
	}
});