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
    });