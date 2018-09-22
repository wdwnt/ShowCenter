angular.module('parkscenter')
.directive("arrowControl", function(){
    return {
        restrict: "A",
        link: function($scope, $element, $attrs){
            var callback = function(event){
                var keyCode = event.which || event.keyCode;
                if(keyCode === 37){
                    $scope.$eval($attrs.arrowControl, {$dir: 'left'});
                    $scope.$apply();
                }else if(keyCode === 38){
                    $scope.$eval($attrs.arrowControl, {$dir: 'up'});
                    $scope.$apply();
                }else if(keyCode === 39){
                    $scope.$eval($attrs.arrowControl, {$dir: 'right'});
                    $scope.$apply();
                }else if(keyCode === 40){
                    $scope.$eval($attrs.arrowControl, {$dir: 'down'});
                    $scope.$apply();
                }
            };
            document.addEventListener("keydown", callback, false);
            $scope.$on('$destroy', function(){
                document.removeEventListener("keydown", callback, false);
            });
        }
    }
});