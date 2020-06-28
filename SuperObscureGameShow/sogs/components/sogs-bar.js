angular.module('sogs')
.component('sogsBar', {
	templateUrl: 'templates/sogs-bar.html',
	controller: function ($scope, $timeout) {
		const ctrl = this;

		const ANIMATION_DURATION = 15000;
		const ANIMATION_INCREMENT = 50;
		//play with this over at https://cubic-bezier.com/
		const EASING = BezierEasing(0,-0.24,.39,.88);

		ctrl.currentLevel = 100;

		ctrl.play = function(amount){
			console.log("play to "+amount);
			ctrl.currentLevel = 100;
			if(amount === null){
				//TODO: show incorrect answer animation
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
			//TODO finishing flourish
			alert("tada");
		}

		$scope.$on("reset", function(){
			ctrl.currentLevel = 100;
		});

		$scope.$on("play", function(event, amount){
			ctrl.play(amount);
		});
	}
})