angular.module('vMix', [])
    .factory('vMix', function($q, $http, $timeout){
        let VMIX_DEFAULT_LOCATION = "http://127.0.0.1:8088/api/";

        return function(url){
            let VMIX_LOCATION = VMIX_DEFAULT_LOCATION;
            if(url){
                VMIX_LOCATION = url;
            }

            let call = function(params){
                let defer = $q.defer();

                $http.get(VMIX_LOCATION+params).then(function(){
                    defer.resolve();
                }, function(){
                    defer.reject();
                });

                return wrap(defer.promise);
            };

            let wait = function(duration){
                let defer = $q.defer();

                $timeout(function(){
                    defer.resolve();
                }, duration);

                return wrap(defer.promise);
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

            return wrap($q.resolve(url));
        };
    });