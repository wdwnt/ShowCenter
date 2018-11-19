angular.module('util', [])
.constant('times', function(n, callback){
	let retval = [];
	for(let i=0; i<n; i++){
		retval.push(callback(i));
	}
	return retval;
});