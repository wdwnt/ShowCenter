angular.module('live', ['ngMaterial'])
.config(function($compileProvider){
	$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|data|chrome-extension):/);
})
.run(function($rootScope){
	$rootScope.events = [];

	$rootScope.load = function(text){
		$rootScope.events = [];

		let event = {};
		for(const line of text.split("\n")){
			if(!event.title){
				event.title = line;
				event.items = [];
			}else if(line === ""){
				$rootScope.events.push(event);
				event = {};
			}else{
				const hyphenIndex = line.indexOf("-");
				event.items.push({
					time: line.substr(0, hyphenIndex).trim(),
					event: line.substr(hyphenIndex+1).trim()
				});
			}
		}

		if(event.title){
			$rootScope.events.push(event);
		}
	};

	$rootScope.save = function(){
		html2canvas(document.querySelector(".schedule")).then(canvas => {
			// Create an invisible A element
			const a = document.createElement("a");
			a.style.display = "none";
			document.body.appendChild(a);

			// Set the HREF to a Blob representation of the data to be downloaded
			a.href = canvas.toDataURL('image/png');

			// Use download attribute to set set desired file name
			a.setAttribute("download", "WDWNT-Live.png");

			// Trigger the download by simulating click
			a.click();

			// Cleanup
			window.URL.revokeObjectURL(a.href);
			document.body.removeChild(a);
		});
	};
});
