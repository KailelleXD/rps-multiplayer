// Variables / Arrays ////

    // Player name info / Helps to determine if Player 1 or 2.
var nameHolder = "";
var playerName1 = "";
var playerName2 = "";

    // Variables that determine what to do based on if a user is Player 1 or 2.
var whichPlayerAmI = ""; // "Player 1" or "Player 2"
var playerToCheck = ""; // "p1" or "p2"

    // Locally stored variable for either player 1 or 2's choice of Rock, Paper, or Scissors.
var p1Choice = "";
var p2Choice = "";

    // Variables to send message and game info strings to the firebase realtime database.
var message = "";
var gameInfo = "";

    // Counters to keep track of wins/losses for each player.
var p1Wins = 0;
var p2Wins = 0;
var p1Losses = 0;
var p2Losses = 0;

    // Round Counter.
var round = 1;

    // Used to determine if the game is currently running already.
var gameState = false;

//___________________________________________////
// References for Firebase Realtime Database ////

// keys ////
    // player1
    // player2
    // player1Choice
    // player2Choice

// Nodes ////
    // messagesSection
    // gameInfoSection

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


//_____________________////
// Function Names List ////

// Start Screen //
    // clearNames();
    // goBtn();
    // noNameCheck();
    // playerName1();
    // setGameScreen();

// Game Area //
    // readyBtn();
    // gameStart();
    // choiceClicks();
    // topPanelStart();
    // playerDefaultCheck();
    // winLossState();
    // player1Wins();
    // player2Wins();
    // tieGame();
    // nextRound();
    // resetBtn();
    // resetGame();
    // whichPlayerToCheck(pChk);
    // showPlayerName(pToChk);
    // playerDisplay();

// Chat Area //
    // chatBtn();
    // chatAreaDisplay();
    // displayGameInfo();

//_____________________////


// Functions____________________////

// Start Screen //
// This function runs on document load and clears the database of any prior used player names.
clearNames() {
    // Assigns the value, "" to the variables: nameHolder, playerName1, playerName2
    // IF, the gameState variable is set to FALSE.
        // THEN, send the above variables to the database.
    // ELSE, inform the user that the game is in session and to please wait.
} /// clearNames();

// Sets up click functionality, and calls the function noNameCheck();
goBtn() {
    // .on Click event listener
    // When user clicks, call noNameCheck();
} /// goBtn();

// Checks to see if a player entered a name or not.
noNameCheck() {
    // Check if text-input field is blank.
    // IF, blank. THEN, inform player to, "Please enter a name."
    // ELSE, place value from text input box into the variable nameHolder
} /// noNameCheck();

// Checks the database to find out if the user is player 1 or player 2 or IF the game is already in progress.
playerName1() {
    // IF, playerName1 key-value is "" (empty).
    // THEN, playerName1 = nameHolder
    // ELSE IF, playerName2 key-value is "" (empty).
    // THEN, playerName2 = nameHolder
    // ELSE, inform the user to, "Please wait. Game in Progress."
} /// playerName1();

// Dynamically generates the game screen.
setGameScreen() {
    // Sets the variable gameState to TRUE.
    // Replaces HTML elements on DOM with HTML to build the game-screen.
        // Add ID="screen" to the <body> tag on index.html?
} /// setGameScreen();


// Game Area //
// Sets up click functionality, checks the btn data-state: off, partial, full. (refer to research-list.js)
readyBtn() {
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
gameStart() {
    // Call topPanelStart();
    // Call choiceClicks();
} /// gameStart();

// Sets up click functionality, for each <img> and stores both player's choices.
choiceClicks() {
    // On user click:
    // Assign the value found in [data-value] attriute to the variable: userChoice.
    // IF, the variable: whichPlayerAmI === "p1"
    // THEN, store the value in the player1Choice key-pair (database)
    // IF, the variable: whichPlayerAmI === "p2"
    // THEN, store the value in the player2Choice key-pair (database)
} /// choiceClicks();

// Starts a countdown to display: ROCK, PAPER, SCISSORS, GO! in the Top Panel Display.
topPanelStart() {
    // Start a 5 sec. countdown.
    // @ "4", display: "ROCK" in Top Panel Display   
    // @ "3", display: "PAPER"
    // @ "2", display: "SCISSORS"
    // @ "1", display: "GO!"
    // @ "0", Call playerDefaultCheck();
} /// topPanelStart();

// Checks to determine if player made a choice within the alotted 1 sec. time frame.
playerDefaultCheck() {
    // IF, userChoice === "blank"
    // THEN, in Game Info Panel, display the variable: whichPlayerAmI + "failed to make a choice in time!" (database)
        // call winLossState();
    // ELSE, call winLossState();
} /// playerDefaultCheck();

// Determines who won/lost and calls the appropriate function.
winLossState() {
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
player1Wins() {
    // Increment: p1Wins, p2Losses.
    // In Win Panel, display msg: "Player 1 Wins!"
    // call nextRound();
} /// player1Wins();

// Increments the variables that apply to a player 2 win.
player2Wins() {
// Increment: p2Wins, p1Losses.
    // In Win Panel, display msg: "Player 2 Wins!"
    // call nextRound();
} /// player2Wins();

// When game is tied, display a msg in Win Panel.
tieGame() {
    // In Win Panel, Display msg: "It's a Tie!"
    // Call nextRound();
} /// tieGame();

// Waits for 3 secs, then increments the round, clears the Win Panel, display a game info message and calls readyBtn();
nextRound() {
    // Starts a 3 sec. countdown.
    // @ "0":
        // Increment: round.
        // clear text from Win Panel.
        // push game info to gameInfoSection (database)
        // call readyBtn();
} /// nextRound();

// Sets up click functionality, checks the btn data-state: off, partial, full. (refer to research-list.js)
resetBtn() {
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
resetGame() {
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
whichPlayerToCheck(pChk) {
    // IF, (pChk) === "Player 1"
    // THEN return "p1". ELSE, return "p2"
} /// playerToCheck = whichPlayerToCheck(whichPlayerAmI);

// Checks to see if user is Player 1 or 2, then displays the correct name from the database.
showPlayerName(pToChk) {
    // IF, (pToChk) === "p1"
    // THEN, get Player 1 value from the (database)
        // $("#player-name").text(THE VALUE OF PLAYER 1 KEY)
    // ELSE, get Player 2 value from the (database)
        // and display at #player-name
} /// showPlayerName(playerToCheck);

// Checks the user's choice and displays that choice in either the Player 1 or 2 Display Panel.
playerDisplay() {
    // IF, whichPlayerAmI === "Player 1"
    // THEN, using the variable userChoice as a reference, toggle (using a switch statement)
        // the <img> using [data-type] to grab the src from [data-rock],[data-paper],[data-scissors], or [data-blank]; while targeting #player-display1
    // ELSE, Same as above except we target #player-display2 instead.
} /// playerDisplay();


// Chat Area //
// Sets up click functionality, takes text info from text-box and stores it in the proper location in the database.
chatBtn() {
    // On user click:
    // Assign the value of the text-box into the variable: message.
    // Use PUSH to store the message in the messagesSection part of the (database)
} /// chatBtn();

// Checks the database when (child is added) and refreshes the Chat Area Display.
chatAreaDisplay() {
    // Anytime a msg string is added to messagesSection in the (database),
    // the Chat Area will update to display the strings (key-values),
    // in sequential order, in the chat area.
} /// chatAreaDisplay();

// Checks the database when (child is added) and refreshes the Game Info Display.
displayGameInfo() {
    // Anytime a gameInfo string is added to the gameInfoSection in the (database),
    // the game info panel will update to display the strings (key-values),
    // in sequential order, in the game info panel. 
} /// displayGameinfo();


//______________________________////
