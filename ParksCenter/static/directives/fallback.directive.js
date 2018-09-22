angular.module('parkscenter')
.directive('fallback', function () {
    return {
        restrict: "A",
        link: function postLink(scope, element, attrs) {
            element.bind('error', function() {
                console.log(attrs.fallback);
                angular.element(this).attr("src", attrs.fallback);
            });
        }
    };
});
