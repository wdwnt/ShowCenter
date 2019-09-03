angular.module('mapgame')
.component('map', {
	templateUrl: 'map/map.template.html',
	controller: function ($scope, $routeParams, times) {
		/* $routeParams: {
		  rows: number,
		  cols: number,
		  img: string
		}*/

		this.$onInit = function(){
			angular.extend($scope, $routeParams);
			$scope.img = unescape(unescape($scope.img));
			$scope.cells = times($scope.cols, function(){
				return times($scope.rows, function(){return {visible: true};})
			});

			$("#img").on('load', function(){
				let img = $("#img");
				let width = img.width();
				let height = img.height();
				$scope.cellStyle = function(visible){
					return {
						width: width/$scope.cols,
						height: height/$scope.rows,
						opacity: (visible?1:0)
					}
				};
				$scope.cellHeight = function(){
					return height/$scope.rows+"px";
				};
				$scope.makeRows = function(){
					return times($scope.rows, function(i){
						return i+1;
					});
				};
				$scope.$apply();
			});
		};

		$scope.letterFor = function (index) {
			return String.fromCharCode('A'.charCodeAt(0) + index);
		}
	}
});