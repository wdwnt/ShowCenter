angular.module('parkscenter')
.component('hudEditor', {
	templateUrl: 'templates/pc/hud-editor.template.html',
	controller: function($scope, $rootScope, $location){
		var ctrl = this;
		
		ctrl.$onInit = function(){
            if(!$rootScope.showData){
            	if(sessionStorage.getItem("lastPCGame")){
					$rootScope.showData = JSON.parse(sessionStorage.getItem("lastPCGame"));
				}else{
					var item = {
						shortName: "Game ",
						longName: "",
						thumbnail: "images/whosequeue.png",
						duration: 0
					};
					$rootScope.showData = [angular.copy(item), angular.copy(item), angular.copy(item),
						angular.copy(item), angular.copy(item), angular.copy(item), angular.copy(item)];
				}
            }
			
			ctrl.curIndex=0;
            ctrl.gameIndex = 1;
			
			ctrl.imageList = ['images/whosequeue.png'];
			angular.forEach($rootScope.showData, function(item){
				ctrl.imageList.push(item.thumbnail);
				item.shortName = "Game " + ctrl.gameIndex;
				ctrl.gameIndex += 1;
			});

			$scope.$watch(function(){
				return angular.toJson($rootScope.showData);
			}, function(newVal){
				if(newVal){
					sessionStorage.setItem("lastPCGame", newVal);
				}
			})
		};
		
		ctrl.getItemState = function(index){
			if(index<ctrl.curIndex){
				return "past";
			}else if(index>ctrl.curIndex){
				return "future";
			}else{
				return "present";
			}
		};

		ctrl.loadJSON = function(){
			$rootScope.showData = JSON.parse(ctrl.jsonInput);
		};

		ctrl.gotoShow = function(){
			$location.url("/pc/hud");
		};

		ctrl.getShowDuration = function(){
			var total = 0;
			angular.forEach($rootScope.showData, function(e){
				total += e.duration;
			});
			return Math.floor(total/60)+":"+(total%60<10?'0':'')+(total%60);
		}
	}
});
