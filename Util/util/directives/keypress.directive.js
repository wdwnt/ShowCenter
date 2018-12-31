angular.module('util')
.constant("KEYPRESS_MAP", {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    NUMPAD_0: 96,
    NUMPAD_1: 97,
    NUMPAD_2: 98,
    NUMPAD_3: 99,
    NUMPAD_4: 100,
    NUMPAD_5: 101,
    NUMPAD_6: 102,
    NUMPAD_7: 103,
    NUMPAD_8: 104,
    NUMPAD_9: 105,
})
.directive("keypress", function(KEYPRESS_MAP){
    const CODES = Object.values(KEYPRESS_MAP);

    return {
        restrict: "A",
        link: function($scope, $element, $attrs){
            let callback = function(event){
                let keyCode = event.which || event.keyCode;
                let key = keyCode;
                if(CODES.indexOf(keyCode) === -1){
                    key = String.fromCharCode(key);
                }
                $scope.$eval($attrs.keypress, {$key: key, $keyCode: keyCode});
                $scope.$apply();
            };
            let bind = document;
            if($attrs.bindHere){
                bind = $element[0];
			}
            bind.addEventListener("keydown", callback, false);
            $scope.$on('$destroy', function(){
                bind.removeEventListener("keydown", callback, false);
            });
        }
    }
});