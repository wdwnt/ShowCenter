$(function(){
    var data = {
  "jeopardy": [
    {
      "name": "11",
      "questions": [
        {
          "question": "FLY OVER STORYBOOK CIRCUS WITH THE GREAT GOOFINI IN THIS ATTRACTION.",
          "answer": "What is the Barnstormer?",
          "value": 100
        },
        {
          "question": "IN FUTURE WORLD, TAKE A JOURNEY INTO THIS.",
          "answer": "What is Imagination?",
          "value": 200
        },
        {
          "question": "THE TOWN THAT DISNEY BUILT.",
          "answer": "Celebration",
          "value": 300
        },
        {
          "question": "THE NAME OF A MOUNTAIN IN THE NAME OF AN ANIMAL KINGDOM ATTRACTION.",
          "answer": "Kilimanjaro (Safaris)",
          "value": 400
        },
        {
          "question": "THE ONLY MAGIC KINGDOM LAND THAT FITS THE CATEGORY.",
          "answer": "What is Fantasyland?",
          "value": 500
        }
      ]
    },
    {
      "name": "YEARS",
      "questions": [
        {
          "question": "FROZEN EVER AFTER AND SOARIN' AROUND THE WORLD",
          "answer": "What is 2016?",
          "value": 100
        },
        {
          "question": "VOYAGE OF THE LITTLE MERMAID AND SPLASH MOUNTAIN",
          "answer": "What is 1992?",
          "value": 200
        },
        {
          "question": "TEST TRACK AND ROCK 'N ROLLER COASTER",
          "answer": "What is 1999?",
          "value": 300
        },
        {
          "question": "THE GRAND FLORIDIAN AND MAELSTROM",
          "answer": "What is 1988?",
          "value": 400
        },
        {
          "question": "THE VILLAS AT ANIMAL KINGDOM LODGE AND THE GRAN FIESTA TOUR STARRING THE THREE CABALLEROS",
          "answer": "What is 2007? (and WDWNT)",
          "value": 500
        }
      ]
    },
    {
      "name": "\"OF\"",
      "questions": [
        {
          "question": "YOU CAN RIDE A BANSHEE ON THIS ATTRACTION, AS LONG AS YOU'RE WILLING TO WAIT OR YOU MANAGE TO SCORE A FASTPASS.",
          "answer": "Flight of Passage",
          "value": 100
        },
        {
          "question": "\"THERE'S A GREAT BIG BEAUTIFUL TOMORROW\" IN THIS ATTRACTION.",
          "answer": "Carousel of Progress",
          "value": 200
        },
        {
          "question": "HELP MERLIN WITH THIS \"OF\" ATTRACTION WHICH HAS A PARK NAME IN IT.",
          "answer": "Sorcerers of the Magic Kingdom",
          "value": 300
        },
        {
          "question": "THIS ATTRACTION HAS \"OF\" IN ITS NAME, BUT IN A FOREIGN LANGUAGE.",
          "answer": "Impressions de France",
          "value": 400
        },
        {
          "question": "EXPLORE ADVENTURELAND COLLECTING MAPS AND CARDS WITH THIS PIRATE'S ADVENTURE ATTRACTION.",
          "answer": "What is Treasures of the Seven Seas?",
          "value": 500
        }
      ]
    },
    {
      "name": "WDW",
      "questions": [
        {
          "question": "TTA",
          "answer": "What is Tomorrowland Transit Authority?",
          "value": 100
        },
        {
          "question": "EMH",
          "answer": "What is Extra Magic Hours?",
          "value": 200
        },
        {
          "question": "MILF",
          "answer": "What is Monsters Inc. Laugh Floor?",
          "value": 300
        },
        {
          "question": "MNSSHP",
          "answer": "What is Mickey's Not So Scary Halloween Party?",
          "value": 400
        },
        {
          "question": "MISICI",
          "answer": "What is Move It, Shake It, Celebrate It?",
          "value": 500,
          "daily-double": true
        }
      ]
    },
    {
      "name": "NEWS TODAY",
      "questions": [
        {
          "question": "IN EPCOT, GUESTS CAN NOW MAKE SKELETONS OF THEIR OWN WITH THE \"MIRROR OF THE DEAD\", INSPIRED BY THIS MOVIE.",
          "answer": "What is Coco?",
          "value": 100
        },
        {
          "question": "THE REMODELED ENTRANCE OF THIS DISNEY SPRINGS STORE NOW SPORTS A MORE INDUSTRIAL LOOK.",
          "answer": "What is World of Disney?",
          "value": 200
        },
        {
          "question": "THE MAGICAL EXPRESS WILL FEATURE A NEW DESIGN TO MATCH THE LOOK OF THE MOTORCOACH FLEET FOR THIS.",
          "answer": "What is the Disney Cruise Line?",
          "value": 300
        },
        {
          "question": "RECENTLY RELEASED PERMITS SHOW THE AREA OF THIS FUTURE PROJECT JUST OUTSIDE OF HOLLYWOOD STUDIOS AND HOW YOU ACCESS IT FROM THE LAND IT WILL SHARE A THEME WITH.",
          "answer": "What is the Star Wars hotel?",
          "value": 400
        },
        {
          "question": "IF YOU COME TO THE WRECK THE HALLS EVENT, YOU COULD SEE THIS ACTOR (WHO ALSO WANTS TO SAVE FIGMENT) READING AT THE CANDLELIGHT PROCESSIONAL.",
          "answer": "Who is Neil Patrick Harris? (Hi, NPH!)",
          "value": 500
        }
      ]
    },
    {
      "name": "HERE NOW IS TOM CORLESS",
      "questions": [
        {
          "question": "HERE'S TOM ON THIS NEW HOLLYWOOD STUDIOS ATTRACTION.",
          "answer": "What is the Slinky Dog Dash?",
          "value": 100,
          "image": "./images/wdwnt/here_tom/100.jpg"
        },
        {
          "question": "HERE'S TOM WITH THIS ANIMAL KINGDOM IMAGINEER. ",
          "answer": "Who is Joe Rhode?",
          "value": 200,
          "image": "./images/wdwnt/here_tom/200.jpg"
        },
        {
          "question": "HERE'S TOM CELEBRATING AMERICA AT THIS WATER PARK. ",
          "answer": "What is Typhoon Lagoon?",
          "value": 300,
          "image": "./images/wdwnt/here_tom/300.jpg"
        },
        {
          "question": "HERE'S TOM AT THE \"BALL WALL\" IN THIS NEWLY RENOVATED AREA.",
          "answer": "What is Pixar Pier?",
          "value": 400,
          "image": "./images/wdwnt/here_tom/400.jpg"
        },
        {
          "question": "HERE'S TOM IN HIS ELEMENT AT THIS TOKYO DISNEYLAND HOTEL. ",
          "answer": "What is Hotel New York?",
          "value": 500,
          "image": "./images/wdwnt/here_tom/500.jpg"
        }
      ]
    }
  ],
  "double-jeopardy": [
    {
      "name": "MIX N' MINGLE",
      "questions": [
        {
          "question": "ICKY ME",
          "answer": "Who is Mickey?",
          "value": 200
        },
        {
          "question": "TANGOS",
          "answer": "Who is Gaston?",
          "value": 400
        },
        {
          "question": "AH, GRIZZLY TUBE",
          "answer": "What is Buzz Lightyear",
          "value": 600,
          "daily-double": true
        },
        {
          "question": "TWO WHINES",
          "answer": "Who is Snow White?",
          "value": 800
        },
        {
          "question": "BEER IN KILT",
          "answer": "Who is Tinkerbell?",
          "value": 1000
        }
      ]
    },
    {
      "name": "I NEED A HERO",
      "questions": [
        {
          "question": "MR. INCREDIBLE INCREDIBLY BUSY? GET A LIFT FROM THIS MARVEL SUPERHERO WHOSE LAUNDRY BILL FOR ELASTIC PURPLE SHORTS IS MUCH HIGHER.",
          "answer": "Who is the Hulk?",
          "value": 200
        },
        {
          "question": "DASH RUN OFF ON YOU? SPEED OFF TO GET THIS SON OF MAGNETO IN THE COMICS (BUT NOT IN THE MCU).",
          "answer": "Who is Quicksilver?",
          "value": 400
        },
        {
          "question": "VIOLET DISAPPEAR ON YOU? THIS HERO COULD APPEAR AS INVISIBLE GIRL OR INVISIBLE WOMAN, BUT HER REAL NAME IS THIS.",
          "answer": "Who is Sue Storm?",
          "value": 600
        },
        {
          "question": "ELASTIGIRL STRETCHING HERSELF TOO THIN? REACH OUT TO THIS SCIENTIST ALSO KNOWN AS MISTER FANTASTIC.",
          "answer": "Who is Reed Richards?",
          "value": 800
        },
        {
          "question": "FROZONE LEAVE YOU IN THE COLD? JUST CHILL AND CALL THIS MEMBER OF THE X-MEN WHO WAS BORN IN FLORAL PARK, NY ON LONG ISLAND.",
          "answer": "Who is Bobby Drake/Iceman?",
          "value": 1000
        }
      ]
    },
    {
      "name": "ACCORDING TO THE LYRICS",
      "questions": [
        {
          "question": "FLIPPIN' YOUR FINS, YOU DON'T GET TOO FAR; LEGS ARE REQUIRED FOR THESE TWO ACTIVITIES.",
          "answer": "What are jumping and dancing?",
          "value": 200
        },
        {
          "question": "THE PIRATES IN THE CARIBBEAN MARAUD AND EMBEZZLE, AND EVEN DO THIS.",
          "answer": "What is hijack?",
          "value": 400
        },
        {
          "question": "IN THE EXTINCT ATTRACTION HORIZONS, IT WILL BE A FUTURE BUILT WITH THIS.",
          "answer": "What is care?",
          "value": 600
        },
        {
          "question": "IN SPECTROMAGIC, ON THIS MAGIC NIGHT, A MILLION STARS WILL PLAY HERE.",
          "answer": "Where is beside us?",
          "value": 800
        },
        {
          "question": "DIGGING IN DINOLAND WILL CAUSE YOUR LEGS TO BE SORE FROM CARRYING THIS OLD CREATURE.",
          "answer": "What is a stegosaur? (stegosaurus acceptable)",
          "value": 1000
        }
      ]
    },
    {
      "name": "RESORT HOPPING - SARATOGA SPRINGS",
      "questions": [
        {
          "question": "THIS ANIMAL IS IN THE SARATOGA SPRINGS LOGO.",
          "answer": "What is a horse?",
          "value": 200
        },
        {
          "question": "IN ORDER OF DISNEY VACATION CLUB RESORT OPENINGS, SARATOGA SPRINGS WAS THIS NUMBER. IT WAS ALSO THE \"ORDER\" OF THE GAME AT THE WDWNT 10TH ANNIVERSARY EVENT.",
          "answer": "What is seven?",
          "value": 400
        },
        {
          "question": "DURING THE 10TH ANNIVERSARY EVENT, WE TASTED BIRTHDAY CAKE BREAD PUDDING FROM THIS SARATOGA SPRINGS COUNTER SERVICE LOCATION.",
          "answer": "What is Artist's Palette?",
          "value": 600
        },
        {
          "question": "SARATOGA SPRINGS WAS BUILT ON THE FORMER SITE OF THIS EDUCATIONAL ESTABLISHMENT.",
          "answer": "What is the Disney Institute?",
          "value": 800
        },
        {
          "question": "WDWNT HOSTED 10TH ANNIVERSARY EVENT PARTIES IN ONE OF THESE STAND-ALONE STRUCTURES, WHICH OPENED AS PHASE 4 OF SARATOGA SPRINGS IN 2009.",
          "answer": "What are the Treehouse Villas?",
          "value": 1000
        }
      ]
    },
    {
      "name": "YOU MUST BE THIS TALL",
      "questions": [
        {
          "question": "SEVEN DWARFS MINE TRAIN, BARNSTORMER, TOMORROWLAND SPEEDWAY (ACCOMPANIED)",
          "answer": "What is Seven Dwarfs Mine Train? (38\", Barnstormer 35\", Speedway 32\")",
          "value": 200
        },
        {
          "question": "BIG THUNDER MOUNTAIN, SPACE MOUNTAIN, SPLASH MOUNTAIN",
          "answer": "What is Space Mountain? (44\", Splash & BTM 40\")",
          "value": 400
        },
        {
          "question": "SOARIN', MISSION: SPACE, TEST TRACK",
          "answer": "What is Mission: SPACE? (44\", Soarin' & Test Track 40\")",
          "value": 600
        },
        {
          "question": "FLIGHT OF PASSAGE, EXPEDITION EVEREST, PRIMEVAL WHIRL",
          "answer": "What is Primeval Whirl (48\", Flight of Passage & Everest 44\")",
          "value": 800
        },
        {
          "question": "DINOSAUR, TOMORROWLAND SPEEDWAY (SINGLE RIDER), ROCK 'N' ROLLER COASTER",
          "answer": "What is Tomorrowland Speedway? (54\", RnR 48\", DINOSAUR 40\")",
          "value": 1000
        }
      ]
    },
    {
      "name": "TOM'S FAVORITE TECH GUY",
      "questions": [
        {
          "question": "BEFORE FASTPASS IN THE 90S, I PARTICIPATED IN A SCAVENGER HUNT AROUND ADVENTURELAND. THE WINNERS WON A CERTIFICATE TO GET TO THE FRONT OF THE LINE IN ANY RIDE. AFTERWARDS, ALL THE PARTICIPANTS GOT TO THE FRONT OF THE LINE AT THIS POPULAR ADVENTURELAND ATTRACTION.",
          "answer": "What is the Jungle Cruise?",
          "value": 200
        },
        {
          "question": "WHEN I WAS IN WALT DISNEY WORLD WITH MY HIGH SCHOOL, WE STAYED AT THIS RESORT WITH A GIANT WOODY. THAT WAS FUNNY FOR A CLASS OF ALL TEENAGE GUYS.",
          "answer": "What is All Star Movies?",
          "value": 400
        },
        {
          "question": "I LIVE PRETTY CLOSE TO FLUSHING, THE SITE WHERE THIS EVENT HELD EARLY VERSIONS OF IT'S A SMALL WORLD AND THE PEOPLEMOVER.",
          "answer": "What is the 1964 World's Fair?",
          "value": 600
        },
        {
          "question": "DURING MY LAST TRIP, I DID WORK IN THE CONTEMPORARY RESORT, USUALLY REFILLING MY DRINK MUG AT THIS QUICK SERVICE LOCATION.",
          "answer": "What is the Contempo Café?",
          "value": 800
        },
        {
          "question": "I ONCE HAD LUNCH WITH AN IMAGINEER WITH THIS MAN WHO LED THE TEAM BEHIND THE LEGEND OF CAPTAIN JACK SPARROW.",
          "answer": "Who is Jason Surrell?",
          "value": 1000,
          "daily-double": true,
          "image": "./images/wdwnt/here_tom/mvb.jpg"
        }
      ]
    }
  ],
  "final-jeopardy": {
    "category": "E-TICKETS",
    "question": "OF THE EIGHT E-TICKET ATTRACTIONS THAT OPENED WITH THE MAGIC KINGDOM IN 1971, ONLY THIS ONE IS NO LONGER IN OPERATION.",
    "answer": "What is 20,000 Leagues Under the Sea?"
  }
}
;
    // $('#game-load-modal').modal('show');
    // //openingTheme.play();
    // $('#game-load-input-button').click(function(){
    //     var file = $('#input-file').prop('files')[0];
    //     if ($('#input-file').val() != '') {
    //         var reader = new FileReader();
    //         reader.readAsText(file);
    //         reader.onload = function(){
    //             var fileText = reader.result;
    //             var data = $.parseJSON(fileText);
    //             jsonData = data;
    //             currentBoard = jsonData[rounds[currentRound]];
    //             loadBoard();
    //             openingTheme.pause();
    //             openingTheme.currentTime = 0;
    //             var boardFillSound = new Audio('./sounds/board_fill.mp3');
    //             //boardFillSound.play();
    //             $('#game-load-modal').modal('hide');
    //         }
    //         reader.onerror = function(e){
    //             $('#game-load-error').text("Error: "+ e).show();
    //         };

    //     }
    // });
    jsonData = data;
    currentBoard = data[rounds[currentRound]];
    loadBoard();

    $('#next-round').unbind('click').click(function(e){
        e.stopPropagation();
        currentRound++;
        if (currentRound == rounds.length) {
            $(this).prop('disabled', true);
            window.location.reload();
        }
        else if (currentRound >= rounds.length - 1) {
            $(this).text('New Game');
        }
        currentBoard = jsonData[rounds[currentRound]];
        $('.panel-heading').empty();
        $('#main-board').empty();
        loadBoard();
    });

    $('#end-round').unbind('click').click(function(e){
        e.stopPropagation();
        var endRoundSound = new Audio('./sounds/end_of_round.mp3');
        endRoundSound.play();
        $('.unanswered').removeClass('unanswered').unbind().css('cursor','not-allowed');
    });
    $(document).on('click', '.unanswered', function(){
        //event bound to clicking on a tile. it grabs the data from the click event, populates the modal, fires the modal, and binds the answer method
        /*
        var category = $(this).parent().data('category');
        var question = $(this).data('question');
        var answer = currentBoard[category].questions[question].answer;
        var value = currentBoard[category].questions[question].value;
        var questionImage = currentBoard[category].questions[question].image;
        var isDailyDouble = 'daily-double' in currentBoard[category].questions[question] ?
            currentBoard[category].questions[question]['daily-double'] : false;

        if (isDailyDouble) {
            var dailyDoubleSound = new Audio('./sounds/daily_double.mp3');
            dailyDoubleSound.play();
            $('#daily-double-modal-title').empty().text(currentBoard[category].name + ' - $' + value);
            $('#daily-double-wager-input').val('');
            $('#daily-double-modal').modal('show');
        }
        else {
            // Candidate for refactoring.
            $('#modal-answer-title').empty().text(currentBoard[category].name + ' - $' + value);
            $('#question').empty().text(currentBoard[category].questions[question].question);
            if (questionImage){
                $('#question-image').empty().append("<img src=./" + questionImage + ">").show();
            }
            else {
                $('#question-image').empty().hide();
            }
            $('#answer-text').text(answer).hide();
            $('#question-modal').modal('show');
            //resizeAnswerModal();
            //$('#answer-close-button').hide().data('question', question).data('category', category);
            $('#answer-close-button').data('question', question).data('category', category);
            $('#answer-show-button').show();
            $('#question-modal .score-button').data('value', value);
            $('#question-modal .score-button').prop('disabled', false);
            $('#question-modal .score-button.btn-success').data('question', question).data('category', category);

        }
        $('#daily-double-wager').click(function(){
            var inputDailyDoubleValue = $('#daily-double-wager-input').val();
            var maxRoundWager = Math.max.apply(Math, currentBoard[0]['questions'].map(function(o){return o.value}));
            var scoreVariable = 'score_player_' + control;

            //get max of maxRoundWager and controlling user score.
            if ( !(isNaN(inputDailyDoubleValue)) && inputDailyDoubleValue != '' && parseInt(inputDailyDoubleValue) >= 5
            	&& Math.max(maxRoundWager, window[scoreVariable]) >= parseInt(inputDailyDoubleValue) ) {

                value = parseInt(inputDailyDoubleValue);
                $('#modal-answer-title').empty().text(currentBoard[category].name + ' - $' + value);
                $('#question-modal .score-button').data('value', value).data('question', question).data('category', category);
                $('#daily-double-modal').modal('hide');

                $('#question').empty().text(currentBoard[category].questions[question].question);
                if (questionImage){
                    $('#question-image').empty().append("<img src=./" + questionImage + ">").show();
                }
                else {
                    $('#question-image').empty().hide();
                }
                $('#answer-text').text(answer).hide();
                $('#question-modal').modal('show');
                //resizeAnswerModal();
                //$('#answer-close-button').hide().data('question', question).data('category', category);
                $('#answer-close-button').data('question', question).data('category', category);
                $('#answer-show-button').show();
                $('#question-modal .score-button').prop('disabled', true);
                $('#p' + control.toString() + '-wrong-button').prop('disabled', false);
                $('#p' + control.toString() + '-right-button').prop('disabled', false);
                $('#question-modal .score-button.btn-success').data('question', question).data('category', category);

            }
			//$(this).empty().append('&nbsp;<div class="clearfix"></div>').removeClass('unanswered').unbind().css('cursor','not-allowed');
            //$('#question-modal').modal('hide');

        });
		//$('#question-modal').on('loaded.bs.modal', resizeAnswerModal());
		$('#question-modal').on('shown.bs.modal', function (e) {
		  resizeAnswerModal();
		})
        handleAnswer();
        */
        $(this).empty().append('&nbsp;<div class="clearfix"></div>').removeClass('unanswered').unbind().css('cursor','not-allowed');
        $('#question-modal').modal('hide');

    });
    $('#score-adjust').click(function(){
        $('#score-adjust-modal').modal('show');
        $('#score-player-1-input').val(score_player_1);
        $('#score-player-2-input').val(score_player_2);
        $('#score-player-3-input').val(score_player_3);
        $("input[name=control-input][value=" + control + "]").attr('checked', 'checked');
        adjustScores();
    });
    $(document).on('click', '#final-jeopardy-question-button', function(){
        $(this).hide();
        $('#final-jeopardy-question').show();
        var revealSound = new Audio('./sounds/final_jeopardy.mp3');
        //revealSound.play();
        $('final-jeopardy-logo-img').hide();
        //$('#final-jeopardy-music-button').show();
        // console.log('30 seconds, good luck'); Cue music
    });
    $(document).on('click', '#final-jeopardy-music-button',function(){
        $(this).hide();
        //var thinkMusicSound = new Audio('./sounds/think_music.mp3');
        //thinkMusicSound.play();
        //setTimeout(function(){
        //    $('#final-jeopardy-answer-button').show();
        //}, 30000);
    });
    $(document).on('click', '#final-jeopardy-answer-button',function(){
        $(this).hide();
        $('#final-jeopardy-modal-answer').text(currentBoard['answer']);
        $('#final-jeopardy-modal-answer').hide();
        $('#final-jeopardy-modal').modal('show');
        handleFinalAnswer();
    });
    $(window).resize(function(){
	    var textHeight = Math.max.apply(null, ($('.category-title').map(function(){return $(this).height();})));
	    var width = Math.max.apply(null, ($('.category-title').map(function(){return $(this).parent().width();})));
	    // If possible to keep aspect ratio, switch to it.
	    //var aspectRatioHeight = width * .75;
	    var aspectRatioHeight = width * (9 / 16);
	    var height = Math.max(textHeight, aspectRatioHeight);
	    $('.category-title').height(height).width(width);
    });

});

var score_player_1 = 0;
var score_player_2 = 0;
var score_player_3 = 0;
var control = 1;
var rounds = ['jeopardy', 'double-jeopardy', 'final-jeopardy'];
var playerTranslation = {1: 'Red', 2: 'Blue', 3: 'Green'}
var currentBoard;
var currentRound = 0;
var isTimerActive = false;
var timerMaxCount = 5;
var timerObject;
var timerCount;
var gameDataFile;
var openingTheme = new Audio('./sounds/theme.mp3');


function runTimer() {
    timerObject = setTimeout(function(){
        timerCount++;
        $('.timer-set-' + timerCount).css('background-color', 'black');
        if (timerCount < timerMaxCount) {
            runTimer();
        }
        else {
            var timeUpAudio = new Audio('./sounds/time_up.mp3')
            timeUpAudio.play();
            // Doo doo doo
            resetTimer();
        }
    }, 1000);
}

function resetTimer() {
    clearTimeout(timerObject);
    isTimerActive = false;
    timerCount = 0;
    $('.timer-square').css('background-color', 'black');
}

function adjustScores(){
    $('#score-adjust-save').click(function(){
        for (var i = 1; i < 4; i++) {
            var scoreVariableName = 'score_player_' + i;
            var inputName = '#score-player-' + i + '-input';
            var newScoreValue = $(inputName).val();
            if (!(isNaN(newScoreValue))) {
                window[scoreVariableName] = parseInt(newScoreValue);
            }
        };
		control = $("input[name=control-input]:checked").val();

        updateScore();
    });
}

function updateScore(){
	var score_text = '';
	score_player_1 < 0 ? score_text = '-$' + Math.abs(score_player_1).toString() : score_text = "$" + score_player_1.toString();
	score_player_1 < 0 ? $('#player-1-score').css('color', 'red') : $('#player-1-score').css('color', 'white');
    $('#player-1-score').empty().text(score_text);

	score_player_2 < 0 ? score_text = '-$' + Math.abs(score_player_2).toString() : score_text = "$" + score_player_2.toString();
	score_player_2 < 0 ? $('#player-2-score').css('color', 'red') : $('#player-2-score').css('color', 'white');
    $('#player-2-score').empty().text(score_text);

	score_player_3 < 0 ? score_text = '-$' + Math.abs(score_player_3).toString() : score_text = "$" + score_player_3.toString();
	score_player_3 < 0 ? $('#player-3-score').css('color', 'red') : $('#player-3-score').css('color', 'white');
    $('#player-3-score').empty().text(score_text);

	$('#control-player').empty().text(playerTranslation[control]);
    //$('#player-2-score').empty().text(score_player_2);
    //$('#player-3-score').empty().text(score_player_3);
}

function loadBoard() {
    //function that turns the board.json (loaded in the the currentBoard variable) into a jeopardy board
    var board = $('#main-board');
    if (rounds[currentRound] === "final-jeopardy") {
        $('#end-round').hide();
        $('#control-info').hide();
        $('#main-board-categories').append('<div class="text-center col-md-6 col-md-offset-3"><h2 class="category-text">' +
            currentBoard['category'] + '</h2></div>').css('background-color', 'navy');
        board.append('<div class="text-center col-md-6 col-md-offset-3"><h2><img src="./images/final_jeopardy.png" id="final-jeopardy-logo-img"></h2>'+
        	'<h2 id="final-jeopardy-question" class="question-text">' + currentBoard['question'] + '<br /><br />' +
            currentBoard['answer'] + '</h2><button class="btn btn-primary" id="final-jeopardy-question-button">Show Question</button>' +
            '<button class="btn btn-primary" id="final-jeopardy-music-button">30 Seconds, Good Luck</button>' +
            '<button class="btn btn-primary" id="final-jeopardy-answer-button">Show Answer</button></div>').css('background-color', 'navy');
        $('#final-jeopardy-question').hide();
        $('#final-jeopardy-music-button').hide();
        $('#final-jeopardy-answer-button').hide();
        $('#final-jeopardy-question-button').hide();
        $('#final-jeopardy-question').show();
    }
    else {
	    if (rounds[currentRound] === "double-jeopardy") {
		    if (score_player_1 <= score_player_2 && score_player_1 <= score_player_3) {
			    control = 1;
		    }
		    else if (score_player_2 <= score_player_3) {
			    control = 2;
		    }
		    else {
			    control = 3;
		    }
	    }
        $('#control-player').empty().text(playerTranslation[control]);
        $('#end-round').show();
        board.css('background-color', 'black');
        var columns = currentBoard.length;

        // Floor of width/12, for Bootstrap column width appropriate for the number of categories
        var column_width = parseInt(12/columns);
        $.each(currentBoard, function(i,category){
            // Category
            var header_class = 'col-md-' + column_width;
            if (i === 0 && columns % 2 != 0){ //if the number of columns is odd, offset the first one by one to center them
                header_class += ' col-md-offset-1';
            }
            $('#main-board-categories').append('<div class="category ' + header_class
                + '"><div class="text-center well"><div class="category-title category-text text-center">' + category.name
                 + '</div></div><div class="clearfix"></div></div>').css('background-color', 'black');

            // Column
            var div_class = 'category col-md-' + column_width;
            if (i === 0 && columns % 2 != 0){
                div_class += ' col-md-offset-1';
            }
            board.append('<div class="' + div_class + '" id="cat-' +
                i + '" data-category="' + i + '"></div>');
            var column = $('#cat-'+i);

            $.each(category.questions, function(n,question){
                // Questions
                var isDailyDouble = 'daily-double' in question ? question['daily-double'] : false;
                var ddStyle = isDailyDouble ? ' style="color:#FF0000" ' : "";
                var hasImage = 'image' in question ? true : false;
                var imageLink = hasImage ? '<p><a href="' + question.image + '">Image</a></p>' : ''
                column.append('<div ' + ddStyle + 'class="well unanswered host-question text-center" data-question="' +
                    n + '">$' + question.value + ': ' + question.question + ' - <i>' + question.answer + '</i>' + imageLink + '</div>');
            });
        });
    }
    $('#main-board-categories').append('<div class="clearfix"></div>');
    var textHeight = Math.max.apply(null, ($('.category-title').map(function(){return $(this).height();})));
    var width = Math.max.apply(null, ($('.category-title').map(function(){return $(this).parent().width();})));
    // If possible to keep aspect ratio, switch to it.
    //var aspectRatioHeight = width * .75;
    var aspectRatioHeight = width * (9 / 16);
    var height = Math.max(textHeight, aspectRatioHeight);
    $('.category-title').height(height).width(width);
    var maxAnswerHeight = Math.max.apply(null, $(".host-question").map(function (){return $(this).height();}).get());
    $('.host-question').height(maxAnswerHeight);

    /*
    var questionTextHeight = Math.max.apply(null, ($('.question').map(function(){return $(this).height();})));
    var questionWidth = Math.max.apply(null, ($('.question').map(function(){return $(this).parent().width();})));
    var questionAspectRatioHeight = questionWidth * (9/16);
    var questionFinalHeight = Math.max(questionTextHeight, questionAspectRatioHeight);
    $('.question').height(questionFinalHeight);
    */
}

function resizeAnswerModal() {
    var otherHeights = ($('#question-modal-content .modal-header, #question-modal-content .modal-footer').map(function(){return $(this).outerHeight();}));
    var totalModalHeight = $('#question-modal-content').height();
    for(var i=0; i < otherHeights.length; i++) { totalModalHeight -= otherHeights[i]; }
    var modalBodyObj = $('#question-modal-content .modal-body');
    var modalBodyPadding = modalBodyObj.innerHeight() - modalBodyObj.height();
    //modalBodyObj.outerHeight(totalModalHeight);
    modalBodyObj.css('height',(totalModalHeight - modalBodyPadding)); // Adjust again for padding

    questionCenterPadding = ($('#question-modal-body').height() - ($('#question-image').height() + $('#question').height()))/2;
    $('#question').css('padding-top', questionCenterPadding);

}

function handleAnswer(){
    $('.score-button').unbind("click").click(function(e){
        e.stopPropagation();
        var buttonID = $(this).attr("id");
        var answerValue = parseInt($(this).data('value'));
        var buttonAction = buttonID.substr(3, 5);
        var playerNumber = buttonID.charAt(1);
        var scoreVariable = 'score_player_' + playerNumber;

        buttonAction === 'right' ? window[scoreVariable] += answerValue
            : window[scoreVariable] -= answerValue;
        $(this).prop('disabled', true);
        var otherButtonID = '#p' + playerNumber + '-' + (buttonAction === 'right' ? 'wrong' : 'right') + '-button';
        $(otherButtonID).prop('disabled', true);
        resetTimer();

        // Possible behavior of disabling all scoring after a right answer?
        if (buttonAction === 'right') {
            var tile = $('div[data-category="' + $(this).data('category') + '"]>[data-question="' +
                $(this).data('question') + '"]')[0];
            //console.log(tile);
            $('#question-modal .score-button').prop('disabled', true);
            control = playerNumber;

            $(tile).empty().append('&nbsp;<div class="clearfix"></div>').removeClass('unanswered').unbind().css('cursor','not-allowed');
            $('#question-modal').modal('hide');

        }
        updateScore();
    });

    $('#answer-show-button').click(function(){
        $(this).hide();
        $('#answer-text').show();
        resizeAnswerModal();
        //$('#answer-close-button').show();
    });
    $('#answer-close-button').click(function(){
        var tile = $('div[data-category="' + $(this).data('category') + '"]>[data-question="' +
            $(this).data('question') + '"]')[0];
        $(tile).empty().append('&nbsp;<div class="clearfix"></div>').removeClass('unanswered').unbind().css('cursor','not-allowed');
        $('#question-modal').modal('hide');
    });

    $('#timer-grid').unbind("click").click(function(e){
        e.stopPropagation();
        if (isTimerActive) {
            resetTimer();
        }
        else {
            $('.timer-square').css('background-color', 'red');
            isTimerActive = true;
            timerCount = 0;
            runTimer();
        }
        //isTimerActive = isTimerActive ? false : true;
    });
}

function handleFinalAnswer(){
    $('.final-score-button').unbind('click').click(function(e){
        e.stopPropagation();
        var buttonID = $(this).attr("id");
        var buttonAction = buttonID.substr(9,5);
        var playerNumber = buttonID.charAt(7);
        var wagerID = '#wager-player-' + playerNumber + '-input';
        var wager = $(wagerID).val() == '' ? 0 : parseInt($(wagerID).val());
        var scoreVariable = 'score_player_' + playerNumber;
        var otherButtonID = '#final-p' + playerNumber + '-' +
            (buttonAction === 'right' ? 'wrong' : 'right') + '-button';

        buttonAction === 'right' ? window[scoreVariable] += wager : window[scoreVariable] -= wager;

        $(this).prop('disabled', true);
        $(otherButtonID).prop('disabled', true);
        $(wagerID).prop('disabled', true).val('$' + window[scoreVariable]);

        updateScore();

    });


    $('#final-answer-show-button').click(function(){
        $(this).hide();
        $('#final-jeopardy-modal-answer').show();
        //resizeAnswerModal();
        //$('#answer-close-button').show();
    });

}
