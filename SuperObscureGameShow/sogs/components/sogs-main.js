angular.module('sogs')
.component('sogsMain', {
	templateUrl: 'templates/sogs-main.html',
	controller: function ($scope, $rootScope, $location, $timeout, $filter, $q, vMix) {
		const ctrl = this;

		ctrl.data = [];
		ctrl.curItem = -1;

		ctrl.reveal = function(item){
			if(!item.revealed){
				ctrl.go(item.value, item);
			}
		}

		ctrl.go = function(amount, item){
			console.log("go to "+amount);
			$scope.$broadcast("play", amount, item);
		}

		ctrl.reset = function(){
			$scope.$broadcast("reset");
		}

		ctrl.load = function(gameJson){
			ctrl.data = JSON.parse(gameJson);
		}

		$scope.$on("finished", function(event, item){
			if(item){
				item.revealed =  true;
			}
		});
	}
})