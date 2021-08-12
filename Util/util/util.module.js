angular.module('util', [])
.constant('times', function(n, callback){
	let retval = [];
	for(let i=0; i<n; i++){
		retval.push(callback(i));
	}
	return retval;
})
.constant('addCss', function(file){
	const head  = document.getElementsByTagName('head')[0];
	const link  = document.createElement('link');
	link.rel  = 'stylesheet';
	link.type = 'text/css';
	link.href = file;
	link.media = 'all';
	head.appendChild(link);
});