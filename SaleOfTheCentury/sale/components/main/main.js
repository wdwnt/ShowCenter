angular.module('sale')
.component('main', {
	templateUrl: 'components/main/main.html',
	controller: function($scope, $timeout, DEFAULT_SETTINGS, DEFAULT_SHOW, broadcastBinding){
		let ctrl = this;

		const NBSP = '\xa0';

		ctrl.pad = function(num, space){
			let retval = num+'';
			while(retval.length < space){
				retval = NBSP + retval;
			}
			return retval;
		};

		ctrl.$onInit = function(){
			broadcastBinding($scope, undefined, "$ctrl.show");
			$timeout(function(){
				if(ctrl.show === undefined){
					ctrl.show = angular.copy(DEFAULT_SHOW);
				}
			}, 5000);

			broadcastBinding($scope, undefined, "$ctrl.SETTINGS");
			$timeout(function(){
				if(ctrl.SETTINGS === undefined){
					ctrl.SETTINGS = angular.copy(DEFAULT_SETTINGS);
				}
			}, 5000);
		};
	}
});