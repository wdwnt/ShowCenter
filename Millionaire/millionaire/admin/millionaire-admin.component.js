angular.module('millionaire')
	.component('millionaireAdmin', {
		bindings: {
			game: '=',
		},
		templateUrl: 'admin/millionaire-admin.component.html',
		controller: function ($scope, $location, vMix, $timeout, $filter, $q) {
			const ctrl = this;
		}
	});