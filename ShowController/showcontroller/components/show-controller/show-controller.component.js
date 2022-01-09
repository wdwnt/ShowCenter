angular.module('showController')
.component('showController', {
	templateUrl: 'components/show-controller/show-controller.template.html',
	controllerAs: 'ctrl',
	controller: function ($scope, $rootScope, $location, $timeout, $filter, $q, vMix) {
		let ctrl = this;

		let REFRESH_FREQUENCY = 15 * 1000;
		let SIX_SHOT = '[L] GM w/ 6 players';
		let FIVE_SHOT = '[L] GM w/ 5 players';
		let FOUR_SHOT = '[L] GM w/ 4 players';

		let TWO_SHOT = '[L] 1v1 w/spectators';
		let TWO_SHOT_SLOT_1 = 1;
		let TWO_SHOT_SLOT_2 = 2;
		let TWO_SHOT_SLOT_1_TEXT = 9;
		let TWO_SHOT_SLOT_2_TEXT = 10;
		let TWO_SHOT_SLOT_GM = 4;
		let TWO_SHOT_SLOT_3 = 5;
		let TWO_SHOT_SLOT_4 = 6;
		let TWO_SHOT_SLOT_5 = 7;
		let TWO_SHOT_SLOT_6 = 8;

		let ONE_SHOT = '[L] GM solo';

		let STILL_STORE = '[L] Still store';
		let STILL_STORE_SLOT = 2;

		let timeout = null;

		ctrl.vMixInputNumberMap = null;
		ctrl.vMixInputNames = null;
		ctrl.playerInputNames = [
			"[C] GM",
			"[C] Player 1",
			"[C] Player 2",
			"[C] Player 3",
			"[C] Player 4",
			"[C] Player 5",
			"[C] Player 6"
		];
		ctrl.gmInputName = "[C] GM";
		ctrl.realPlayerNameMap = {};
		ctrl.stillStoreNames = [];

		ctrl.audioNames = [];
		ctrl.audioPlaying = {};

		ctrl.slotOne = null;
		ctrl.slotTwo = null;
		ctrl.stillStore = null;

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
				ctrl.realPlayerNameMap = {};
				ctrl.stillStoreNames = [];
				ctrl.audioNames = [];
				ctrl.audioPlaying = {};

				angular.forEach(inputs, (input) => {
					let title = input.getAttribute("title");
					ctrl.vMixInputNumberMap[title] = parseInt(input.getAttribute("number"));

					if(title === TWO_SHOT) {
						let overlays = input.getElementsByTagName('overlay');
						for(let i of [TWO_SHOT_SLOT_1 - 1, TWO_SHOT_SLOT_2 - 1]) {
							let key = overlays[i].getAttribute('key');
							let matchingInput = inputs.find((i) => i.getAttribute('key') === key);
							if (i === 0) {
								ctrl.slotOne = matchingInput.getAttribute('title');
							} else {
								ctrl.slotTwo = matchingInput.getAttribute('title');
							}
						}
					} else if(title === STILL_STORE) {
						let overlays = input.getElementsByTagName('overlay');
						try {
							let key = overlays[STILL_STORE_SLOT - 1].getAttribute('key');
							let matchingInput = inputs.find((i) => i.getAttribute('key') === key);
							ctrl.stillStore = matchingInput.getAttribute('title');
						} catch {
							ctrl.stillStore = null;
						}
					} else if(title.startsWith('[S]')) {
						ctrl.stillStoreNames.push(title);
					} else if(title.startsWith('[A]')) {
						ctrl.audioNames.push(title);
						ctrl.audioPlaying[title] = input.getAttribute('state') === 'Running';
					} else if(title.startsWith('[T]')) {
						try {
							const titleText = [...input.getElementsByTagName('text')].find((t) => t.getAttribute('name') === 'Message').getInnerHTML();
							ctrl.realPlayerNameMap[title.replace('[T]', '[C]')] = titleText.split('\n')[0];
						} catch {
							ctrl.realPlayerNameMap[title.replace('[T]', '[C]')] = null;
						}
					}
				});

				ctrl.vMixInputNames = Object.keys(ctrl.vMixInputNumberMap);
			});
		}

		ctrl.showAllShot = () => {
			ctrl.vMix.fade(SIX_SHOT);
		}
		ctrl.showFiveShot = () => {
			ctrl.vMix.fade(FIVE_SHOT);
		}
		ctrl.showFourShot = () => {
			ctrl.vMix.fade(FOUR_SHOT);
		}
		ctrl.showTwoShot = () => {
			ctrl.vMix.fade(TWO_SHOT);
		}
		ctrl.showOneShot = () => {
			ctrl.vMix.fade(ONE_SHOT);
		}
		ctrl.showStillStore = () => {
			ctrl.vMix.fade(STILL_STORE);
		}

		ctrl.setSlotOne = (inputName) => {
			if(ctrl.slotTwo === inputName) {
				ctrl.swapSlots();
			} else {
				ctrl.slotOne = inputName;
				ctrl.updateTwoShot();
			}
		}

		ctrl.setSlotTwo = (inputName) => {
			if(ctrl.slotOne === inputName) {
				ctrl.swapSlots();
			} else {
				ctrl.slotTwo = inputName;
				ctrl.updateTwoShot();
			}
		}

		ctrl.swapSlots = () => {
			const tmp = ctrl.slotOne;
			ctrl.slotOne = ctrl.slotTwo;
			ctrl.slotTwo = tmp;
			ctrl.setTwoShotValuesInVMix();
		}

		ctrl.updateTwoShot = () => {
			// Set the main views
			ctrl.setTwoShotValuesInVMix();

			let fillGMSlot = false;
			// Set the GM input, if the GM isn't in a main slot
			const slotsToFill = [TWO_SHOT_SLOT_3, TWO_SHOT_SLOT_4, TWO_SHOT_SLOT_5, TWO_SHOT_SLOT_6];
			if(ctrl.slotOne === ctrl.gmInputName || ctrl.slotTwo === ctrl.gmInputName) {
				// They're in the main view, so add this to the list of slots to fill
				slotsToFill.unshift(TWO_SHOT_SLOT_GM);
				fillGMSlot = true;
			} else {
				// They not in the main view, put them in their home
				ctrl.vMix.setMultiViewInput(TWO_SHOT, TWO_SHOT_SLOT_GM, ctrl.gmInputName);
			}

			// Set all the spectator views
			let curSlotIndex = 0;
			for(const inputName of ctrl.playerInputNames) {
				if (!(ctrl.slotOne === inputName || ctrl.slotTwo === inputName || (!fillGMSlot && ctrl.gmInputName === inputName))) {
					ctrl.vMix.setMultiViewInput(TWO_SHOT, slotsToFill[curSlotIndex], inputName);
					curSlotIndex++;
				}
			}
		}

		ctrl.setTwoShotValuesInVMix = () => {
			ctrl.vMix.setMultiViewInput(TWO_SHOT, TWO_SHOT_SLOT_1, ctrl.slotOne)
				.setMultiViewInput(TWO_SHOT, TWO_SHOT_SLOT_1_TEXT, 'None')
				.setMultiViewInput(TWO_SHOT, TWO_SHOT_SLOT_1_TEXT, ctrl.slotOne.replace('[C]', '[T]'))
				.setMultiViewInput(TWO_SHOT, TWO_SHOT_SLOT_2, ctrl.slotTwo)
				.setMultiViewInput(TWO_SHOT, TWO_SHOT_SLOT_2_TEXT, 'None')
				.setMultiViewInput(TWO_SHOT, TWO_SHOT_SLOT_2_TEXT, ctrl.slotTwo.replace('[C]', '[T]'));
		}

		ctrl.setStillStore = (inputName) => {
			ctrl.stillStore = inputName;
			ctrl.vMix.setMultiViewInput(STILL_STORE, STILL_STORE_SLOT, ctrl.stillStore);
		}

		ctrl.playAudio = (input) => {
			if(ctrl.audioPlaying[input]) {
				ctrl.vMix.volumeFade(input, 0, 2000).wait(2000).playPause(input).volumeFade(input, 50, 500);
			} else {
				ctrl.vMix.restart(input).playPause(input);
			}
			ctrl.audioPlaying[input] = !ctrl.audioPlaying[input];
		}
	}
});