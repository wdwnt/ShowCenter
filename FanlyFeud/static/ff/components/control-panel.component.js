angular.module('fanlyfeud')
.component('controlPanel', {
	templateUrl: STATIC_BASE+'templates/control-panel.template.html',
	controller: function(broadcastChannel){
		let ctrl = this;
		ctrl.channel = broadcastChannel();
		ctrl.channel.send("test", "Test content");
	}
});
