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
						shortName: "",
						longName: "",
						thumbnail: "images/wdwntLogo.png",
						duration: 210
					};
					$rootScope.showData = [angular.copy(item), angular.copy(item), angular.copy(item),
						angular.copy(item), angular.copy(item), angular.copy(item), angular.copy(item)];
				}
            }
			
			ctrl.curIndex=0;
			
			ctrl.imageList = ['images/wdwntLogo.png'];
			angular.forEach($rootScope.showData, function(item){
				ctrl.imageList.push(item.thumbnail);
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
