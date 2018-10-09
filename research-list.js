//_____________________________________________________________________________________________
//Is there a method to clear the values of specific key value pairs within firebase realtime database?

    .remove() <-- If my understanding is correct, if I use this on a node it will remove all child elements as well?


//_____________________________________________________________________________________________
//Refresh - How to use the .css jQuery method to change the display to hidden. How do I unhide? .clear()??

    .hide() and .show() will remove and then re-add an element.
    If the above doesn't work, Then try using .css method.


//_____________________________________________________________________________________________
//Refresh - How to toggle/cycle between images using data-state and data-* (for different img sources) (reference the giphy-app in code-projects folder)

    example:
    <img src="assets/images/blank.jpg" 
        data-rock="assets/images/rock.jpg" 
        data-paper="assets/images/paper.jpg" 
        data-scissors="assets/images/scissors.jpg" 
        data-blank="assets/images/blank.jpg" 
        data-state="blank" class="user-choices">

    $(document).on("click", ".user-choices", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element.
        var state = $(this).attr("data-state");
        
        // Switch statement to cycle through RPS images. B>R>P>S>Repeat
        switch(state) {
            case "blank":
                $(this).attr("src", $(this).attr("data-rock"));
                $(this).attr("data-state", "rock");
            break;

            case "rock":
                $(this).attr("src", $(this).attr("data-paper"));
                $(this).attr("data-state", "paper");
            break;

            case "paper":
                $(this).attr("src", $(this).attr("data-scissors"));
                $(this).attr("data-state", "scissors");
            break;

            case "scissors":
                $(this).attr("src", $(this).attr("data-blank"));
                $(this).attr("data-state", "blank");
            break;

        }
    })


//_____________________________________________________________________________________________
//Firebase realtime database, how to (set, view/display data, and push) to the database to auto-generate key value pairs. (for Chat Area and Chat Info Panel)


[SET]________________________________________
var database = firebase.database();

var name = "Stevo";
var email = "Stevo@stevo.com";
var age = "37";
var comment = "Hello World!";

database.ref().set({
    name: name,
    email: email,
    age: age,
    comment: comment
});

    [VIEW/DISPLAY DATA]__________________________
    // Firebase watcher + initial loader .on("value")
    database.ref().on("value", function(snapshot) {

        // Log everything that's coming out of snapshot
        console.log(snapshot.val());
        console.log(snapshot.val().name);
        console.log(snapshot.val().email);
        console.log(snapshot.val().age);
        console.log(snapshot.val().comment);

        // Change the HTML to reflect
        $("#name-display").text(snapshot.val().name);
        $("#email-display").text(snapshot.val().email);
        $("#age-display").text(snapshot.val().age);
        $("#comment-display").text(snapshot.val().comment);

        // Handle the errors
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });



[PUSH]_______________________________________
var database = firebase.database();

var name = "Stevo";
var email = "Stevo@stevo.com";
var age = "37";
var comment = "Hello World!";

database.ref().push({
    name: name,
    email: email,
    age: age,
    comment: comment,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
});

    [VIEW/DISPLAY DATA]__________________________
    // Firebase watcher .on("child_added"
    database.ref().on("child_added", function(snapshot) {
        // storing the snapshot.val() in a variable for convenience
        var sv = snapshot.val();

        // Console.loging the last user's data
        console.log(sv.name);
        console.log(sv.email);
        console.log(sv.age);
        console.log(sv.comment);

        // Change the HTML to reflect
        $("#name-display").text(sv.name);
        $("#email-display").text(sv.email);
        $("#age-display").text(sv.age);
        $("#comment-display").text(sv.comment);

        // Handle the errors
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });


//_____________________________________________________________________________________________
