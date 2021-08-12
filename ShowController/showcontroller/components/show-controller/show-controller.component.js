angular.module('showController')
.component('showController', {
	templateUrl: 'components/show-controller/show-controller.template.html',
	controllerAs: 'ctrl',
	controller: function ($scope, $rootScope, $location, $timeout, $filter, $q, vMix) {
		let ctrl = this;

		let REFRESH_FREQUENCY = 15 * 1000;
		let CHAOS_OVERLAY = 3;
		let ALL_SHOT = 'AllShot';
		let TWO_SHOT = 'TwoShot';
		let TWO_SHOT_SLOT_1 = 1;
		let TWO_SHOT_SLOT_2 = 2;
		let ONE_SHOT = 'OneShot';
		let ONE_SHOT_SLOT = 1;

		let timeout = null;

		ctrl.vMixInputNumberMap = null;
		ctrl.vMixInputNames = null;
		ctrl.playerInputName = [null, null, null, null, null, null];

		ctrl.slotOne = null;
		ctrl.slotTwo = null;

		ctrl.vMix = null;

		ctrl.connectToVMix = (url) => {
			ctrl.vMix = vMix(url);
			if(timeout) {
				clearInterval(timeout);
			}
			setInterval(() => ctrl.refresh(), REFRESH_FREQUENCY);
			ctrl.refresh();
		}

		ctrl.refresh = () => {
			ctrl.vMix.call('').then(function(response) {
				let doc = new DOMParser().parseFromString(response.data, "text/xml");
				let inputs = [...doc.children[0].getElementsByTagName("inputs")[0].children];

				ctrl.vMixInputNumberMap = {};

				angular.forEach(inputs, (input) => {
					let title = input.getAttribute("title");
					ctrl.vMixInputNumberMap[title] = parseInt(input.getAttribute("number"));

					if(title === ALL_SHOT) {
						let overlays = input.getElementsByTagName('overlay');
						for(let i of [0, 1, 2, 3, 4, 5]) {
							let key = overlays[i].getAttribute('key');
							let matchingInput = inputs.find((i) => i.getAttribute('key') === key);
							ctrl.playerInputName[i] = matchingInput.getAttribute('title');
						}
					} else if(title === TWO_SHOT) {
						let overlays = input.getElementsByTagName('overlay');
						for(let i of [0, 1]) {
							let key = overlays[i].getAttribute('key');
							let matchingInput = inputs.find((i) => i.getAttribute('key') === key);
							if (i === 0) {
								ctrl.slotOne = matchingInput.getAttribute('title');
							} else {
								ctrl.slotTwo = matchingInput.getAttribute('title');
							}
						}
					}
				});

				ctrl.vMixInputNames = Object.keys(ctrl.vMixInputNumberMap);
			});
		}

		ctrl.showAllShot = () => {
			ctrl.vMix.fade(ALL_SHOT);
		}
		ctrl.showTwoShot = () => {
			ctrl.vMix.fade(TWO_SHOT);
		}
		ctrl.showOneShot = () => {
			ctrl.vMix.fade(ONE_SHOT);
		}

		ctrl.setChaos = (num) => {
			ctrl.vMix.overlay(num + '-chaosdice.png', CHAOS_OVERLAY);
		}

		ctrl.setSlotOne = (inputName) => {
			ctrl.slotOne = inputName;
			ctrl.vMix.setMultiViewInput(ONE_SHOT, ONE_SHOT_SLOT, inputName);
			ctrl.vMix.setMultiViewInput(TWO_SHOT, TWO_SHOT_SLOT_1, inputName);
		}

		ctrl.setSlotTwo = (inputName) => {
			ctrl.slotTwo = inputName;
			ctrl.vMix.setMultiViewInput(TWO_SHOT, TWO_SHOT_SLOT_2, inputName);
		}
	}
});