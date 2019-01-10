angular.module('vMix', [])
    .factory('vMix', function($q, $http, $timeout){
        let VMIX_DEFAULT_LOCATION = "http://127.0.0.1:8088/api/";

        return function(url){
            let VMIX_LOCATION = VMIX_DEFAULT_LOCATION;
            if(url){
                VMIX_LOCATION = url;
            }

            let NAME_INPUT_MAP = {};

            let call = function(params){
                let defer = $q.defer();

                $http.get(VMIX_LOCATION+params).then(function(result){
                    defer.resolve(result);
                }, function(){
                    defer.reject();
                });

                return defer.promise;
            };

            let wait = function(duration){
                let defer = $q.defer();

                $timeout(function(result){
                    defer.resolve(result);
                }, duration);

                return defer.promise;
            };

            let wrap = function(promise){
                return {
                    call: function(params){
                        return wrap(promise.then(function(){
                            return call(params);
                        }));
                    },
                    cut: function(input){
                        return wrap(promise.then(function(){
                            return call("?Function=Cut&Input="+(input||0));
                        }));
                    },
                    fade: function(input, duration){
                        return wrap(promise.then(function(){
                            return call("?Function=Fade&Input="+(input||0)+"&Duration="+(duration||500));
                        }));
                    },
                    play: function(input){
                        return wrap(promise.then(function(){
                            return call("?Function=Play&Input="+(input||0));
                        }));
                    },
                    restart: function(input){
                        return wrap(promise.then(function(){
                            return call("?Function=Restart&Input="+(input||0));
                        }));
                    },
                    playFromBeginning: function(input){
                        return this.restart(input).play(input);
                    },
                    overlay: function(input, overlayNumber){
                        if(!overlayNumber){
                            overlayNumber = 1;
                        }
                        return wrap(promise.then(function(){
                            return call("?Function=OverlayInput"+overlayNumber+"&Input="+(input||0));
                        }));
                    },
                    setMultiViewInput: function(input, multiViewSlot, setInput){
                        if(!input || !multiViewSlot || !setInput){
                            console.log("bad input");
                            return this.wait(0);
                        }
                        return wrap(promise.then(function(){
                            if((typeof setInput)==='string'){
                                setInput = NAME_INPUT_MAP[setInput];
                                if(!setInput){
                                    console.log("couldn't map input");
                                    console.log(angular.toJson(NAME_INPUT_MAP));
                                    return wait(0);
                                }
                            }
                            return call("?Function=SetMultiViewOverlay&Input="+input+"&Value="+multiViewSlot+","+setInput);
                        }));
                    },
                    wait: function(duration){
                        return wrap(promise.then(function(){
                            return wait(duration);
                        }));
                    },
                    then: function(callback){
                        return wrap(promise.then(callback));
                    }
                }
            };

            return wrap(wait(0))
                .call("")
                .then(function(response){
                    let doc = new DOMParser().parseFromString(response.data, "text/xml");
                    let inputs = doc.children[0].getElementsByTagName("inputs")[0].children;
                    angular.forEach(inputs, function(input){
                        let title = input.getAttribute("title");
                        NAME_INPUT_MAP[title] = parseInt(input.getAttribute("number"));
                    });
                    return NAME_INPUT_MAP;
                });
        };
    });