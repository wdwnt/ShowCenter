angular.module('parkscenter')
.component('hudMain', {
	templateUrl: 'templates/pc/hud-main.template.html',
	controller: function($scope, $rootScope, $location, $timeout, $filter, $q, vMix, addCss){
		let ctrl = this;

		ctrl.DEFAULT_AUDIO = "Line 1";
		
		let inc = function(){
			ctrl.curIndex++;
			ctrl.indexChanged();
		};
		let dec = function(){
			ctrl.curIndex--;
			ctrl.indexChanged();
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
					item.shortName = item.shortName.replace(/[^\x00-\x7F]/g, "");
					item.longName = item.longName.replace(/[^\x00-\x7F]/g, "");
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

		ctrl.indexChanged = function (){
			const shortNameList = document.getElementById('short-name-list');

			let itemAtTop = ctrl.curIndex;
			if(ctrl.curIndex >= $rootScope.showData.length) {
				itemAtTop = $rootScope.showData.length - 7;
			}
			if(ctrl.curIndex <= 1 || itemAtTop < 0) {
				itemAtTop = 1;
			}

			console.log(itemAtTop);
			const elmToScrollTo = document.getElementById('short-name-' + itemAtTop);
			console.log(elmToScrollTo);
			const top = elmToScrollTo.offsetTop;
			console.log(top);
			shortNameList.scrollTo({
				top,
				behavior: "smooth"
			});
		}

		ctrl.white = function(){
			vMix().cut("White");
		};

		ctrl.intro = function(){
			vMix().cut("White")
				.volumeFade("2021 PC Music Bed", 100, 1000)
				.wait(3000)
				.playFromBeginning("2021 PC Music Bed")
				.fade("Me", 500)
				.restart("Intro No Music")
				.wait(15*1000)
				.fade("Intro No Music", 500)
				.wait(7*1000)
				.fade("Me", 500)
				.wait(5*1000)
				.volumeFade("2021 PC Music Bed", 0, 2000)
				.wait(2500)
		};

		ctrl.end = function(){
			vMix().fade("End Tag");
		};

		ctrl.cleanTheTubes = function(){
			vMix().fade("CleaningTheTubes");
		};

		ctrl.postshow = function(){
			vMix().fade("All the panelists");
		};

		ctrl.buzz = function(){
			vMix().playFromBeginning("buzzer.mp3");
		};

		ctrl.enablePride = function(){
			addCss("styles/app.pride.css");
		};
	}
});
