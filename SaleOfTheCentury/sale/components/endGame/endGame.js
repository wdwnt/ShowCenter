angular.module('sale')
.component('endGame', {
	templateUrl: 'components/endGame/endGame.html',
	bindings:{
		show: '<'
	},
	controller: function(){
		let ctrl = this;

		ctrl.NBSP = '\xa0';

		ctrl.pad = function(num, space){
			let retval = num+'';
			while(retval.length < space){
				retval = ctrl.NBSP + retval;
			}
			return retval;
		};

		ctrl.curQuestion = function(){
			return ctrl.show.bonusRound.questions[ctrl.show.bonusRound.curQuestion];
		}
	}
});