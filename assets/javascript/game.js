$(document).ready(function() {


// Variables / Arrays ////

    // Player name info / Helps to determine if Player 1 or 2.
var nameHolder = "";
var player1 = "";
var player2 = "";

    // Variables that determine what to do based on if a user is Player 1 or 2.
var whichPlayerAmI = ""; // "Player 1" or "Player 2"
var playerToCheck = ""; // "p1" or "p2"

    // Locally stored variable for either player 1 or 2's choice of Rock, Paper, or Scissors.
var userChoice = "blank";
var p1Choice = ""; //
var p2Choice = ""; // might not need these.

    // Variables to send message and game info strings to the firebase realtime database.
var message = "";
var gameInfo = "";

    // Counters to keep track of wins/losses for each player.
var p1Wins = 0;
var p2Wins = 0;
var p1Losses = 0;
var p2Losses = 0;

    // Round and Interval Counter.
var round = 1;
var counter = 5;

    // Used to determine if the game is currently running already.
var gameState = 0;

    // Used to determine if someone is currently at the start screen or not.
var startScreen = false;

// Objects ////

topDisplayObj = {
    rps: "assets/images/tp-rps.jpg",
    rock: "assets/images/tp-rock.jpg",
    paper: "assets/images/tp-paper.jpg",
    scissors: "assets/images/tp-scissors.jpg",
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
    tieGame: "assets/images/wp-tg.jpg"
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
    // messagesSection
    // gameInfoSection

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
    console.log("player1Name: " + snapshot.val().player1Name);
    console.log("player2Name: " + snapshot.val().player2Name);
    console.log("gameState: " + snapshot.val().gameState);
    console.log("startScreen: " + snapshot.val().startScreen);
    player1 = snapshot.val().player1Name;
    player2 = snapshot.val().player2Name;
    gameState = snapshot.val().gameState;
    startScreen = snapshot.val().startScreen;
    checkGameState();
    goBtn();
    
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
// Starting function to set key-pair, startScreen to TRUE.
function userAtStartScreen() {
    database.ref().update({
        startScreen: true
    });
}

// Checks the gameState from the database and informs the user if a game is in progress.
// AND sets startScreen key-pair to TRUE.
function checkGameState() {
    console.log("checkGameState(); function has been called");
    // IF, gameState is TRUE.. THEN, .show() #game-in-progress.
    if (gameState === 2) {
        console.log("#game-in-session message should be showing");
        $("#game-in-session").show();
        // Change #go-btn to RED, change text to ⦸
        $("#go-btn").removeClass("bg-success");
        $("#go-btn").text("⦸")
        $("#go-btn").addClass("bg-danger");
    }
    // IF, gameState is FALSE.. THEN, .hide() #game-in-progress.
    if (gameState < 2) {
        console.log("#game-in-session message should be hidden");
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
    console.log("goBtn(); function has been called");
    // Only run if game is not already in progress.
    if (gameState < 2) {
        // .on Click event listener
        $("#go-btn").on("click", function() {
            console.log("#go-btn, has been clicked!");
            // When user clicks, call noNameCheck();
            noNameCheck();
        });
    } else {
        console.log("#go-btn should not be functioning.");
    }
} /// goBtn();

// Checks to see if a player entered a name or not.
function noNameCheck() {
    console.log("noNameCheck(); function has been called");
    let name = $("#player-name").val();
    console.log("The value of name is: " + name);
    // Check if text-input field (#player-name) is blank.
    // IF, blank. THEN, inform player to, "Please enter a name."
    if (name === "") {
        $("#enter-a-name").show();
    // ELSE, place value from text input box into the variable nameHolder
    } else {
        $("#enter-a-name").hide();
        $("#player-name").val("");
        nameHolder = name;
        console.log("nameHolder: " + nameHolder);
        playerName();
    } 
} /// noNameCheck();

// Checks the database to find out if the user is player 1 or player 2 or IF the game is already in progress.
function playerName() {
    console.log("playerName(); function has been called");
    console.log("player1: " + player1 + " / " + "player2: " + player2);
    // IF, playerName1 key-value is "" (empty).
    if (player1 === "") {
        // THEN, set nameHolder to value of the key-pair of player1Name.
        database.ref().update({
            player1Name: nameHolder,
            gameState: 1,            
        });
        console.log("player1: " + player1);
        setGameScreen();
    // ELSE IF, playerName2 key-value is "" (empty).
    } else if (player2 === "") {
        // THEN, set nameHolder to value of the key-pair of player2Name.
        database.ref().update({
            player2Name: nameHolder,
            gameState: 2,            
        });
        console.log("player2: " + player2);
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
                '<div class="content-wrapper col-4 bg-primary mx-1 p-1 rps-image">' +
                    
                    '<!-- Sub Row 1 (Player Name, Top Display Panel, Round Number) -->' +
                    '<div class="row mt-1 mb-3">' +
                        
                        '<!-- Col 1 (Player Name) -->' +
                        '<div class="col-4">' +
                            '<div>' +
                                '<p class="d-flex align-items-start justify-content-center my-0 py-0 ">Player 1:</p>' +
                                '<p id="player-name-panel" class="d-flex align-items-start justify-content-center my-0 py-0 ">Stevo</p>' +
                            '</div>' +
                        '</div>' +
                        
                        '<!-- Col 2 (Top Display Panel)-->' +
                        '<div id="td-panel" class="col-4 d-flex align-items-center justify-content-center">' +
                            '<img src="assets/images/tp-rps.jpg" class="border border-dark rounded m-0">' +
                        '</div>' +
                        
                        '<!-- Col 3 (Round Number)-->' +
                        '<div class="col-4">' +
                            '<div>' +
                                '<p class="d-flex align-items-start justify-content-center my-0 ">Round:</p>' +
                                '<p id="round-number" class="d-flex align-items-start justify-content-center my-0 ">1</p>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
        
                    '<!-- Sub Row 2 (Player 1 Choice, Winner Panel, Player 2 Choice) -->' +
                    '<div class="row mb-2">' +
                        
                        '<!-- Col 1 (Player 1 Choice) -->' +
                        '<div id="p1-display" class="col-4 m-0 p-0">' +
                            '<img src="assets/images/blank.jpg" class="center-block border border-light rounded mt-1">' +
                        '</div>' +
                        
                        '<!-- Col 2 (Winner Panel) -->' +
                        '<div id="win-panel" class="col-4 m-0 p-0">' +
                            '<img src="assets/images/wp-blank.jpg" class="center-block border border-dark rounded mt-1">' +
                        '</div>' +
                        
                        '<!-- Col 3 (Player 2 Choice) -->' +
                        '<div id="p2-display" class="col-4 m-0 p-0">' +
                            '<img src="assets/images/blank.jpg" class="center-block border border-light rounded mt-1">' +
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
                                '<div class="col-3 bg-dark text-light d-flex justify-content-center">0</div>' +
                                '<!-- Sub Col 2 -->' +
                                '<div class="col-3 bg-light d-flex justify-content-center m-0 py-0 px-4">Wins</div>' +
                                '<!-- Sub Col 3 -->' +
                                '<div class="col-3 bg-dark text-light d-flex justify-content-center">0</div>' +
                            '</div>' +
        
                            '<!-- Sub sub Row 2 -->' +
                            '<div class="row panel-border-dark d-flex justify-content-center m-0">' +
                                '<!-- Sub Col 1 -->' +
                                '<div class="col-3 bg-light d-flex justify-content-center">0</div>' +
                                '<!-- Sub Col 2 -->' +
                                '<div class="col-3 bg-dark text-light d-flex justify-content-center m-0 py-0 px-4">Losses</div>' +
                                '<!-- Sub Col 3 -->' +
                                '<div class="col-3 bg-light d-flex justify-content-center">0</div>' +
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
                            '<img src="assets/images/rock.jpg" class="center-block border border-light rounded mt-1">' +
                        '</div>' +
                        
                        '<!-- Col 2 (Player Choice: [PAPER])-->' +
                        '<div class="col-4 m-0 p-0">' +
                            '<img src="assets/images/paper.jpg" class="center-block border border-light rounded mt-1">' +
                        '</div>' +
                        
                        '<!-- Col 3 (Player Choice: [SCISSORS])-->' +
                        '<div class="col-4 m-0 p-0">' +
                            '<img src="assets/images/scissors.jpg" class="center-block border border-light rounded mt-1">' +
                        '</div>' +
                    '</div>' +
        
                    '<!-- Sub Row 5 (Ready Button, Reset Button) -->' +
                    '<div class="row mb-2 mx-1">' +
                        
                        '<!-- Col 1 (Ready Button) -->' +
                        '<div class="col-6 bg-secondary rounded border border-dark d-flex justify-content-center">READY</div>' +
                        
                        '<!-- Col 2 (Reset Button) -->' +
                        '<div class="col-6 bg-secondary rounded border border-dark d-flex justify-content-center">RESET</div>' +
                    '</div>' +
        
                    
                '</div>' +
        
                '<!-- Main Column 2 -->' +
                '<div class="content-wrapper col-6 mx-1 chat-panel">' +
        
                    '<!-- Row 1 (Game Title) -->' +
                    '<div class="row bg-light title-round px-3"><H1 class="pt-2">ROCK, PAPER, SCISSORS... GO!!!</H1></div>' +
        
                    '<!-- Row 2 (Chat Area) -->' +
                    '<div class="row chat-area bg-primary pt-2">' +
                        '<div id="chat-display-area">' +
                            '<div class="mx-2">-</div>' +
                            '<div class="mx-2">-</div>' +
                            '<div class="mx-2">-</div>' +
                            '<div class="mx-2">-</div>' +
                            '<div class="mx-2">-</div>' +
                            '<div class="mx-2">-</div>' +
                            '<div class="mx-2">-</div>' +
                        '</div>' +
                    '</div>' +
        
                    '<!-- Row 3 (Chat Entry) -->' +
                    '<div class="row chat-entry d-flex align-items-end">' +
                        '<div class="input-group input-group-sm mb-3">' +
                            '<div class="input-group-prepend">' +
                                '<span class="input-group-text" id="inputGroup-sizing-sm">CHAT</span>' +
                            '</div>' +
                            '<input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">' +
                        '</div>' +
                    '</div>' +
                    '<div id="game-info-panel" class="game-panel m-0 p-0">' +
                        '<div>~ Player 1: Stevo, has joined the game.</div>' +
                        '<div>~ Waiting for Player 2...</div>' +
                    '</div>' +
                '</div>' +
        
            '</div>'
        
            );
} /// setGameScreen();


// Game Area //
// Sets up click functionality, checks the btn data-state: off, partial, full. (refer to research-list.js)
function readyBtn() {
    // On user click:
    // Check [Data-State] attribute for a value of: off, partial, or full.
    // IF, value === "off". THEN, set value to: partial.
        // Change button bg-color to: yellow.
    // IF, value === "partial". THEN set value to: full.
        // Change button bg-color to: green.
        // Call gameStart();
    // IF, value === "full". THEN, set value to: off.
        // Change button bg-color to: gray.
} /// readyBtn();

// Calls the necessary functions to start each round.
function gameStart() {
    // Call topPanelStart();
    // Call choiceClicks();
} /// gameStart();

// Sets up click functionality, for each <img> and stores both player's choices.
function choiceClicks() {
    // On user click:
    // Assign the value found in [data-value] attriute to the variable: userChoice.
    // IF, the variable: whichPlayerAmI === "p1"
    // THEN, store the value in the player1Choice key-pair (database)
    // IF, the variable: whichPlayerAmI === "p2"
    // THEN, store the value in the player2Choice key-pair (database)
} /// choiceClicks();

// Starts a countdown to display: ROCK, PAPER, SCISSORS, GO! in the Top Panel Display.
function topPanelStart() {
    // Start a 5 sec. countdown.
    // @ "4", display: "ROCK" in Top Panel Display   
    // @ "3", display: "PAPER"
    // @ "2", display: "SCISSORS"
    // @ "1", display: "GO!"
    // @ "0", Call playerDefaultCheck();
} /// topPanelStart();

// Checks to determine if player made a choice within the alotted 1 sec. time frame.
function playerDefaultCheck() {
    // IF, userChoice === "blank"
    // THEN, in Game Info Panel, display the variable: whichPlayerAmI + "failed to make a choice in time!" (database)
        // call winLossState();
    // ELSE, call winLossState();
} /// playerDefaultCheck();

// Determines who won/lost and calls the appropriate function.
function winLossState() {
    // IF, p1Choice === "rock" && p2Choice === "scissors" ||
        // p1Choice === "paper" && p2Choice === "rock" ||
        // p1Choice === "scissors" && p2Choice === "paper" ||
        // p2Choice === "blank"
    // THEN, call player1Wins();
    // ELSE IF, p2Choice === "rock" && p1Choice === "scissors" ||
        // p2Choice === "paper" && p1Choice === "rock" ||
        // p2Choice === "scissors" && p1Choice === "paper" ||
        // p1Choice === "blank"
    // THEN, call player2Wins();
    // ELSE, call tieGame();
} /// winLossState();

// Increments the variables that apply to a player 1 win.
function player1Wins() {
    // Increment: p1Wins, p2Losses.
    // In Win Panel, display msg: "Player 1 Wins!"
    // call nextRound();
} /// player1Wins();

// Increments the variables that apply to a player 2 win.
function player2Wins() {
// Increment: p2Wins, p1Losses.
    // In Win Panel, display msg: "Player 2 Wins!"
    // call nextRound();
} /// player2Wins();

// When game is tied, display a msg in Win Panel.
function tieGame() {
    // In Win Panel, Display msg: "It's a Tie!"
    // Call nextRound();
} /// tieGame();

// Waits for 3 secs, then increments the round, clears the Win Panel, display a game info message and calls readyBtn();
function nextRound() {
    // Starts a 3 sec. countdown.
    // @ "0":
        // Increment: round.
        // clear text from Win Panel.
        // push game info to gameInfoSection (database)
        // call readyBtn();
} /// nextRound();

// Sets up click functionality, checks the btn data-state: off, partial, full. (refer to research-list.js)
function resetBtn() {
    // On user click:
    // Check [Data-State] attribute for a value of: off, partial, or full.
    // IF, value === "off". THEN, set value to: partial.
        // Change button bg-color to: yellow.
    // IF, value === "partial". THEN set value to: full.
        // Change button bg-color to: green.
        // Call resetGame();

    // Need to prevent one player clicking twice. Using Boolean values??

} /// readyBtn();    

// Clears the required variables on browser/database to reset the game.
function resetGame() {
    // Set variables: p1Wins, p1Losses, p2Wins, p2Losses to a value of 0.
    // Set variable: round to a value of 1.
    // Set readyBtn [data-state] attribute to: off.
        // Change readyBtn bg-color to: gray.
    // Set resetBtn [data-state] attribute to: off.
        // Change resetBtn bg-color to: gray.
    // Change player1Display <img> [data-type] attribute to: blank.
    // Change player2Display <img> [data-type] attribute to: blank.
} /// resetGame();

// Takes in the argument (pChk) and returns a value of: "p1" or "p2", depending on if (pChk) is equal to: "Player 1" or "Player 2"
function whichPlayerToCheck(pChk) {
    // IF, (pChk) === "Player 1"
    // THEN return "p1". ELSE, return "p2"
} /// playerToCheck = whichPlayerToCheck(whichPlayerAmI);

// Checks to see if user is Player 1 or 2, then displays the correct name from the database.
function showPlayerName(pToChk) {
    // IF, (pToChk) === "p1"
    // THEN, get Player 1 value from the (database)
        // $("#player-name").text(THE VALUE OF PLAYER 1 KEY)
    // ELSE, get Player 2 value from the (database)
        // and display at #player-name
} /// showPlayerName(playerToCheck);

// Checks the user's choice and displays that choice in either the Player 1 or 2 Display Panel.
function playerDisplay() {
    // IF, whichPlayerAmI === "Player 1"
    // THEN, using the variable userChoice as a reference, toggle (using a switch statement)
        // the <img> using [data-type] to grab the src from [data-rock],[data-paper],[data-scissors], or [data-blank]; while targeting #player-display1
    // ELSE, Same as above except we target #player-display2 instead.
} /// playerDisplay();


// Chat Area //
// Sets up click functionality, takes text info from text-box and stores it in the proper location in the database.
function chatBtn() {
    // On user click:
    // Assign the value of the text-box into the variable: message.
    // Use PUSH to store the message in the messagesSection part of the (database)
} /// chatBtn();

// Checks the database when (child is added) and refreshes the Chat Area Display.
function chatAreaDisplay() {
    // Anytime a msg string is added to messagesSection in the (database),
    // the Chat Area will update to display the strings (key-values),
    // in sequential order, in the chat area.
} /// chatAreaDisplay();

// Checks the database when (child is added) and refreshes the Game Info Display.
function displayGameInfo() {
    // Anytime a gameInfo string is added to the gameInfoSection in the (database),
    // the game info panel will update to display the strings (key-values),
    // in sequential order, in the game info panel. 
} /// displayGameinfo();


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
            player2Name: ""
        });
    }
} 
//----------------------------------------------------------------------------------------------------//

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

// Main Game Code ////
userAtStartScreen();
hideStartInfo();




});  ///$(document).ready(function() {});
