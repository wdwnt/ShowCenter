angular.module('toysBar', ['ngMaterial'])
.component('progressBar', {
	templateUrl: 'bar.html',
	controller: function($http, $timeout){
		const ctrl = this;

		const DATA_URL = "https://internalapi-events.salsalabs.org/v1/public_event/fundraisers/4bf7cba7-ca2c-47a4-9dc5-1929a0e77b33?eventId=9e5c23ba-f2ea-4ab2-9f47-3bbfff085e45";
		const END_DATE = new Date("2019-12-01T23:00:00-05:00");
		const REFRESH_RATE = 30*1000; //ms

		const _second = 1000; //ms
		const _minute = _second * 60;
		const _hour = _minute * 60;
		const _day = _hour * 24;

		ctrl.refresh = function(){
			$http.get(DATA_URL).then(function (resp) {
				const fundraiser = resp.data.payload.fundraiser;
				ctrl.progressDollars = fundraiser.amountRaised;
				ctrl.donations = fundraiser.donors;
				ctrl.goal = fundraiser.goalAmount;

				ctrl.progressPercent = Math.floor(1000 * ctrl.progressDollars / ctrl.goal)/10;

				let now = new Date();
				let distance = END_DATE - now;
				if (distance < 0) {
					ctrl.timeLeft = {
						number: "No",
						units: "Time"
					};
				}else{
					let days = Math.floor(distance / _day);
					let hours = Math.floor((distance % _day) / _hour);
					let minutes = Math.floor((distance % _hour) / _minute);
					let seconds = Math.floor((distance % _minute) / _second);

					if(days){
						ctrl.timeLeft = {
							number: days,
							units: "Days"
						};
					}else if(hours){
						ctrl.timeLeft = {
							number: hours,
							units: "Hours"
						};
					}else if(minutes){
						ctrl.timeLeft = {
							number: minutes,
							units: "Minutes"
						};
					}else{
						ctrl.timeLeft = {
							number: seconds,
							units: "Seconds"
						};
					}
				}
			});
		};

		ctrl.$onInit = function() {
			function refreshLoop(){
				ctrl.refresh();
				$timeout(refreshLoop, REFRESH_RATE);
			}
			refreshLoop();
		};
	}
});
