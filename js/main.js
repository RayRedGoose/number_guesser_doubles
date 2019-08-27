

// Global Variables

var submitButton = document.querySelector('#submit-button');
var clearButton = document.querySelector('#clear-button');
var resetButton = document.querySelector('#reset-button');
var updateButton = document.querySelector('#update-button');

// Function for retrieving user input (Min and Max Range values) and for posting them in the second article of the left-section //

updateButton.addEventListener("click", function(event) {
  event.preventDefault();

  var getMinRangeValue = document.querySelector('#get-min-range').value;
  var postMinRangeValue = document.querySelector('#post-min-range');
  var getMaxRangeValue = document.querySelector('#get-max-range').value;
  var postMaxRangeValue = document.querySelector('#post-max-range');
  var selectMinRangeId = document.querySelector('#get-min-range')
  var selectMaxRangeId = document.querySelector('#get-max-range')
  var errorBoxes = document.querySelectorAll('.error');
  var errorContent = "<img class='error-icon' src='images/error-icon.svg' alt='error-icon'>";
  var errorNumber = "<p class='error-text'>Enter number</p>";
  var errorComparison = "<p class='error-text'>The Min range value must be less than the Max value</p>"

  // Function for displaying error content per conditional failures.

  function showErrors(index, inputPath, error) {

    errorBoxes[index].style.display = 'flex';

    errorBoxes[index].innerHTML = errorContent + error;

    inputPath.classList.add('error-input');
  }

  // Beginning of conditionals involving empty-field validation

  if (getMinRangeValue != "" && getMaxRangeValue != "") {

    // Beginning of conditionals involving integer min < max comparison validation

    if (parseInt(getMinRangeValue, 10) < parseInt(getMaxRangeValue, 10)) {

      postMinRangeValue.innerText = getMinRangeValue;

      postMaxRangeValue.innerText = getMaxRangeValue;

      // Section within function(which involves another function) that generates the random "Winning" number

      function randomNumber(min, max) {

        let rand = min - 0.5 + Math.random() * (max - min + 1);

        return Math.round(rand);
      };

      var randomIntegerValue = randomNumber(getMinRangeValue, getMaxRangeValue);

      random = randomIntegerValue;

    } else if (parseInt(getMinRangeValue, 10) > parseInt(getMaxRangeValue, 10)) {

        showErrors(0, selectMinRangeId, errorComparison);

        showErrors(0, selectMaxRangeId, errorComparison);
      }

    } else if (getMinRangeValue == "" && getMaxRangeValue == "") {

        showErrors(0, selectMinRangeId, errorNumber);

        showErrors(0, selectMaxRangeId, errorNumber);

        } else if (getMinRangeValue == "") {

          showErrors(0, selectMinRangeId, errorNumber);

        } else if (getMaxRangeValue == "") {

          showErrors(0, selectMaxRangeId, errorNumber);
        }
    });



    var forms = document.querySelectorAll('form');
    var inputs = document.querySelectorAll('input');
    var errorBoxes = document.querySelectorAll('.error');

    clearButton.addEventListener('click', function() {

      clearForms();

      disableButton();

    });

    resetButton.addEventListener('click', function() {

      var randomNumber = Math.round(parseInt(document.querySelector('#get-min-range').value, 10) - 0.5 + Math.random() * (parseInt(document.querySelector('#get-max-range').value, 10) - parseInt(document.querySelector('#get-min-range').value, 10) + 1));

      clearForms();

      disableButton();

    });

    submitButton.addEventListener('click', function(event){
      event.preventDefault();
      const start = new Date().getTime();

      // inputs vars

      var nameOneInput = document.querySelector('#name-challenger-1');
      var nameTwoInput = document.querySelector('#name-challenger-2');
      var guessOneInput = document.querySelector('#guess-1');
      var guessTwoInput = document.querySelector('#guess-2');

      // input values vars

      var nameOneValue = nameOneInput.value;
      var nameTwoValue = nameTwoInput.value;
      var guessOneValue = parseInt(guessOneInput.value, 10);
      var guessTwoValue = parseInt(guessTwoInput.value, 10);
      var minRange = parseInt(document.querySelector('#get-min-range').value, 10);
      var maxRange = parseInt(document.querySelector('#get-max-range').value, 10);

      var nameOnePlace = document.querySelectorAll('.name-one');
      var nameTwoPlace = document.querySelectorAll('.name-two');
      var guessOnePlace = document.querySelectorAll('.guess-one');
      var guessTwoPlace = document.querySelectorAll('.guess-two');

      // ***VALIDATION OF CHALLENGER FORM***

      //parameters for validation

      var letters = /^[0-9a-zA-Z]+$/;

      // error blocks

      var errorBoxes = document.querySelectorAll('.error');
      var errorContent = "<img class='error-icon' src='images/error-icon.svg' alt='error-icon'>";
      var errorAll = "<p class='error-text'>Enter name and guess</p>";
      var errorName = "<p class='error-text'>Enter name</p>";
      var errorNameVal = "<p class='error-text'>Name must have only alpha-numeric symbols</p>";
      var errorGuess = "<p class='error-text'>Enter guess</p>";
      var errorGuess = "<p class='error-text'>Guess is not number</p>";
      var errorGuessVal = "<p class='error-text'>Guess must have only numeric symbols</p>";
      var errorOutRange = "<p class='error-text'>Guess must be within range</p>";

      function showErrors(index, inputPath, error) {

        errorBoxes[index].style.display = 'flex';
        errorBoxes[index].innerHTML = errorContent + error;

        inputPath.classList.add('error-input');

      };

      function replaceTextToArray(array, value) {

        for (var i = 0; i < array.length; i++) {
          array[i].innerText = value;
        };

      };

      if (nameOneValue != "" && nameTwoValue != "" && guessOneInput.value != "" && guessTwoInput.value != "") {

        if(nameOneValue.match(letters) && nameTwoValue.match(letters)) {

          if (((minRange < guessOneValue || guessOneValue == minRange) && (maxRange > guessOneValue || guessOneValue == maxRange) && (minRange < guessTwoValue || guessTwoValue == minRange) && (maxRange > guessTwoValue || guessTwoValue == maxRange))) {

            activateButton();

            replaceTextToArray(nameOnePlace, nameOneValue);
            replaceTextToArray(nameTwoPlace, nameTwoValue);
            replaceTextToArray(guessOnePlace, guessOneValue);
            replaceTextToArray(guessTwoPlace, guessTwoValue);

            var randomNumber = Math.round(minRange - 0.5 + Math.random() * (maxRange - minRange + 1));
            var guessesPlaces = document.querySelectorAll('.guesses-number')

            replaceTextToArray(guessesPlaces, randomNumber);

            var resultOne = document.querySelector('#challenger-one-result');
            var resultTwo = document.querySelector('#challenger-two-result');

            // *** GAME ***

            if (guessOneValue < randomNumber) {

              resultOne.innerText = "that's too low!"

            } else if (guessOneValue > randomNumber) {

              resultOne.innerText = "that's too high!"

            }

            if (guessTwoValue < randomNumber) {

              resultTwo.innerText = "that's too low!"

            } else if (guessTwoValue > randomNumber) {

              resultTwo.innerText = "that's too high!"

            }

            //***WINNERS***

            var winnerNames = document.querySelectorAll('.winner-name');
            var minutesNumberPlaces = document.querySelectorAll('.minutes-number');

              // Austen's variables for HTML insertion upon WIN trigger



              //End Austen's code blocks

            if (guessOneValue == randomNumber) {

              alert('BOOM!');
              resultOne.innerText = "Match!";
              insertCard();

              replaceTextToArray(winnerNames, nameOneValue);

              const end = new Date().getTime();
              var gameTime = parseInt(((end - start) / 6000) * 100)/100;

              replaceTextToArray(minutesNumberPlaces, gameTime);

            } else if (guessTwoValue == randomNumber) {

              alert('BOOM!');
              resultTwo.innerText = "Match!"
              insertCard();

              replaceTextToArray(winnerNames, nameTwoValue);

              const end = new Date().getTime();
              var gameTime = parseInt(((end - start) / 6000) * 100)/100;

              replaceTextToArray(minutesNumberPlaces, gameTime);

            } else {

              replaceTextToArray(winnerNames, "No");

            }

          } else {

            if ((guessTwoValue < minRange) && (guessOneValue < minRange)) {

              showErrors(1, guessOneInput, errorOutRange);
              showErrors(2, guessTwoInput, errorOutRange);

            } else if ((maxRange < guessOneValue) && (maxRange < guessTwoValue)) {

              showErrors(1, guessOneInput, errorOutRange);
              showErrors(2, guessTwoInput, errorOutRange);

            } else if ((guessOneValue < minRange) || (maxRange < guessOneValue)) {

              showErrors(1, guessOneInput, errorOutRange);

            } else if ((guessTwoValue < minRange) || (maxRange < guessTwoValue)) {

              showErrors(2, guessTwoInput, errorOutRange);

            }

          }

        } else {

          if (!nameOneValue.match(letters) && !nameTwoValue.match(letters)) {

            // errors if both names are not alpha-numeric types

            showErrors(1, nameOneInput, errorNameVal);
            showErrors(2, nameTwoInput, errorNameVal);

          } else if (!nameOneValue.match(letters)) {

            // error if challenger 1 name is not alpha-numeric type

            showErrors(1, nameOneInput, errorNameVal);

          } else if (!nameTwoValue.match(letters)) {

            // errors if challenger 2 name is not alpha-numeric type

            showErrors(2, nameTwoInput, errorNameVal);

          }

        }

      } else {

        //error if all or some inputs are empty

        if (nameOneValue == "" && nameTwoValue == "" && guessOneInput.value == "" && guessTwoInput.value == "") {

          // errors if all inputs are empty

          showErrors(1, nameOneInput, errorAll);
          showErrors(2, nameTwoInput, errorAll);

          guessOneInput.classList.add('error-input');
          guessTwoInput.classList.add('error-input');

        } else if (nameOneValue == "" && guessOneInput.value == "") {

          // errors if all first inputs are empty

          showErrors(1, nameOneInput, errorAll);

          guessOneInput.classList.add('error-input');

        } else if (nameTwoValue == "" && guessTwoInput.value == "") {

          // errors if all second inputs are empty

          showErrors(2, nameTwoInput, errorAll);

          guessTwoInput.classList.add('error-input');

        } else if (nameOneValue == "" && nameTwoValue) {

          // errors if name inputs are empty

          showErrors(1, nameOneInput, errorName);
          showErrors(2, nameTwoInput, errorName);

        } else if (guessOneInput.value == "" && guessTwoInput.value != "") {

          // errors if guess inputs are empty

          showErrors(1, guessOneInput, errorGuess);
          showErrors(2, guessTwoInput, errorGuess);

        } else if (nameOneValue == "") {

          // errors if challenger 1 name input is empty

          showErrors(1, nameOneInput, errorName);

        } else if (nameTwoValue == "") {

          // errors if challenger 2 name input is empty

          showErrors(2, nameTwoInput, errorName);

        } else if (guessOneInput.value == "") {

          // errors if challenger 1 guess input is empty

          showErrors(1, guessOneInput, errorGuess);

        } else if (guessTwoValue == "") {

          // errors if challenger 2 guess input is empty

          showErrors(2, guessTwoInput, errorGuess);

        }

      }

      // remove error style on click

      var challengerInputs = [nameOneInput, nameTwoInput, guessOneInput, guessTwoInput];

      for (var i = 0; i < challengerInputs.length; i++) {

        challengerInputs[i].addEventListener('click', function() {

          for (var i = 0; i < challengerInputs.length; i++) {

            challengerInputs[i].classList.remove('error-input');

          }

          this.classList.remove('error-input');

          for (var i = 0; i < errorBoxes.length; i++) {

            errorBoxes[i].style.display = 'none';

          }

        });
      }

    });

    function clearForms() {

      for (var i = 0; i < forms.length; i++) {

        forms[i].reset();

      };

      for (var i = 0; i < inputs.length; i++) {

        inputs[i].classList.remove('error-input');

      };

      for (var i = 0; i < errorBoxes.length; i++) {

        errorBoxes[i].style.display = 'none';

      };

    };

    for (var i = 0; i < inputs.length; i++) {

      inputs[i].addEventListener('input', function() {

        clearButton.classList.add('button--dark-grey');
        clearButton.classList.remove('button--light-grey');

      });

    };

    function disableButton() {

      clearButton.classList.remove('button--dark-grey');
      clearButton.classList.add('button--light-grey');

      resetButton.classList.remove('button--dark-grey');
      resetButton.classList.add('button--light-grey');

    }

    function activateButton() {

      clearButton.classList.add('button--dark-grey');
      clearButton.classList.remove('button--light-grey');

      resetButton.classList.add('button--dark-grey');
      resetButton.classList.remove('button--light-grey');

    }

    function insertCard() {
      var insertArticle = document.createElement("div");
      insertArticle.classList.add('winner-card');
      document.querySelector('.section-right').appendChild(insertArticle);
      insertArticle.innerHTML =
      `
        <header class="header-card">
          <span class="name-one header-name">Challenger 1 name</span>
          <p class="vs"> vs </p>
          <span class="name-two header-name">Challenger 2 name</span>
         </header>
        <div class="winner-wrapper">
          <p class="winner-name">--</p>
        </div>
        <footer class="footer-card">
            <p class="guesses-number">--</p>
            <p class="minutes-number">--</p>
            <img class="footer-delete-icon" src="images/delete-icon.svg" width="350" />
        </footer>
      `
    }
