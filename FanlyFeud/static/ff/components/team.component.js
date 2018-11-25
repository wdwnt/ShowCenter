angular.module('fanlyfeud')
.component('team', {
	templateUrl: STATIC_BASE + 'templates/team.template.html',
	bindings: {
		conf: '<'
	}
});