/*

Start Screen functions

clearNames
// This function runs on document load and clears the database of any prior used player names.

playerName
// This function checks the database to find out if the user is the first player to join.

noNameCheck
// This function checks to see if the player entered a name or not.

goBtn
// This function calls the noNameCheck, playerName, and setGameScreen function.

setGameScreen
// This function dynamically generates the game screen (example: game-screen.html)


Main Game Screen functions

-Game Area

gameStart
// This function calls the necessary functions to start each round.

readyBtn
// This function sets up click functionality for the ready button and checks to see what state the readyBtn is in. (There are 3 states: off, partial, full)
    // off: neither player has clicked the readyBtn.
    // partial: one of the two players has clicked the readyBtn.
    // full: both players have clicked the readyBtn, gameStart function is called.

resetBtn
// This function sets up click functionality for the reset button and checks to see what state the resetBtn is in. (There are 3 states: off, partial, full)
    // off: neither player has clicked the readyBtn.
    // partial: one of the two players has clicked the readyBtn.
    // full: both players have clicked the readyBtn, resetGame function is called.

resetGame
// This function clears any variables and counters on the browser and on the database that is needed to run a fresh game, then calls the gameStart function.

choiceClicks
// This function sets up click functionality for the ROCK PAPER SCISSORS images and stores both players choice each round.

winLossState
// This function determines who won/lost and then increments the appropriate win/loss counters.

topPanelStart
// This function starts a 5 second timer, on counts 4 - 1 it displays ROCK, PAPER, SCISSORS and GO! respectively.
// At '0' it checks to see if both players have made a choice.
    // If a player didn't make a choice, display a message in the game-info-panel.

player1Display
// This function checks the player's choice and displays the appriopriate image in the Player 1 Display Panel.

player2Display
// This function checks the player's choice and displays the appriopriate image in the Player 1 Display Panel.

nextRound
// This function increments the round counter, and calls the gameStart function.

showPlayerName
// This function checks if the user is player 1 or player 2, then pulls the correct Player Name from the database and displays it in the Player Name Panel.


-Chat Area

chatBtn
// This function sets up click functionality for the div.
// It also takes the text information from the adjacent textbox and sends that the to appropriate location in the database.

chatAreaDisplay
// This function checks the database when (a child is added?) and refreshes the Chat Area Display.

displayGameInfo
// This function checks the database when (a child is added?) and refreshes the Game Info Display.

*/

