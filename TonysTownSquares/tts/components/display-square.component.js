angular.module('tts')
.component('displaySquare', {
	templateUrl: 'templates/display-square.template.html',
	bindings:{
		square: '=',
		backgroundClick: '&',
		hideMark: '<'
	},
	controller: function($scope){
		let ctrl = this;

		ctrl.getMarkStyle = function(){
			if(ctrl.square.mark){
				return {
					'background-image':'url(images/'+ctrl.square.mark+'.png'
				};
			}else{
				return {};
			}
		};

		ctrl.updateMark = function(mark){
			if(mark==='o' || mark==='x'){
				ctrl.square.mark = mark;
			}else{
				ctrl.square.mark = null;
			}
		};
	}
});
