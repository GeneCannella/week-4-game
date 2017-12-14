    $(document).ready(function() {

        var targetNumber, playerSum, crysVals;

        function initGame() {
            playerSum = 0; //set global variable holding player's summed crystals values to 0
            targetNumber = (19 + Math.floor(Math.random() * 102)); //global variable, number to guess 19-120, inclusive
            crysVals = []; //create empty array to hold 4 random values for crystals

            for (var i = 0; i < 4; i++) { //loop to initialize 4 image elements with styling, img src, and data-attr to hold random number

                // for each crystal, create an <img> element, get a reference for it
                var imageCrystal = $("<img>");

                // For each <img> element, assign the class ".crystal-image".
                // This is so that we will be able to style all the images together
                imageCrystal.addClass("crystal-image");

                // Each <img> element will be given a src link to the crystal image
                imageCrystal.attr("src", "http://cdn.playbuzz.com/cdn/35910209-2844-45c0-b099-f4d82878d54f/00261fda-4062-4096-81fd-8cf96b9034e8.jpg");

                //each element value will be between 1 and 12, inclusive
                crysVals[i] = (1 + Math.floor(Math.random() * 12));

                // Each <img> element will be given a data attribute called data-crystalValue.
                // This data attribute holds the random number for this crystal
                imageCrystal.attr("data-crystalvalue", crysVals[i]);

                // Add each <img> element to the div with the id "#crystals"
                $("#crystals").append(imageCrystal);


            }

            $("#number-to-guess").text(targetNumber); //jQuery selects element w/id number-to-guess, sets its text to targetNumber



            return;
        }

        initGame();

        // This click event will fire if any crystal is clicked
        // It will return the simple <img> element in "this", but not as a jQuery object
        $(".crystal-image").on("click", function() {

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
            alert("New score: " + playerSum);

            if (playerSum === targetNumber) {
                alert("You win!");
            } else if (playerSum >= targetNumber) {
                alert("You lose!!");
            }

        }); //closes the .on("click") function


    }); //closes the document ready function