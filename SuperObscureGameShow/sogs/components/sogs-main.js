angular.module('sogs')
.component('sogsMain', {
	templateUrl: 'templates/sogs-main.html',
	controller: function ($scope, $rootScope, $location, $timeout, $filter, $q, vMix) {
		const ctrl = this;

		ctrl.go = function(amount){
			$scope.$broadcast("play", amount);
		}

		ctrl.reset = function(){
			$scope.$broadcast("reset");
		}
	}
})