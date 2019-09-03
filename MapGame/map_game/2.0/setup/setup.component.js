angular.module('mapgame')
.component('setup', {
	templateUrl: 'setup/setup.template.html',
	controller: function ($scope, $location) {
		$scope.gotoMap = function(){
			$location.path("/map/"+$scope.rows+"/"+$scope.cols+"/"+encodeURIComponent(encodeURIComponent($scope.img)));
		}
	}
});