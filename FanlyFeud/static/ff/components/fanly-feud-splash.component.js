angular.module('fanlyfeud')
.component('fanlyFeudSplash', {
	templateUrl: STATIC_BASE+'templates/fanly-feud-splash.template.html',
	controller: function(broadcastChannel){
		let ctrl = this;
		ctrl.channel = broadcastChannel();
		ctrl.channel.addListener("test", function(content){
			alert("Hey! I got stuff: "+content);
		});
	}
});
