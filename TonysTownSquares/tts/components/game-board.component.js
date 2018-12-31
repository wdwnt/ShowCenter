angular.module('tts')
.component('gameBoard', {
	templateUrl: 'templates/game-board.template.html',
	controller: function($scope, times, vMix){
		let ctrl = this;

		ctrl.initBoard = function(){
			ctrl.board = times(9, function(){return {
				name: '',
				mark: null
			};});
		};

		ctrl.clearBoard = function(){
			angular.forEach(ctrl.board, function(square){
				square.mark = null;
			});
		};

		ctrl.solo = function(index){
			ctrl.selectedSquare = ctrl.board[index];
			vMix().setMultiViewInput("solo", 1, "sq_"+index)
				.cut("solo");
		};

		ctrl.grid = function(){
			ctrl.selectedSquare = null;
			vMix().cut("grid")
				.setMultiViewInput("solo", 1, "blank");
		};

		ctrl.white = function(){
			vMix().cut("white")
				.setMultiViewInput("solo", 1, "blank");
		};

		ctrl.host = function(){
			vMix().cut("host")
				.setMultiViewInput("solo", 1, "blank");
		};

		ctrl.$onInit = function(){
			ctrl.initBoard();
			ctrl.selectedSquare = null;
		};
	}
});
