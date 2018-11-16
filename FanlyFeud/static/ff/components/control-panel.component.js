angular.module('fanlyfeud')
.component('controlPanel', {
	templateUrl: STATIC_BASE+'templates/control-panel.template.html',
	controller: function($scope, broadcastBinding){
		let ctrl = this;
		ctrl.state = 'preshow';
		$scope.content = {text: 'hey'};
		broadcastBinding($scope, undefined, "content");
	}
});
