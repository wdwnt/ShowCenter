angular.module('tts')
.component('gameBoard', {
	templateUrl: 'templates/game-board.template.html',
	controller: function($scope, times, vMix){
		let ctrl = this;

		ctrl.NUM_PAD_ORDER = ['7','8','9','4','5','6','1','2','3']; //strings, so it'll .indexOf correctly with <input ng-model>

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
			if(index>=0 && index<9){
				ctrl.selectedSquare = ctrl.board[index];
				let square = "sq_"+index;
				if(index===4){
					square = "Virtual - sq_4";
				}
				vMix().setMultiViewInput("solo", 1, )
					.cut("solo");
			}
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

		ctrl.keypress = function(key){
			let soloCut = ctrl.NUM_PAD_ORDER.indexOf(key);
			if(soloCut !== -1){
				ctrl.solo(soloCut);
			}else if(key === '0' || key === 'g'){
				ctrl.grid();
			}else if(key === '.' || key === 'h'){
				ctrl.host();
			}
		};

		ctrl.$onInit = function(){
			ctrl.initBoard();
			ctrl.selectedSquare = null;
		};
	}
});
