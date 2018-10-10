angular.module('parkscenter')
.component('hudMain', {
	templateUrl: STATIC_BASE+'templates/pc/hud-main.template.html',
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

		ctrl.getAudioOutputs = function(){
			let deferred = $q.defer();

			ctrl.audioOuts = [];
			navigator.mediaDevices.getUserMedia({audio: true}).then(function(){
				navigator.mediaDevices.enumerateDevices().then(function(d){
					ctrl.audioOuts = $filter('filter')(d, {kind: 'audiooutput'});
					ctrl.audioOuts = $filter('orderBy')(ctrl.audioOuts, "label");
					deferred.resolve();
				});
			});
			return deferred.promise;
		};
		ctrl.setAllAudioOuts = function(deviceId){
			angular.forEach(document.getElementsByTagName("audio"), function(audio){
				audio.setSinkId(deviceId);
			});
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
				
				ctrl.imageList = [STATIC_BASE+'images/wdwntLogo.png'];
				angular.forEach($rootScope.showData, function(item){
					ctrl.imageList.push(item.thumbnail);
				});

				ctrl.getAudioOutputs().then(function(){
					let audioOut = ctrl.audioOuts.find(function(e){
						return e.label.indexOf(ctrl.DEFAULT_AUDIO)!==-1;
					});
					if(audioOut){
						$scope.audioOut = audioOut.deviceId;
						ctrl.setAllAudioOuts(audioOut.deviceId);
					}
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
					document.getElementById("buzzer").play();
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
                	    "thumbnail": STATIC_BASE+"images/wdwntLogo.png",
                	    "duration": -1
                	};
				}else{
					return {
                	    "shortName": "",
                	    "longName": "Thanks for watching ParksCenter!",
                	    "thumbnail": STATIC_BASE+"images/wdwntLogo.png",
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
			vMix().call("?Function=Cut&Input=3");
		};

		ctrl.intro = function(){
			vMix().cut(3)
				.wait(1000)
				.cut(4)
				.wait(11000)
				.fade(6)
				.then(function(){
					document.getElementById("introAudio").play();
				})
				.wait(8250)
				.fade(7, 1000)
				.wait(8000)
				.fade(6, 1000);
		};
	}
});
