angular.module('parkscenter')
.directive('round', function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'templates/vs/round.template.html',
		scope: {
			model: '=',
			editable: '<'
		},
		controller: function ($scope) {
			$scope.getState = function (model, who) {
				if (model && model.isFinal) {
					var winner = 'bottom';
					if (model.top.score > model.bottom.score) {
						winner = 'top';
					}
					if (winner === who) {
						return "winner";
					} else {
						return "loser";
					}
				} else {
					return "";
				}
			};
		}
	}
})
/*
	Bracket model:
	[
		//each entry is a round
		[
			//each entry is a game
			{
				bottom: {
					name: '',
					score: 0
				},
				top: {
					name: '',
					score: 0
				},
				isFinal: false
			}
		]
	]
	 */
.directive('bracket', function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'templates/vs/bracket.template.html',
		scope: {
			model: '=',
			editable: '<'
		},
		controller: function ($scope) {
			var ctrl = this;

			ctrl.$onInit = function(){
				var model = $scope.model;
				var leftRounds = [];
				var rightRounds = [];
				for(var i=0; i<model.length-1; i++){
					var rightHalf = model[i].slice();
					var leftHalf = rightHalf.splice(0, rightHalf.length/2);
					leftRounds.push({
						round: i+1,
						side: 'left',
						games: leftHalf
					});
					rightRounds.push({
						round: i+1,
						side: 'right',
						games: rightHalf
					});
				}
				leftRounds.push({
					round: model.length,
					side: 'finals',
					games: model[model.length-1]
				});
				rightRounds.reverse();
				$scope.rounds = leftRounds.concat(rightRounds);
			}
		}
	}
})
.component('vsHudEditor', {
	templateUrl: 'templates/vs/hud-editor.template.html',
	controller: function($scope, $rootScope, $location){
		var ctrl = this;

		var blankGame = {
			top:{
				name:'',
				score:0
			},
			bottom:{
				name:'',
				score:0
			},
			isFinal:false
		};
		var initialData=[
			[angular.copy(blankGame), angular.copy(blankGame), angular.copy(blankGame), angular.copy(blankGame)],
			[{}, {}],
			[{}]
		];
		
		ctrl.$onInit = function(){
            if(!$rootScope.vsShowData){
            	if(sessionStorage.getItem("lastVsGame")){
					$rootScope.vsShowData = JSON.parse(sessionStorage.getItem("lastVsGame"));
				}else{
					$rootScope.vsShowData = initialData;
				}
            }

			$scope.$watch(function(){
				return angular.toJson($rootScope.vsShowData);
			}, function(newVal){
				if(newVal){
					sessionStorage.setItem("lastVsGame", newVal);
				}
			});
		};

		ctrl.loadJSON = function(){
			$rootScope.vsShowData = JSON.parse(ctrl.jsonInput);
		};

		ctrl.gotoShow = function(){
			$location.url("/vs/hud");
		};
	}
});
