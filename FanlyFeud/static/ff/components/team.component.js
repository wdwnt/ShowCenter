angular.module('fanlyfeud')
.component('team', {
	templateUrl: STATIC_BASE + 'templates/team.template.html',
	bindings: {
		conf: '<'
	},
	controller: function(){
		let ctrl = this;

		ctrl.getPoints = function(){
			if(!ctrl.conf){
				return '';
			}

			let points = ctrl.conf.points;
			if(points<10){
				return ' '+points+' ';
			}else if(points<100){
				return ' '+points;
			}else{
				return points;
			}
		};
	}
});