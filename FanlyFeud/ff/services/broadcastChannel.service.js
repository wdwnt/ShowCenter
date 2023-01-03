angular.module('broadcastChannel', [])
.factory('broadcastChannel', function($injector){
	return function(channelName){
		if(!channelName){
			try{
				channelName = $injector.get('BROADCAST_CHANNEL');
			}catch(e){
				if(BROADCAST_CHANNEL){
					channelName = BROADCAST_CHANNEL;
				}else {
					throw "Channel name not provided, and no default BROADCAST_CHANNEL is visible";
				}
			}
		}

		let channel = new BroadcastChannel(channelName);

		let callbacks = {};

		channel.onmessage = function(event){
			let data = event.data;
			let tag = data.tag;
			let content = data.content;
			if(callbacks[null]){
				angular.forEach(callbacks[null], function(callback){
					callback(content, tag);
				});
			}
			if(callbacks[tag]){
				angular.forEach(callbacks[tag], function(callback){
					callback(content, tag);
				});
			}
		};

		return{
			send: function(tag, content){
				channel.postMessage({tag: (tag===undefined?null:tag), content: content});
			},
			addListener: function(tag, callback){
				if(tag === undefined){
					tag = null;
				}

				if(!callbacks[tag]){
					callbacks[tag] = [];
				}

				callbacks[tag].push(callback);
			},
			removeListener: function(tag, callback){
				if(tag === undefined){
					tag = null;
				}

				if(!callbacks[tag]){
					return false;
				}

				let index = callbacks[tag].indexOf(callback);
				if(index < 0){
					return false;
				}

				callbacks[tag].splice(index, 1);
				return true;
			}
		}
	}
})
.factory('broadcastBinding', function(broadcastChannel, $parse){
	const TAG_PREFIX="__BROADCAST_BINDING_";
	const CHANGE_POSTFIX="_UPDATE";
	const QUERY_POSTFIX="_QUERY";

	return function($scope, channelName, variableName, watchExpression){
		if(!watchExpression){
			watchExpression=variableName;
		}

		let channel = broadcastChannel(channelName);

		//Used internally, so that when WE change the variable, we don't spawn a bunch of notification about it
		let muteNextChange = false;

		//Used to identify responses sent to just this channel
		let id = Math.random();

		//Get the getters and setters for the expression we've been given
		let getter = $parse(watchExpression);
		let setter = getter.assign;

		//When someone tells us to update the variable, do so, and don't broadcast it again
		channel.addListener(TAG_PREFIX+variableName+CHANGE_POSTFIX, function(content){
			setter($scope, content);
			muteNextChange = true;
			$scope.$apply();
		});

		//Same goes for if someone tells us the variable specifically
		channel.addListener(TAG_PREFIX+variableName+id, function(content){
			setter($scope, content);
			muteNextChange = true;
			$scope.$apply();
		});

		//If someone sends out a query asking for the variable, and ours isn't undefined, respond to just them with the answer.
		channel.addListener(TAG_PREFIX+variableName+QUERY_POSTFIX, function(content){
			if(getter($scope) !== undefined) {
				channel.send(TAG_PREFIX + variableName + content, getter($scope));
			}
		});

		$scope.$watch(function(){
			return JSON.stringify(getter($scope)); //Watch the variable for changes
		}, function(cur, prev){
			if(muteNextChange || cur === prev){
				muteNextChange = false;
				return; //Ignore changes we made, as well as the initial-run scenario
			}

			//Broadcast the change to everyone
			channel.send(TAG_PREFIX+variableName+CHANGE_POSTFIX, getter($scope));
		});

		//And start all this off by asking if anyone knows what the variable is right now.
		channel.send(TAG_PREFIX+variableName+QUERY_POSTFIX, id);
	}
});