angular.module('parkscenter')
.component('hudMain', {
	templateUrl: 'templates/pc/hud-main.template.html',
	controller: function($scope, $rootScope, $location, $timeout, $filter, $q, vMix){
		let ctrl = this;

		ctrl.DEFAULT_AUDIO = "Line 1";
		
		let inc = function(){
			ctrl.curIndex++;
		};
		let dec = function(){
			ctrl.curIndex--;
		};
		ctrl.arrowControl={
				left: dec,
				right: inc,
				up: dec,
				down: inc
		};
		
		ctrl.$onInit = function(){
			if(sessionStorage.getItem("loadPCGame")){
				$rootScope.showData = JSON.parse(sessionStorage.getItem("loadPCGame"));
				sessionStorage.removeItem("loadPCGame");
			}
			if(!$rootScope.showData){
				$location.url("/pc/edit");
			}else{
				ctrl.curIndex=-1;
				ctrl.clock=-1;
				
				ctrl.imageList = ['images/wdwntLogo.png'];
				angular.forEach($rootScope.showData, function(item){
					ctrl.imageList.push(item.thumbnail);
				});

				$scope.$watch(function(){
					return ctrl.curIndex;
				}, function(){
					if(ctrl.curIndex>$rootScope.showData.length){
						ctrl.curIndex = $rootScope.showData.length;
					}else if(ctrl.curIndex<-1){
	    				ctrl.curIndex=-1;
	    			}else{
	    				ctrl.restartTimeout();
	    			}
				});
			}
		};
		
		ctrl.tick = function(){
			if(ctrl.clock>0){
				ctrl.clock--;
				ctrl.timeoutCallback = $timeout(function(){ctrl.tick();}, 1000);
				ctrl.clockDate = new Date(1970, 0, 1).setSeconds(ctrl.clock);
				if(ctrl.clock===0){
					ctrl.buzz();
				}
			}else if(ctrl.clock<0){
				ctrl.clockDate = null;
			}
			$timeout(function(){$scope.$apply();}, 0);
		};
		
		ctrl.restartTimeout = function(){
			$timeout.cancel(ctrl.timeoutCallback);
			ctrl.clock = ctrl.getCurItem().duration;
			ctrl.tick();
		};
		
		ctrl.getCurItem = function(){
			if(ctrl.curIndex>=0 && ctrl.curIndex<$rootScope.showData.length){
				return $rootScope.showData[ctrl.curIndex];
			}else{
				if(ctrl.curIndex===-1){
    				return {
                	    "shortName": "",
                	    "longName": "Welcome to ParksCenter!",
                	    "thumbnail": "images/wdwntLogo.png",
                	    "duration": -1
                	};
				}else{
					return {
                	    "shortName": "",
                	    "longName": "Thanks for watching ParksCenter!",
                	    "thumbnail": "images/wdwntLogo.png",
                	    "duration": -1
                	};
				}
			}
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

		ctrl.white = function(){
			vMix().cut("White");
		};

		ctrl.intro = function(){
			vMix().cut("White")
				.wait(1000)
				.overlay("WDWNT Intro Video")
				.wait(3000)
				.unmute("Audio Microphone")
				.cut("Virtual - Me")
				.wait(8000)
				.overlay("WDWNT Intro Video")
				.playFromBeginning("parksCenterIntro.mp3")
				.wait(7500)
				.fade("ParksCenter Logo", 1000)
				.wait(5500)
				.fade("Virtual - All the panelists", 1000);
		};

		ctrl.outtro = function(){
			vMix().mute("Audio Microphone")
				.playFromBeginning("parksCenterOuttro.mp3")
				.fade("ParksCenter Logo", 1000)
				.wait(15000)
				.playlist("ParksCenter Commercials");
		};

		ctrl.shortIntro = function(){
			vMix().unmute("Audio Microphone")
				.fade("Virtual - Me", 1000)
				.playFromBeginning("parksCenterIntro.mp3")
				.wait(7500)
				.fade("ParksCenter Logo", 1000)
				.wait(5500)
				.fade("Virtual - All the panelists", 1000);
		};

		ctrl.travel = function(){
			vMix().overlay("TravelPlugWithHUD")
				.wait(20000)
				.overlay("TravelPlugWithHUD")
				.fade("Virtual - Me");
		};

		ctrl.end = function(){
			vMix().overlay("End tag");
		};

		ctrl.postshow = function(){
			vMix().overlay("End tag")
				.fade("All the panelists")
				.wait(2000)
				.overlay("All the panelists and Chat", 4);
		};

		ctrl.buzz = function(){
			vMix().playFromBeginning("buzzer.mp3");
		};
	}
});
