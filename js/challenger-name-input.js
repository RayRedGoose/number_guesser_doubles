var submitButton = document.querySelector('#submit-button');

submitButton.addEventListener('click', function(event){
  event.preventDefault();

  // inputs vars
  var nameOneInput = document.querySelector('#name-challenger-1');
  var nameTwoInput = document.querySelector('#name-challenger-2');
  var guessOneInput = document.querySelector('#guess-1');
  var guessTwoInput = document.querySelector('#guess-2');

  // input values vars
  var nameOneValue = nameOneInput.value;
  var nameTwoValue = nameTwoInput.value;
  var guessOneValue = guessOneInput.value;
  var guessTwoValue = guessTwoInput.value;

  // ***VALIDATION OF CHELLENGER FORM***

  //parameters for validation
  var numbers = /^[0-9]+$/;
  var letters = /^[0-9a-zA-Z]+$/;

  // error blocks
  var errorBoxes = document.querySelectorAll('.error');
  console.log(errorBoxes);
  var errorContent = "<img class='error-icon' src='images/error-icon.svg' alt='error-icon'>";
  var errorAll = "<p class='error-text'>Enter name and guess</p>";
  var errorName = "<p class='error-text'>Enter name</p>";
  var errorNameVal = "<p class='error-text'>Name must have only alpha-numeric symbols</p>";
  var errorGuess = "<p class='error-text'>Enter guess</p>";
  var errorGuessVal = "<p class='error-text'>Guess must have only numeric symbols</p>";


  if (nameOneValue != "" || nameTwoValue != "" || guessOneValue != "" || guessTwoValue != "") {

    if(nameOneValue.match(letters) && nameTwoValue.match(letters)) {


      if(guessOneValue.match(numbers) && guessTwoValue.match(numbers)) {
        var nameOnePlace = document.querySelectorAll('.name-one');
        var nameTwoPlace = document.querySelectorAll('.name-two');
        var guessOnePlace = document.querySelectorAll('.guess-one');
        var guessTwoPlace = document.querySelectorAll('.guess-two');

        for (var i = 0; i < nameOnePlace.length; i++) {
          nameOnePlace[i].innerText = nameOneValue;
        }

        for (var i = 0; i < nameTwoPlace.length; i++) {
          nameTwoPlace[i].innerText = nameTwoValue;
        }

        for (var i = 0; i < guessOnePlace.length; i++) {
          guessOnePlace[i].innerText = guessOneValue;
        }

        for (var i = 0; i < guessTwoPlace.length; i++) {
          guessTwoPlace[i].innerText = guessTwoValue;
        }

      } else {

        // error if guess inputs are not numeric types

        if (!guessOneValue.match(numbers) && !guessTwoValue.match(numbers)) {

          // error if both guess inputs are not numeric types

          errorBoxes[2].innerHTML = errorContent + errorGuessVal;
          errorBoxes[3].innerHTML = errorContent + errorGuessVal;

          guessOneInput.classList.add('error-input');
          guessTwoInput.classList.add('error-input');

        } else if (!guessOneValue.match(numbers)) {

          // error if challenger 1 guess input is not numeric types

          errorBoxes[2].innerHTML = errorContent + errorGuessVal;

          guessOneInput.classList.add('error-input');

        } else if (!guessTwoValue.match(numbers)) {

          // error if challenger 2 guess input is not numeric types

          errorBoxes[3].innerHTML = errorContent + errorGuessVal;

          guessTwoInput.classList.add('error-input');

        }

      }

    } else {

      if (!nameOneValue.match(letters) && !nameTwoValue.match(letters)) {

        // errors if both names are not alpha-numeric types

        errorBoxes[2].innerHTML = errorContent + errorNameVal;
        errorBoxes[3].innerHTML = errorContent + errorNameVal;

        nameOneInput.classList.add('error-input');
        nameTwoInput.classList.add('error-input');

      } else if (!nameOneValue.match(letters)) {

        // errors if challenger 1 name is not alpha-numeric type

        errorBoxes[2].innerHTML = errorContent + errorNameVal;

        nameOneInput.classList.add('error-input');

      } else if (!nameTwoValue.match(letters)) {

        // errors if challenger 2 name is not alpha-numeric type

        errorBoxes[3].innerHTML = errorContent + errorNameVal;

        nameTwoInput.classList.add('error-input');

      }

    }

  } else {

    //error if all or some inputs are empty

    if (nameOneValue == "" && nameTwoValue == "" && guessOneValue == "" && guessTwoValue == "") {

      // errors if all inputs are empty

      errorBoxes[2].innerHTML = errorContent + errorAll;
      errorBoxes[3].innerHTML = errorContent + errorAll;

      nameOneInput.classList.add('error-input');
      nameTwoInput.classList.add('error-input');
      guessOneInput.classList.add('error-input');
      guessTwoInput.classList.add('error-input');

    } else if (nameOneValue == "" && nameTwoValue) {

      // errors if name inputs are empty

      errorBoxes[2].innerHTML = errorContent + errorName;
      errorBoxes[3].innerHTML = errorContent + errorName;

      nameOneInput.classList.add('error-input');
      nameTwoInput.classList.add('error-input');

    } else if (guessOneValue == "" && guessTwoValue != "") {

      // errors if guess inputs are empty

      errorBoxes[2].innerHTML = errorContent + errorGuess;
      errorBoxes[3].innerHTML = errorContent + errorGuess;

      guessOneInput.classList.add('error-input');
      guessTwoInput.classList.add('error-input');

    } else if (nameOneValue == "") {

      // errors if challenger 1 name input is empty

      errorBoxes[2].innerHTML = errorContent + errorName;

      nameOneInput.classList.add('error-input');

    } else if (nameTwoValue == "") {

      // errors if challenger 2 name input is empty

      errorBoxes[3].innerHTML = errorContent + errorName;

      nameTwoInput.classList.add('error-input');

    } else if (guessOneValue == "") {

      // errors if challenger 1 guess input is empty

      errorBoxes[2].innerHTML = errorContent + errorGuess;

      guessOneInput.classList.add('error-input');

    } else if (guessTwoValue == "") {

      // errors if challenger 2 guess input is empty

      errorBoxes[3].innerHTML = errorContent + errorGuess;

      guessTwoInput.classList.add('error-input');

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
