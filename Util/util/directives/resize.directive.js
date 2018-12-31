angular.module('util')
.directive("resize", function() {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            scope.$watch(function(){
                return element[0].offsetHeight;
            }, function(){
                let fontSize = Math.floor(element[0].offsetHeight*0.8);
                element.css('font-size', fontSize+"px");
            });
        }
    };
});