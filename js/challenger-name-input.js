var submitButton = document.querySelector('#submit-button');
var clearButton = document.querySelector('#clear-button');
var resetButton = document.querySelector('#reset-button');
var updateButton = document.querySelector('#update-button');

var forms = document.querySelectorAll('form');
var inputs = document.querySelectorAll('input');
var errorBoxes = document.querySelectorAll('.error');

var winners = [];

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

  class Challenger {
    constructor(namePath, guessPath, namePlaces, guessPlace, resultPlace) {
      this.namePath = namePath;
      this.guessPath = guessPath;
      this.name = namePath.value;
      this.guessString = guessPath.value
      this.guess = parseInt(this.guessString, 10);
      this.namePlaces = namePlaces;
      this.guessPlace = guessPlace;
      this.resultPlace = resultPlace;
    }

  }

  var challengerOne = new Challenger(document.querySelector('#name-challenger-1'), document.querySelector('#guess-1'), document.querySelectorAll('.name-one'), document.querySelector('.guess-one'), document.querySelector('#challenger-one-result'));

  var challengerTwo = new Challenger(document.querySelector('#name-challenger-2'), document.querySelector('#guess-2'), document.querySelectorAll('.name-two'), document.querySelector('.guess-two'), document.querySelector('#challenger-two-result'));

  // inputs vars

  var minRange = parseInt(document.querySelector('#post-min-range').innerText, 10);
  var maxRange = parseInt(document.querySelector('#post-max-range').innerText, 10);

  // ***VALIDATION OF CHELLENGER FORM***

  //parameters for validation
  var letters = /^[0-9a-zA-Z]+$/;

  // error blocks
  var errorAll = "<p class='error-text'>Enter name and guess</p>";
  var errorName = "<p class='error-text'>Enter name</p>";
  var errorNameVal = "<p class='error-text'>Name must have only alpha-numeric symbols</p>";
  var errorGuess = "<p class='error-text'>Enter guess</p>";
  var errorGuess = "<p class='error-text'>Guess is not number</p>";
  var errorGuessVal = "<p class='error-text'>Guess must have only numeric symbols</p>";
  var errorOutRange = "<p class='error-text'>Guess must be within range</p>";

  if (challengerOne['name'] != "" && challengerTwo['name'] != "" && challengerOne['guessString']  != "" && challengerTwo['guessString'] != "") {

    if(challengerOne['name'].match(letters) && challengerTwo['name'].match(letters)) {

      if (((minRange < challengerOne['guess'] || challengerOne['guess'] == minRange) && (maxRange > challengerOne['guess'] || challengerOne['guess'] == maxRange) && (minRange < challengerTwo['guess'] || challengerTwo['guess'] == minRange) && (maxRange > challengerTwo['guess'] || challengerTwo['guess'] == maxRange))) {

        //make reset and clear buttons dark grey
        activateButton();

        // place input values to spots
        replaceTextToArray(challengerOne['namePlaces'], challengerOne['name']);
        replaceTextToArray(challengerTwo['namePlaces'], challengerTwo['name']);

        replaceOnce(challengerOne['guessPlace'], challengerOne['guess']);
        replaceOnce(challengerTwo['guessPlace'], challengerTwo['guess']);

        // create random number
        var randomNumber = Math.round(minRange - 0.5 + Math.random() * (maxRange - minRange + 1));
        var guessesPlaces = document.querySelectorAll('.guesses-number')

        // place random number to card
        replaceTextToArray(guessesPlaces, randomNumber);


        // place results

        placeResults(challengerOne, challengerTwo, randomNumber);

        // *** GAME ***

        //***WINNERS***

        var winnerNamePlace = document.querySelector('.winner-name');
        var minutesNumberPlaces = document.querySelectorAll('.minutes-number');

        function winnerStuff(name, resultPlace) {
          winnerNamePlace.innerText = name;

          addWinners(winners, name);

          const end = new Date().getTime();
          var gameTime = parseInt(((end - start) / 6000) * 100)/100;

          replaceTextToArray(minutesNumberPlaces, gameTime);

          if (minRange > 10) {

            minRange = minRange + 10;
            maxRange = maxRange + 10;

          } else {

            maxRange = maxRange + 10;

          }

          console.log(minRange, maxRange);

        }

        if (challengerOne['guess'] == randomNumber) {

          winnerStuff(challengerOne['name'], challengerOne['resultPlace']);


        } else if (challengerTwo['guess'] == randomNumber) {

          winnerStuff(challengerTwo['name'], challengerTwo['resultPlace']);

        }

      } else {

        if ((challengerOne['guess'] < minRange) && (challengerTwo['guess'] < minRange)) {

          showErrors(1, challengerOne['guessPath'], errorOutRange);
          showErrors(2, challengerTwo['guessPath'], errorOutRange);

        } else if ((maxRange < challengerOne['guess']) && (maxRange < challengerTwo['guess'])) {

          showErrors(1, challengerOne['guessPath'], errorOutRange);
          showErrors(2, challengerTwo['guessPath'], errorOutRange);

        } else if ((challengerOne['guess'] < minRange) || (maxRange < challengerOne['guess'])) {

          showErrors(1, challengerOne['guessPath'], errorOutRange);

        } else if ((challengerTwo['guess'] < minRange) || (maxRange < challengerTwo['guess'])) {

          showErrors(2, challengerTwo['guessPath'], errorOutRange);

        }

      }

    } else {

      if (!challengerOne['name'].match(letters) && !challengerTwo['name'].match(letters)) {

        // errors if both names are not alpha-numeric types

        showErrors(1, challengerOne['namePath'], errorNameVal);
        showErrors(2, challengerTwo['namePath'], errorNameVal);

      } else if (!challengerOne['name'].match(letters)) {

        // error if challenger 1 name is not alpha-numeric type

        showErrors(1, challengerOne['namePath'], errorNameVal);

      } else if (!challengerTwo['name'].match(letters)) {

        // errors if challenger 2 name is not alpha-numeric type

        showErrors(2, challengerTwo['namePath'], errorNameVal);

      }

    }

  } else {

    //error if all or some inputs are empty

    if (challengerOne['name'] == "" && challengerTwo['name'] == "" && challengerOne['guessString'] == "" && challengerTwo['guessString'] == "") {

      // errors if all inputs are empty

      showErrors(1, challengerOne['namePath'], errorAll);
      showErrors(2, challengerTwo['namePath'], errorAll);

      challengerOne['guessPath'].classList.add('error-input');
      challengerTwo['guessPath'].classList.add('error-input');

    } else if (challengerOne['name'] == "" && challengerOne['guessString'] == "") {

      // errors if all first inputs are empty

      showErrors(1, challengerOne['namePath'], errorAll);

      challengerOne['guessPath'].classList.add('error-input');

    } else if (challengerTwo['name'] == "" && challengerTwo['guessString'] == "") {

      // errors if all second inputs are empty

      showErrors(2, challengerTwo['namePath'], errorAll);

      challengerTwo['guessPath'].classList.add('error-input');

    } else if (challengerOne['name'] == "" && challengerTwo['name']) {

      // errors if name inputs are empty

      showErrors(1, challengerOne['namePath'], errorName);
      showErrors(2, challengerTwo['namePath'], errorName);

    } else if (challengerOne['guessString'] == "" && challengerTwo['guessString'] != "") {

      // errors if guess inputs are empty

      showErrors(1, challengerOne['guessPath'], errorGuess);
      showErrors(2, challengerTwo['guessPath'], errorGuess);

    } else if (challengerOne['name'] == "") {

      // errors if challenger 1 name input is empty

      showErrors(1, challengerOne['namePath'], errorName);

    } else if (challengerTwo['name'] == "") {

      // errors if challenger 2 name input is empty

      showErrors(2, challengerTwo['namePath'], errorName);

    } else if (challengerTwo['guessString'] == "") {

      // errors if challenger 1 guess input is empty

      showErrors(1, challengerOne['guessPath'], errorGuess);

    } else if (challengerTwo['guess'] == "") {

      // errors if challenger 2 guess input is empty

      showErrors(2, challengerTwo['guessPath'], errorGuess);

    }

  }

  // remove error style on click

  var challengerInputs = [challengerOne['namePath'], challengerTwo['namePath'], challengerOne['guessPath'], challengerTwo['guessPath']];

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

};

function activateButton() {

  clearButton.classList.add('button--dark-grey');
  clearButton.classList.remove('button--light-grey');

  resetButton.classList.add('button--dark-grey');
  resetButton.classList.remove('button--light-grey');

};

function replaceTextToArray(array, value) {

  for (var i = 0; i < array.length; i++) {

    array[i].innerText = value;

  };

};

function replaceOnce(place, value) {

  place.innerText = value;

}

function showErrors(index, inputPath, error) {

  var errorContent = "<img class='error-icon' src='images/error-icon.svg' alt='error-icon'>";

  errorBoxes[index].style.display = 'flex';
  errorBoxes[index].innerHTML = errorContent + error;

  inputPath.classList.add('error-input');

};

function addWinners(array, value) {

  if (array.length < 4) {

    array.push(value);

  } else {

    array.shift();
    array.push(value);

  }
}

function placeResults(challengerOne, challengerTwo, randomNumber) {

  if (challengerOne['guess'] < randomNumber) {

    replaceOnce(challengerOne['resultPlace'], "that's too low!");

  } else if (challengerOne['guess'] > randomNumber) {

    replaceOnce(challengerOne['resultPlace'], "that's too high!");

  }

  if (challengerTwo['guess'] < randomNumber) {

    replaceOnce(challengerTwo['resultPlace'], "that's too low!");

  } else if (challengerTwo['guess'] > randomNumber) {

    replaceOnce(challengerTwo['resultPlace'], "that's too high!");

  }

  if (challengerOne['guess'] == randomNumber) {

    replaceOnce(challengerOne['resultPlace'], "BOOM!");

  } else if (challengerTwo['guess'] == randomNumber) {

    replaceOnce(challengerTwo['resultPlace'], "BOOM!");

  }
}

function changeMaxAndMin(minRange, maxRange) {



}
