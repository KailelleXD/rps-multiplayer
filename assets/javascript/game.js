$(document).ready(function() {


// Variables / Arrays ////

    // Player name info / Helps to determine if Player 1 or 2.
var nameHolder = "";
var player1 = "";
var player2 = "";

    // Variables that determine what to do based on if a user is Player 1 or 2.
var whichPlayerAmI = ""; // "Player 1" or "Player 2"

    // Locally stored variable for either player 1 or 2's choice of Rock, Paper, or Scissors.
var userChoice = "blank";
var p1Choice = "blank";
var p2Choice = "blank"; 
var player1Name = "";
var player2Name = "";

    // Variables to send message and game info strings to the firebase realtime database.
var post = "";
var displayPosts = "";
var displayInfo = "";

    // Counters to keep track of wins/losses for each player.
var p1Wins = 0;
var p2Wins = 0;
var p1Losses = 0;
var p2Losses = 0;

    // Round and Interval Counter.
var round = 1;
var countdown = 5;
var shortCountdown = 3;

    // Used to determine if the game is currently running already.
var gameState = 0;

var readyState = 0;
var resetState = 0;

    // Used to determine if someone is currently at the start screen or not.
var startScreen = false;

// Objects ////

topPanelObj = {
    rps: "assets/images/tp-rps.jpg",
    rock: "assets/images/tp-rock.jpg",
    paper: "assets/images/tp-paper.jpg",
    scissors: "assets/images/tp-scissors.jpg",
    go: "assets/images/tp-go.jpg",
    blank: "assets/images/tp-blank.jpg"
};

rpsObj = {
    rock: "assets/images/rock.jpg",
    paper: "assets/images/paper.jpg",
    scissors: "assets/images/scissors.jpg",
    blank: "assets/images/blank.jpg"
};

winPanelObj = {
    p1: "assets/images/wp-p1.jpg",
    p2: "assets/images/wp-p2.jpg",
    tieGame: "assets/images/wp-tg.jpg",
    blank: "assets/images/wp-blank.jpg",
    huh: "assets/images/wp-huh.jpg"
};


//___________________________________________////
// References for Firebase Realtime Database ////

// keys ////
    // player1Name
    // player2Name
    // player1Choice
    // player2Choice
    // gameState
    // startScreen

// Nodes ////
    // messages
    // gameInfoMsgs

// Initialize Firebase
var config = {
    apiKey: "AIzaSyABfK6-CepsF2wIKZfTFMa4xyJAZ3qRzuA",
    authDomain: "rps-go-16974.firebaseapp.com",
    databaseURL: "https://rps-go-16974.firebaseio.com",
    projectId: "rps-go-16974",
    storageBucket: "rps-go-16974.appspot.com",
    messagingSenderId: "741923666379"
  };
  firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

// Firebase watcher + initial loader HINT: .on("value")
database.ref().on("value", function(snapshot) {

    // Log everything that's coming out of snapshot
    // console.log(snapshot.val());
    // console.log("player1Name: " + snapshot.val().player1Name);
    // console.log("player2Name: " + snapshot.val().player2Name);
    // console.log("gameState: " + snapshot.val().gameState);
    // console.log("startScreen: " + snapshot.val().startScreen);
    // console.log("player1Choice: " + snapshot.val().player1Choice)
    // console.log("player2Choice: " + snapshot.val().player2Choice)
    player1 = snapshot.val().player1Name;
    player2 = snapshot.val().player2Name;
    gameState = snapshot.val().gameState;
    startScreen = snapshot.val().startScreen;
    p1Choice = snapshot.val().player1Choice;
    p2Choice = snapshot.val().player2Choice;
       
    playerDisplay(p1Choice, p2Choice);
    checkGameState();
    goBtn();
    
});

// On change in value in ("btnState/") on dbase, take the values for these key-pairs from the dbase and pass them into the ready/reset buttons.
database.ref("btnState/").on("value", function(snapshot) {
    let ready = snapshot.val().readyState;
    let reset = snapshot.val().resetState;
    readyBtnCheck(ready);
    resetBtnCheck(reset);
});

// On change in value in ("score/") on dbase, take the values for these key-pairs from the dbase and pass into scoreChecker function.
database.ref("score/").on("value", function(snapshot) {
    let win1 = snapshot.val().w1;
    let win2 = snapshot.val().w2;
    let loss1 = snapshot.val().l1;
    let loss2 = snapshot.val().l2;
    let rNum = snapshot.val().round;
    scoreChecker(win1,win2,loss1,loss2,rNum);
});

// Get player name data and pass into showPlayerName function.
database.ref().on("value", function(snapshot) {
    player1 = snapshot.val().player1Name;
    player2 = snapshot.val().player2Name;
    showPlayerName(player1, player2);
});


//___________________________________________////

//___________________________////
// Function Chain References ////

// Start-Screen //
// goBtn -> noNameCheck -> playerName -> setGameScreen

// Game-Screen //
// readyBtn -> gameStart -> topPanelStart -> playerDefaultCheck -> winLossState -> player1Wins, player2Wins, tieGame -> nextRound

// Reset //
// resetBtn -> resetGame

//___________________________////


// Functions____________________////

// Start Screen //

// Checks the gameState from the database and informs the user if a game is in progress.
// AND sets startScreen key-pair to TRUE.
function checkGameState() {
    // console.log("checkGameState(); function has been called");
    // IF, gameState is TRUE.. THEN, .show() #game-in-progress.
    if (gameState === 2) {
        // console.log("#game-in-session message should be showing");
        $("#game-in-session").show();
        // Change #go-btn to RED, change text to ⦸
        $("#go-btn").removeClass("bg-success");
        $("#go-btn").text("⦸")
        $("#go-btn").addClass("bg-danger");
    }
    // IF, gameState is FALSE.. THEN, .hide() #game-in-progress.
    if (gameState < 2) {
        // console.log("#game-in-session message should be hidden");
        $("#game-in-session").hide();
        $("#go-btn").removeClass("bg-danger");
        $("#go-btn").text("GO!")
        $("#go-btn").addClass("bg-success");
    }
} /// checkGameState();

// Uses .hide() method to hide enter-a-name messages.
function hideStartInfo() {
    $("#enter-a-name").hide();  
} /// clearNames();

// Sets up click functionality, and calls the function noNameCheck();
function goBtn() {
    // console.log("goBtn(); function has been called");
    // Only run if game is not already in progress.
    if (gameState < 2) {
        // .on Click event listener
        $("#go-btn").on("click", function() {
            // console.log("#go-btn, has been clicked!");
            // When user clicks, call noNameCheck();
            noNameCheck();
        });
    } else {
        // console.log("#go-btn should not be functioning.");
    }
} /// goBtn();

// Checks to see if a player entered a name or not.
function noNameCheck() {
    // console.log("noNameCheck(); function has been called");
    let name = $("#player-name").val();
    // console.log("The value of name is: " + name);
    // Check if text-input field (#player-name) is blank.
    // IF, blank. THEN, inform player to, "Please enter a name."
    if (name === "") {
        $("#enter-a-name").show();
    // ELSE, place value from text input box into the variable nameHolder
    } else {
        $("#enter-a-name").hide();
        $("#player-name").val("");
        nameHolder = name;
        // console.log("nameHolder: " + nameHolder);
        playerName();
    } 
} /// noNameCheck();

// Checks the database to find out if the user is player 1 or player 2 or IF the game is already in progress.
function playerName() {
    // console.log("playerName(); function has been called");
    // console.log("player1: " + player1 + " / " + "player2: " + player2);
    // IF, playerName1 key-value is "" (empty).
    if (player1 === "") {
        whichPlayerAmI = "Player 1";
        userName = nameHolder;
        // THEN, set nameHolder to value of the key-pair of player1Name.
        database.ref().update({
            player1Name: nameHolder,
            gameState: 1,            
        });
        // console.log("player1: " + player1);
        setGameScreen();
    // ELSE IF, playerName2 key-value is "" (empty).
    } else if (player2 === "") {
        whichPlayerAmI = "Player 2";
        userName = nameHolder;
        // THEN, set nameHolder to value of the key-pair of player2Name.
        database.ref().update({
            player2Name: nameHolder,
            gameState: 2,            
        });
        // console.log("player2: " + player2);
        setGameScreen();
    // ELSE, inform the user to: "Game in Session, please wait..."
    } else {
        $("#game-in-session").show();
    } 
} /// playerName1();

// Dynamically generates the game screen.
function setGameScreen() {
    // Set key-value pair of startScreen to FALSE.
    database.ref().update({
        startScreen: false           
    });
    // Replaces HTML elements on DOM with HTML to build the game-screen.
    $("#screen").html(

        '<div class="row justify-content-center">' +
                
                '<!-- Main Column 1 -->' +
                '<div id="rps-panel" class="content-wrapper col-4 bg-primary mx-1 p-1 rps-image">' +
                    
                    '<!-- Sub Row 1 (Player Name, Top Display Panel, Round Number) -->' +
                    '<div class="row mt-1 mb-3">' +
                        
                        '<!-- Col 1 (Player Name) -->' +
                        '<div class="col-4">' +
                            '<div>' +
                                '<p class="d-flex align-items-start justify-content-center my-0 py-0 ">Player&nbsp;<span id="p-num-display">1</span>:</p>' +
                                '<p id="player-name-panel" class="d-flex align-items-start justify-content-center my-0 py-0 "></p>' +
                            '</div>' +
                        '</div>' +
                        
                        '<!-- Col 2 (Top Display Panel)-->' +
                        '<div class="col-4 d-flex align-items-center justify-content-center">' +
                            '<img src="assets/images/tp-rps.jpg" id="tp-display" class="border border-dark rounded m-0">' +
                        '</div>' +
                        
                        '<!-- Col 3 (Round Number)-->' +
                        '<div class="col-4">' +
                            '<div>' +
                                '<p class="d-flex align-items-start justify-content-center my-0 ">Round:</p>' +
                                '<p id="r-num" class="d-flex align-items-start justify-content-center my-0 ">1</p>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
        
                    '<!-- Sub Row 2 (Player 1 Choice, Winner Panel, Player 2 Choice) -->' +
                    '<div class="row mb-2">' +
                        
                        '<!-- Col 1 (Player 1 Choice) -->' +
                        '<div class="col-4 m-0 p-0">' +
                            '<img src="assets/images/blank.jpg" id="p1-display" data-rock="rpsObj.rock" class="center-block border border-light rounded mt-1">' +
                        '</div>' +
                        
                        '<!-- Col 2 (Winner Panel) -->' +
                        '<div class="col-4 m-0 p-0">' +
                            '<img src="assets/images/wp-blank.jpg" id="win-panel" class="center-block border border-dark rounded mt-1">' +
                        '</div>' +
                        
                        '<!-- Col 3 (Player 2 Choice) -->' +
                        '<div class="col-4 m-0 p-0">' +
                            '<img src="assets/images/blank.jpg" id="p2-display" class="center-block border border-light rounded mt-1">' +
                        '</div>' +
                    '</div>' +
        
                    '<!-- Sub Row 3 (Decorative shape, Wins/Losses Panel, Decorative shape) -->' +
                    '<div class="row mb-3">' +
                        
                        '<!-- Col 1 (Decorative shape)-->' +
                        '<div class="col-4 m-0 p-0">' +
                            '<div class="bg-decor-shape-left mr-3 ml-1 mt-3 py-4"></div>' +
                        '</div>' +
                        
                        '<!-- Col 2 (Win/Losses Panel) -->' +
                        '<div class="col-4 mt-3 m-0 p-0">' +
        
                            '<!-- Sub sub Row 1 -->' +
                            '<div class="row panel-border-dark d-flex justify-content-center m-0">' +
                                '<!-- Sub Col 1 -->' +
                                '<div id="w1" class="col-3 bg-dark text-light d-flex justify-content-center">0</div>' +
                                '<!-- Sub Col 2 -->' +
                                '<div class="col-3 bg-light d-flex justify-content-center m-0 py-0 px-4">Wins</div>' +
                                '<!-- Sub Col 3 -->' +
                                '<div id="w2" class="col-3 bg-dark text-light d-flex justify-content-center">0</div>' +
                            '</div>' +
        
                            '<!-- Sub sub Row 2 -->' +
                            '<div class="row panel-border-dark d-flex justify-content-center m-0">' +
                                '<!-- Sub Col 1 -->' +
                                '<div id="l1" class="col-3 bg-light d-flex justify-content-center">0</div>' +
                                '<!-- Sub Col 2 -->' +
                                '<div class="col-3 bg-dark text-light d-flex justify-content-center m-0 py-0 px-4">Losses</div>' +
                                '<!-- Sub Col 3 -->' +
                                '<div id="l2" class="col-3 bg-light d-flex justify-content-center">0</div>' +
                            '</div>' +
        
                        '</div>' +
                        
                        '<!-- Col 3 (Decorative shape) -->' +
                        '<div class="col-4 m-0 p-0">' +
                            '<div class="bg-decor-shape-right ml-3 mr-1 mt-3 py-4"></div>' +
                        '</div>' +
                    '</div>' +
        
                    '<!-- Sub Row 4 (Player Choices: [ROCK] [PAPER] [SCISSORS]) -->' +
                    '<div class="row mb-2 mx-2">' +
                        
                        '<!-- Col 1 (Player Choice: [ROCK]) -->' +
                        '<div class="col-4 m-0 p-0">' +
                            '<img src="assets/images/rock.jpg" data-state="rock" class="choice center-block border border-light rounded mt-1">' +
                        '</div>' +
                        
                        '<!-- Col 2 (Player Choice: [PAPER])-->' +
                        '<div class="col-4 m-0 p-0">' +
                            '<img src="assets/images/paper.jpg" data-state="paper" class="choice center-block border border-light rounded mt-1">' +
                        '</div>' +
                        
                        '<!-- Col 3 (Player Choice: [SCISSORS])-->' +
                        '<div class="col-4 m-0 p-0">' +
                            '<img src="assets/images/scissors.jpg" data-state="scissors" class="choice center-block border border-light rounded mt-1">' +
                        '</div>' +
                    '</div>' +
                    '<!-- Sub Row 5 (Ready Button, Reset Button) -->' +
                    '<div class="row mb-2 mx-1">' +
                        
                        '<!-- Col 1 (Ready Button) -->' +
                        '<div id="ready-btn" class="col-6 bg-secondary rounded border border-dark d-flex justify-content-center" data-state="off">READY</div>' +
                        
                        '<!-- Col 2 (Reset Button) -->' +
                        '<div id="reset-btn" class="col-6 bg-secondary rounded border border-dark d-flex justify-content-center" data-state="off">RESET</div>' +
                    '</div>' +      
                '</div>' +
        
                '<!-- Main Column 2 -->' +
                '<div id="msg-panel" class="content-wrapper col-6 mx-1 chat-panel">' +
        
                    '<!-- Row 1 (Game Title) -->' +
                    '<div class="row bg-light title-round px-3"><H1 class="pt-2">ROCK, PAPER, SCISSORS... GO!!!</H1></div>' +
                    '<!-- Row 2 (Chat Area) -->' +
                    '<div class="row chat-area bg-primary pt-2">' +
                        '<div id="chat-display-area" class="ml-3 mb-1">' +
                        '</div>' +
                    '</div>' +
            '</div>' +
        
            '<div class="row">' +
            '<!-- Row 3 (Chat Entry) -->' +
            '<div id="game-info-panel" class="chat-panel game-panel mt-2 px-0 pt-4 pb-1 mx-auto">' +
                '<div id="chat-box" class="chat-entry d-flex align-items-end">' +
                    '<div class="input-group input-group-sm mb-3">' +
                        '<div class="input-group-prepend">' +
                            '<button class="chat-button input-group-text" id="inputGroup-sizing-sm">CHAT</button>' +
                        '</div>' +
                        '<input type="text" id="text-input" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">' +
                    '</div>' +
                '</div>' +
            '</div>'
        
            );











            









        

            infoPoster(whichPlayerAmI + ": " + userName + ", has joined the game!");
            displayMsgsLive();
            displayInfoLive();
            chatBtn();
            readyBtn();
            resetBtn();
} /// setGameScreen();


// Game Area //
// Sets up click functionality, checks the btn data-state: off, partial, full. (refer to research-list.js)
function readyBtn() {
    $("#ready-btn").css("cursor", "pointer");
    // On user click:
    $(document).on("click", "#ready-btn", function() {
        // Check [Data-State] attribute for a value of: off, partial, or full.
        let state = $("#ready-btn").attr("data-state");
        // console.log(state);
        // Switch statement, takes the variable 'state' and cycles through data-states: off>partial>full
        switch(state) {
            case "off":
                $("#ready-btn").attr("data-state", "partial");
                $("#ready-btn").removeClass("bg-secondary");
                $("#ready-btn").addClass("bg-warning");
                database.ref("btnState/").update({
                    readyState: "partial"
                });
                break;
            case "partial":
                $("#ready-btn").attr("data-state", "full");
                $("#ready-btn").removeClass("bg-warning");
                $("#ready-btn").addClass("bg-success");
                database.ref("btnState/").update({
                    readyState: "full"
                });
                break;
            case "full":
                $("#ready-btn").attr("data-state", "off");
                $("#ready-btn").removeClass("bg-success");
                $("#ready-btn").addClass("bg-secondary");
                database.ref("btnState/").update({
                    readyState: "off"
                });
        }
    });
} /// readyBtn();

// Checks the value from the dbase, and changes the resetButton accordingly.
function readyBtnCheck(state) {
    // console.log("readyBtnCheck has been called")
    // console.log(state);
        switch(state) {
            case "off":
            $("#ready-btn").attr("data-state", "off");
            $("#ready-btn").removeClass("bg-success");
            $("#ready-btn").addClass("bg-secondary");
                break;
            case "full":
            $("#ready-btn").attr("data-state", "full");
            $("#ready-btn").removeClass("bg-warning");
            $("#ready-btn").addClass("bg-success");
            gameStart();
                break;
            case "partial":
            $("#ready-btn").attr("data-state", "partial");
            $("#ready-btn").removeClass("bg-secondary");
            $("#ready-btn").addClass("bg-warning");
                break;
        }
} /// readyBtnCheck();

// Calls the necessary functions to start each round.
function gameStart() {
    // console.log("gameStart(); function has been called")
    topPanelStart();
    choiceClicks();
} /// gameStart();

// Sets up click functionality, for each <img> and stores both player's choices.
function choiceClicks() {
    // console.log("choiceClicks(); function has been called");
    // On user click:
    $(".choice").css("cursor", "pointer");
    $(document).on("click", ".choice", function() {
        let state = $(this).attr("data-state");
        userChoice = state;
        // console.log("You clicked " + state + "!");
        if (whichPlayerAmI === "Player 1") {
            // console.log("Player 1");
            switch(state) {
                case "rock":
                    // $("#p1-display").attr("src", rpsObj.rock);
                    database.ref().update({
                        player1Choice: "rock"
                    });
                    break;
                case "paper":
                    // $("#p1-display").attr("src", rpsObj.paper);
                    database.ref().update({
                        player1Choice: "paper"
                    });
                    break;
                case "scissors":
                    // $("#p1-display").attr("src", rpsObj.scissors);
                    database.ref().update({
                        player1Choice: "scissors"
                    });
                    break;
            }
        } else if (whichPlayerAmI === "Player 2") {
            // console.log("Player 2");
            switch(state) {
                case "rock":
                    // $("#p2-display").attr("src", rpsObj.rock);
                    database.ref().update({
                        player2Choice: "rock"
                    });
                    break;
                case "paper":
                    // $("#p2-display").attr("src", rpsObj.paper);
                    database.ref().update({
                        player2Choice: "paper"
                    });
                    break;
                case "scissors":
                    // $("#p2-display").attr("src", rpsObj.scissors);
                    database.ref().update({
                        player2Choice: "scissors"
                    });
                    break;
            }
        }
    });
    // Assign the value found in [data-value] attriute to the variable: userChoice.
    // IF, the variable: whichPlayerAmI === "p1"
    // THEN, store the value in the player1Choice key-pair (database)
    // IF, the variable: whichPlayerAmI === "p2"
    // THEN, store the value in the player2Choice key-pair (database)
} /// choiceClicks();

// Starts a countdown to display: ROCK, PAPER, SCISSORS, GO! in the Top Panel Display.
function topPanelStart() {
    // console.log("topPanelStart(); function has been called");
    // Start a 5 sec. countdown.
    countdown = 5;
    var intervalId = setInterval(function() {
        countdown--;
        switch(countdown) {
            case 4:
                $("#tp-display").attr("src", topPanelObj.rock);
                break;
            case 3:
                $("#tp-display").attr("src", topPanelObj.paper);            
                break;
            case 2:
                $("#tp-display").attr("src", topPanelObj.scissors);
                break;
            case 1:
                $("#tp-display").attr("src", topPanelObj.go);
                break;
            case 0:
                $("#tp-display").attr("src", topPanelObj.blank);
                playerDefaultCheck(); 
                break;
            case -1:
                $("#tp-display").attr("src", topPanelObj.rps);
                clearInterval(intervalId);
                
        }
    }, 1000);
} /// topPanelStart();

// Checks to determine if player made a choice within the alotted 1 sec. time frame.
function playerDefaultCheck() {
    // console.log("playerDefaultCheck() function has been called");
    // IF, userChoice === "blank"
    if (userChoice === "blank") {
        // THEN, in Game Info Panel, display the variable: whichPlayerAmI + "failed to make a choice in time!" (database)
        infoPoster(whichPlayerAmI + ": failed to make a choice in time!");
        winLossState();
    } else {
        winLossState();
    }
} /// playerDefaultCheck();

// Determines who won/lost and calls the appropriate function.
function winLossState() {
    // console.log("winLossState(); function has been called");
    // console.log("p1Choice is: " + p1Choice);
    // console.log("p2Choice is: " + p2Choice);
    if (p1Choice === "rock" && p2Choice === "scissors" ||
        p1Choice === "paper" && p2Choice === "rock" ||
        p1Choice === "scissors" && p2Choice === "paper" ||
        p1Choice !== "" && p2Choice === "") {
            player1Wins();
        } else if (
            p2Choice === "rock" && p1Choice === "scissors" ||
            p2Choice === "paper" && p1Choice === "rock" ||
            p2Choice === "scissors" && p1Choice === "paper" ||
            p2Choice !== "" && p1Choice === "") {
                player2Wins();
        } else if (p1Choice === "rock" && p2Choice === "rock" ||
        p1Choice === "paper" && p2Choice === "paper" ||
        p1Choice === "scissors" && p2Choice === "scissors") {
            tieGame();
        } else if (p1Choice === "" && p2Choice === "") {
            bothBlank();
        }
} /// winLossState();

// Increments the variables that apply to a player 1 win.
function player1Wins() {
    console.log("player1Wins called");
    // Increment: p1Wins, p2Losses.
    p1Wins++;
    p2Losses++;
    tallyScores();
    // In Win Panel, display msg: "Player 1 Wins!"
    $("#win-panel").attr("src", winPanelObj.p1)
    // call nextRound();
    nextRound();
} /// player1Wins();

// Increments the variables that apply to a player 2 win.
function player2Wins() {
    console.log("player2Wins called");
// Increment: p2Wins, p1Losses.
    p2Wins++;
    p1Losses++;
    tallyScores();
    // In Win Panel, display msg: "Player 2 Wins!"
    $("#win-panel").attr("src", winPanelObj.p2)
    // call nextRound();
    nextRound();
} /// player2Wins();

// When game is tied, display a msg in Win Panel.
function tieGame() {
    console.log("tieGame called");
    // In Win Panel, Display msg: "It's a Tie!"
    $("#win-panel").attr("src", winPanelObj.tieGame)
    // Call nextRound();
    nextRound();
} /// tieGame();

// When neither player takes an action, display ??? in Win Panel.
function bothBlank() {
    console.log("bothBlank called")
    $("#win-panel").attr("src", winPanelObj.huh)
    nextRound();
}

// Store the updated scores in the dbase. AND number of rounds!!
function tallyScores() {
    database.ref("score/").update({
        w1: p1Wins,
        w2: p2Wins,
        l1: p1Losses,
        l2: p2Losses
    });
} /// tallyScores();

// Get the scores (and round number!) from the dbase and display on the scoreboard.
function scoreChecker(p1W, p2W, p1L, p2L, rN) {
    // console.log("scoreChecker has been called");
    $("#w1").html(p1W);
    $("#w2").html(p2W);
    $("#l1").html(p1L);
    $("#l2").html(p2L);
    $("#r-num").html(rN);
}

// Waits for 3 secs, then increments the round, clears the Win Panel, display a game info message and calls readyBtn();
function nextRound() {
    // Starts a 3 sec. countdown.
    shortCountdown = 3;
    var intervalId = setInterval(function() {
        shortCountdown--;
        console.log(shortCountdown);
        if (shortCountdown === 0) {
            
            chgDisplay("blank","blank");

            $("#tp-display").attr("src", topPanelObj.rps);
            $("#win-panel").attr("src", winPanelObj.blank);

            $("#ready-btn").attr("data-state", "off");
            $("#ready-btn").removeClass("bg-success");
            $("#ready-btn").addClass("bg-secondary");
            database.ref("btnState/").update({
                readyState: "off"
            });

            round++;
            database.ref("score/").update({
                round: round
            });

            infoPoster("Starting Round " + round + ", Both players click READY to start!");
            clearInterval(intervalId);                 
        }
    }, 1000);
} /// nextRound();

// Sets up click functionality, checks the btn data-state: off, partial, full. (refer to research-list.js)
function resetBtn() {
    $("#reset-btn").css("cursor", "pointer");
    // On user click:
    $(document).on("click", "#reset-btn", function() {
        // Check [Data-State] attribute for a value of: off, partial, or full.
        let state = $("#reset-btn").attr("data-state");
        // console.log(state);
        // Switch statement, takes the variable 'state' and cycles through data-states: off>partial>full
        switch(state) {
            case "off":
                $("#reset-btn").attr("data-state", "partial");
                $("#reset-btn").removeClass("bg-secondary");
                $("#reset-btn").addClass("bg-warning");
                    database.ref("btnState/").update({
                        resetState: "partial"
                    });
                break;
            case "partial":
                $("#reset-btn").attr("data-state", "full");
                $("#reset-btn").removeClass("bg-warning");
                $("#reset-btn").addClass("bg-success");
                    database.ref("btnState/").update({
                        resetState: "full"
                    });
                break;
            case "full":
                $("#reset-btn").attr("data-state", "off");
                $("#reset-btn").removeClass("bg-success");
                $("#reset-btn").addClass("bg-secondary");
                    database.ref("btnState/").update({
                        resetState: "off"
                    });
        }   
    });    
} /// resetBtn();

function resetBtnCheck(state) {
        // console.log("resetBtnCheck has been called")
    // console.log(state);
    switch(state) {
        case "off":
        $("#reset-btn").attr("data-state", "off");
        $("#reset-btn").removeClass("bg-warning bg-success");
        $("#reset-btn").addClass("bg-secondary");
            break;
        case "full":
        $("#reset-btn").attr("data-state", "full");
        $("#reset-btn").removeClass("bg-secondary bg-warning");
        $("#reset-btn").addClass("bg-success");
            database.ref("messages/").remove();
            infoPoster("Game has been reset!");
            resetGame();
            break;
        case "partial":
        $("#reset-btn").attr("data-state", "partial");
        $("#reset-btn").removeClass("bg-success bg-secondary");
        $("#reset-btn").addClass("bg-warning");
            break;
    }
}

// Clears the required variables on browser/database to reset the game.
function resetGame() {
    p1Wins = 0;
    p2Wins = 0;
    p1Losses = 0;
    p2Losses = 0;
    tallyScores();
    round = 1;
    database.ref("score/").update({
        round: round
    });

    $("#reset-btn").attr("data-state", "off");
    $("#reset-btn").removeClass("bg-success");
    $("#reset-btn").addClass("bg-secondary");
    database.ref("btnState/").update({
        resetState: "off"
    });

    $("#ready-btn").attr("data-state", "off");
    $("#ready-btn").removeClass("bg-success");
    $("#ready-btn").addClass("bg-secondary");
    database.ref("btnState/").update({
        readyState: "off"
    });

    chgDisplay("","");
    database.ref("messages/").remove();
    

    
} /// resetGame();

// Checks to see if user is Player 1 or 2, then displays the correct name (and player NuMBER) from the database.
function showPlayerName(pN1, pN2) {
    if (whichPlayerAmI === "Player 1") {
        $("#player-name-panel").html(pN1);
        $("#p-num-display").text("1");

    } else if (whichPlayerAmI === "Player 2") {
        $("#player-name-panel").html(pN2);
        $("#p-num-display").text("2");
    } 
} /// showPlayerName(pN1,pN2);

// Using pass-through arguments, we take player1Choice and player2Choice from the dbase and display the approriate image to both players.
function playerDisplay(p1Choice, p2Choice) {
        switch(p1Choice) {
            case "rock":
                $("#p1-display").attr("src", rpsObj.rock);
                break;
            case "paper":
                $("#p1-display").attr("src", rpsObj.paper);
                break;
            case "scissors":
                $("#p1-display").attr("src", rpsObj.scissors);
                break;
            case "blank":
                $("#p1-display").attr("src", rpsObj.blank);
        }
        switch(p2Choice) {
            case "rock":
                $("#p2-display").attr("src", rpsObj.rock);
                break;
            case "paper":
                $("#p2-display").attr("src", rpsObj.paper);
                break;
            case "scissors":
                $("#p2-display").attr("src", rpsObj.scissors);
                break;
            case "blank":
                $("#p2-display").attr("src", rpsObj.blank);
        }
} /// playerDisplay();

function chgDisplay(p1Choice, p1Choice) {
    database.ref().update({
        player1Choice: p1Choice,
        player2Choice: p2Choice
    })
} /// chgDisplay("","");

// Chat Area //
// Sets up click functionality, takes text info from text-box and stores it in the proper location in the database.
function chatBtn() {
    // On user click:
    $(document).on("click", ".chat-button", function() {
        // console.log("#inputGroup-sizing-sm (Chat Button), has been clicked!");
        // Assign the value of the text-box into the variable: message.
        post = $("#text-input").val().trim();
        let msgToStore = userName + ": " + post;
        $("#text-input").val("");
        // Use PUSH to store the message in the messagesSection part of the (database)
            var messagesRef = database.ref("messages/");
            messagesRef.push(msgToStore).key
        });
} /// chatBtn();

function displayMessages() {
    database.ref("messages/").on("child_added", function(snapshot) {
  
        // console.log(snapshot.val());
        displayPosts = snapshot.val();
        
        var newDiv = $("<div>");
        newDiv.text(displayPosts);
        $("#chat-display-area").append(newDiv);
    
        // Handle the errors
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
}

function displayMsgsLive () {
    database.ref("messages/").once("child_added", function(snapshot) {
        displayMessages();
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
}

function infoPoster(msg) {
        // Use PUSH to store the message in the messagesSection part of the (database)
            var gameInfoRef = database.ref("messages/");
            gameInfoRef.push(msg).key
} /// infoPoster("Place msg in quotes here");

// Checks the database when (child is added) and refreshes the Game Info Display.
function displayGameInfo() {
    database.ref("gameInfoMsgs/").on("child_added", function(snapshot) {
  
        // console.log(snapshot.val());
        displayInfo = snapshot.val();
        
        var newDiv = $("<div>");
        newDiv.text(displayInfo);
        $("#game-info-panel").append(newDiv);
    
        // Handle the errors
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
} /// displayGameinfo();

function displayInfoLive () {
    database.ref("gameInfoMsgs/").once("child_added", function(snapshot) {
        displayGameInfo();
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
} /// displayInfoLive();

//______________________________////

//-----------------------------------------------------------------=-------//
//Diagnostic-tools                                                         //
function consoleClickCheck() {                                             //
    $(document).on("click", function() {
        console.log("Diagnostic-tool----------");
        console.log("-------------------------");   
    });
} ///function to console.log on each click.                                //
// consoleClickCheck(); // Comment-in this line to use the above function. //
//-----------------------------------------------------=-------------------//

////Diagnostic-tool////
// consoleClickCheck();
///////////////////////

//---------------------------------------------------------------------------------------------------//
// Event Listener to determine when a user has closed (unloaded the window)                          //
// and then clear the key-value pairs that determine if a user is player 1 or 2.                     //
window.onbeforeunload = function (e) {
    if (gameState > 0) {
        database.ref().update({
            player1Name: "",
            player2Name: "",
            player1Choice: "",
            player2Choice: ""
        });
        database.ref("messages/").remove();
    }
} 
window.onunload = function (e) {
    if (gameState > 0) {
        database.ref().update({
            gameState: 0
        });
    }
    if (startScreen === true) {
        database.ref().update({
            startScreen: false
        });
    }
}
//----------------------------------------------------------------------------------------------------//

// Main Game Code ////
// userAtStartScreen();
hideStartInfo();

});  ///$(document).ready(function() {});

// On document load set the values of the following key-pairs and set the startScreen bool to true.
$(window).on("load",function() {
    firebase.database().ref().update({
        startScreen: true
    });
    firebase.database().ref("btnState/").update({
        readyState: "off"
    });
    firebase.database().ref("score/").update({
        round: 1
    })
});
