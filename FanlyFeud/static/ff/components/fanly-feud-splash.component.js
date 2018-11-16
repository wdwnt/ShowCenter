angular.module('fanlyfeud')
.component('fanlyFeudSplash', {
	templateUrl: STATIC_BASE+'templates/fanly-feud-splash.template.html',
	controller: function($scope, broadcastBinding){
		let ctrl = this;
		broadcastBinding($scope, undefined, "content");
	}
});
