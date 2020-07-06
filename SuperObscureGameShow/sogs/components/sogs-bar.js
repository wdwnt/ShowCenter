angular.module('sogs')
.component('sogsBar', {
	templateUrl: 'templates/sogs-bar.html',
	controller: function ($scope, $timeout) {
		const ctrl = this;

		const ANIMATION_DURATION = 15000;
		const ANIMATION_INCREMENT = 50;
		//play with this over at https://cubic-bezier.com/
		const EASING = BezierEasing(0,-0.24,.39,.88);

		ctrl.ONE_TO_100 = [];
		for(let i=0; i<100; i++){
			ctrl.ONE_TO_100.push(i+1);
		}

		ctrl.currentLevel = 100;
		ctrl.backgroundClass = "";

		ctrl.play = function(amount){
			ctrl.currentLevel = 100;
			if(amount === null){
				$timeout(function(){
					ctrl.currentLevel = "X";
					ctrl.backgroundClass="incorrect";
				}, 1000);
			}else{
				let animationTimeLeft = ANIMATION_DURATION;
				const drawLoop = function(){
					animationTimeLeft -= ANIMATION_INCREMENT;
					const animationPercent = 1 - (animationTimeLeft / ANIMATION_DURATION);
					ctrl.currentLevel = 100 - Math.floor(100 * EASING(animationPercent));
					if(ctrl.currentLevel > 100){
						ctrl.currentLevel = 100; //This lets us make an initial delay by going negative for a moment
					}
					if(ctrl.currentLevel < amount || ctrl.currentLevel === 0){
						ctrl.currentLevel = amount;
						$timeout(function(){ctrl.finish();}, 0);
					}else{
						$timeout(drawLoop, ANIMATION_INCREMENT);
					}
				};
				drawLoop();
			}
		};

		ctrl.finish = function(){
			ctrl.backgroundClass="correct";
		};

		ctrl.chipColor = function(i){
			return Math.floor((i-1)/25)+1
		};

		function reset(){
			ctrl.currentLevel = 100;
			ctrl.backgroundClass = "";
		}

		$scope.$on("reset", reset);

		$scope.$on("play", function(event, amount){
			ctrl.play(amount);
		});
	}
})