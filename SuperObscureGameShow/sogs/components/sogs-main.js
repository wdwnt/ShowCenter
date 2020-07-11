angular.module('sogs')
.component('sogsMain', {
	templateUrl: 'templates/sogs-main.html',
	controller: function ($scope, $location, vMix, $timeout, $filter, $q) {
		const ctrl = this;

		const VMIX_POINTS_BAR_NAME = "Points bar";

		ctrl.data = [];
		ctrl.curItem = -1;

		ctrl.reveal = function(item){
			if(!item.startedRevealing && !item.revealed){
				item.startedRevealing = true;
				ctrl.go(item.value, item);
			}
		}

		ctrl.go = function(amount, item){
			vMix().overlay(VMIX_POINTS_BAR_NAME, 1)
				.wait(500)
				.then(function(){$scope.$broadcast("play", amount, item)});
		}

		ctrl.reset = function(){
			$scope.$broadcast("reset");
		}

		ctrl.load = function(gameJson){
			ctrl.data = JSON.parse(gameJson);
			$location.search("json", JSON.stringify(ctrl.data));
		}

		$scope.$on("finished", function(event, item){
			vMix().overlay(VMIX_POINTS_BAR_NAME, 1)
				.wait(2000)
				.then(function(){ctrl.reset()});
			if(item){
				item.revealed =  true;
			}
		});

		ctrl.$onInit = function(){
			if($location.search()["json"]){
				ctrl.load($location.search()["json"]);
			}
		};
	}
})