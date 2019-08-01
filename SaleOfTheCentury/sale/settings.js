angular.module('sale')
.constant('DEFAULT_SETTINGS', {
	questionValue: 2,
	numberSelectBonuses:[
		[2, 4],
		[6],
		[8]
	],
	prizeList: ['', '', '']
})
.constant('STARTING_CASH', 5)
.factory('DEFAULT_SHOW', function(STARTING_CASH, times){
	return {
		state: 'blank',
		players: [
			{
				name: 'Player 1',
				score: STARTING_CASH,
				selected: false
			},{
				name: 'Player 2',
				score: STARTING_CASH,
				selected: false
			},{
				name: 'Player 3',
				score: STARTING_CASH,
				selected: false
			}
		],
		activePlayer: null,
		numbersBoard: times(9, function(){
			return {
				isMoney: false,
				moneyValue: null,
				isRevealed: false,
				revealedValue: null
			};
		}),
		nextNumbersRound: 0,
		bonusRound: {
			questions: times(4, function (i) {
				return {
					clues: times(6, function(j){
						return {
							word: "clue"+(j+1),
							revealed: false
						};
					}),
					answer: 'answer'+(i+1),
					solved: false
				};
			}),
			timer: 20,
			curQuestion: 0
		},
	};
});