    $(document).ready(function() {

        var gameOver, outcomeText, targetNumber, playerSum, crysVals, winCount, lossCount, wrappedImages;
        var imgArray = [
        "assets/images/x-blue-200x200.jpg",
        "assets/images/x-purple-200x200.jpg",
        "assets/images/x-round-200x200.jpg",
        "assets/images/x-star-200x200.jpg"
        ];   

        


        // global function declarations =============================

        function initSession() {
            winCount = 0;
            lossCount = 0;
            initGame();
        }

        function updateDisplay() {
            //function to gather and perform all necessary display update commands
            $("#number-to-guess").text(targetNumber); // jQuery selects element w/id number-to-guess, sets its text to targetNumber
            $("#running-total").text(playerSum); // jQuery selects element w/id "#running-total", sets its text to playerSum
            $("#wins-count").text(winCount);
            $("#losses-count").text(lossCount);
            $("#win-lose").html(outcomeText);
        }

        function initGame() {
            $("#play-again").html("");

            gameOver = false;
            outcomeText = "";
            var imgSrc = imgArray[Math.floor(Math.random()*4)];
            
            playerSum = 0; //set global variable holding player's summed crystals values to 0
            targetNumber = (19 + Math.floor(Math.random() * 102)); //global variable, number to guess 19-120, inclusive

            //
            // here we need some code to clear the innerHTML of div w/id="crystals"
            // jQuery selector is going to be $("#crystals")
            // let's use the .empty() method - apparently it's faster than .html("")
            //$("#crystals").empty();
            $("#bs-test").empty();
            //
            // later on we can consider refactoring so as...
            // ...to initialize the persistent aspects of the <img> elements in initSession and...
            // ...only initialize the random number data-value attributes in initGame
            //
            crysVals = []; //create empty array to hold 4 random values for crystals

            for (var i = 0; i < 4; i++) { //loop to initialize 4 image elements with styling, img src, and data-attr to hold random number

                //for each crystal, wrap in a div of col-lg-3
                var crystalDiv = $("<div class='col-lg-3'></div>")
                
                // for each crystal, create an <img> element, get a reference for it
                var imageCrystal = $("<img>");

                // For each <img> element, assign the class ".crystal-image".
                // This is so that we will be able to style all the images together
                imageCrystal.addClass("crystal-image");

                // Each <img> element will be given a src link to the crystal image
                //imageCrystal.attr("src", "http://cdn.playbuzz.com/cdn/35910209-2844-45c0-b099-f4d82878d54f/00261fda-4062-4096-81fd-8cf96b9034e8.jpg");
                //imageCrystal.attr("src", "../images/x-purple-200x200.jpg");
                //imageCrystal.attr("src", "assets/images/x-purple-200x200.jpg"); 
                //var imgSrc = imgArray[Math.floor(Math.random()*4)];
                imageCrystal.attr("src", imgSrc); 

                //each element value will be between 1 and 12, inclusive
                crysVals[i] = (1 + Math.floor(Math.random() * 12));

                // Each <img> element will be given a data attribute called data-crystalValue.
                // This data attribute holds the random number for this crystal
                imageCrystal.attr("data-crystalvalue", crysVals[i]);

                // Add each <img> element to the div with the id "#crystals"
                crystalDiv.append(imageCrystal);
                //$("#bs-test").append(imageCrystal);
                $("#bs-test").append(crystalDiv);


            } //closes the for loop that creates the four <img> elements

            //get reference for wrapped set of <img> elements
            wrappedImages = $(".crystal-image");
            console.log("wrappedImages = " + wrappedImages);

            // This click event will fire if any crystal is clicked
            // It will return the simple <img> element in "this", but not as a jQuery object
            wrappedImages.on("click", namedClickFunction);
            //$(".crystal-image").on("click", function() {


            //initialize the DISPLAY of game state variables
            updateDisplay();
            //$("#number-to-guess").text(targetNumber); // jQuery selects element w/id number-to-guess, sets its text to targetNumber
            //$("#running-total").text(playerSum); // jQuery selects element w/id "#running-total", sets its text to playerSum

            return;

        } //closes the initGame function

        function namedClickHereFunction() {
            initGame();
        }


        function namedClickFunction() {

            console.log("recognized click");
            // Determining the crystal's value requires us to extract the value from the data attribute.
            // Using the $(this) keyword specifies that we should be extracting the crystal value of the clicked crystal.
            // Using the .attr("data-crystalvalue") allows us to grab the value out of the "data-crystalvalue" attribute.
            // Since attributes on HTML elements are strings, we must convert it to an integer before adding to the counter


            //get the random value of the crystal that was actually clicked
            //note that "this" is returned as a simple HTML element, not a jQuery object, so must use "$()"
            var crystalValue = ($(this).attr("data-crystalvalue")); //I think I can get rid of the outer parens

            //the value returned by the .attr() method is a string, so convert to an int
            crystalValue = parseInt(crystalValue);

            // Add the crystalValue to the running sum of the player's guesses, "playerSum", which is a global variable.
            playerSum += crystalValue;

            // All of the same game win-lose logic applies. So the rest remains unchanged.
            //alert("New score: " + playerSum);

            if (playerSum === targetNumber) {
                //alert("You win!");
                outcomeText = "You Win!";
                winCount++;
                gameOver = true;

            } else if (playerSum >= targetNumber) {
                //alert("You lose!!");
                outcomeText = "You Lose!";
                lossCount++;
                gameOver = true;
            } else {
                gameOver = false;
                outcomeText = "";
                //not really necessary to set false here, but more readable and belt and suspenders
            }

            //At this point the player's turn (one click and it's responses) has ended
            updateDisplay(); //reflect changes in game state on page

            if (gameOver) {

                $(".crystal-image").off("click"); //disable click handler until next game begins
                $("#play-again").html("Click Here to Play Again"); // Display message to ask user if they want new game
                $("#play-again").on("click", namedClickHereFunction); // Bind a click handler to the play-again message
            }
        } //this closes the namedClickFunction


        //end global function declarations =============================

        initSession();








    }); //closes the document ready function