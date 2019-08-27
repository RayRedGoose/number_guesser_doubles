// *** GLOBAL VARIABLES ***

// buttons
var submitButton = document.querySelector('#submit-button');
var clearButton = document.querySelector('#clear-button');
var resetButton = document.querySelector('#reset-button');
var updateButton = document.querySelector('#update-button');
// often used element
var forms = document.querySelectorAll('form');
var inputs = document.querySelectorAll('input');
var errorBoxes = document.querySelectorAll('.error');
var cards = document.querySelectorAll('.winner-card');
var sectionRight = document.querySelector('.section-right');
sectionRight.addEventListener('click', removeWinnerCard);
// arrays
var arrayData = {
  winners: [],
  guesses: [],
  minutes: [],
  challengersOne: [],
  challengersTwo: []
};

// Function for retrieving user input (Min and Max Range values) and for posting them in the second article of the left-section //
updateButton.addEventListener("click", function(event) {
  event.preventDefault();
  // *** VARIABLES ***
  //inputs and outputs variables
  var selectMinRangeId = document.querySelector('#get-min-range');
  var selectMaxRangeId = document.querySelector('#get-max-range');
  var postMinRangeValue = document.querySelector('#post-min-range');
  var postMaxRangeValue = document.querySelector('#post-max-range');
  // input values variables
  var getMinRangeValue = document.querySelector('#get-min-range').value;
  var getMaxRangeValue = document.querySelector('#get-max-range').value;
  // error messages
  var errorContent = "<img class='error-icon' src='images/error-icon.svg' alt='error-icon'>";
  var errorNumber = "<p class='error-text'>Enter number</p>";
  var errorComparison = "<p class='error-text'>The Min range value must be less than the Max value</p>"

  // Beginning of conditionals involving empty-field validation
  if (getMinRangeValue != "" && getMaxRangeValue != "") {
    // Beginning of conditionals involving integer min < max comparison validation
    if (parseInt(getMinRangeValue, 10) < parseInt(getMaxRangeValue, 10)) {
      //start of click event
      postMinRangeValue.innerText = getMinRangeValue;
      postMaxRangeValue.innerText = getMaxRangeValue;
      // Section within function(which involves another function) that generates the random "Winning" number
      createRandomNumber(parseInt(getMinRangeValue, 10), parseInt(getMaxRangeValue, 10));
      //end of click event
    } else if (parseInt(getMinRangeValue, 10) > parseInt(getMaxRangeValue, 10)) {
        //error messages if min > max
        showErrors(0, selectMinRangeId, errorComparison);
        showErrors(0, selectMaxRangeId, errorComparison);
    }
  } else {
    if (getMinRangeValue == "" && getMaxRangeValue == "") {
      // error messages if no numbers entered
      showErrors(0, selectMinRangeId, errorNumber);
      showErrors(0, selectMaxRangeId, errorNumber);
    } else if (getMinRangeValue == "") {
      // error messages  if min number isn't entered
      showErrors(0, selectMinRangeId, errorNumber);
    } else if (getMaxRangeValue == "") {
      // error messages  if max number isn't entered
      showErrors(0, selectMaxRangeId, errorNumber);
    }
  }
});

submitButton.addEventListener('click', function(event){
  event.preventDefault();
  // start timer to check game time
  const start = new Date().getTime();
  // *** CREATE CHALLENGER'S OBJECT ***
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
  // challenger 1
  var challengerOne = new Challenger(document.querySelector('#name-challenger-1'), document.querySelector('#guess-1'), document.querySelectorAll('.name-one'), document.querySelector('.guess-one'), document.querySelector('#challenger-one-result'));
  // challenger 2
  var challengerTwo = new Challenger(document.querySelector('#name-challenger-2'), document.querySelector('#guess-2'), document.querySelectorAll('.name-two'), document.querySelector('.guess-two'), document.querySelector('#challenger-two-result'));
  // range and random
  var minRange = parseInt(document.querySelector('#post-min-range').innerText, 10);
  var maxRange = parseInt(document.querySelector('#post-max-range').innerText, 10);
  var randomNumber = document.querySelector('#random-number-storage').innerText;

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
  var errorNoRange = "<p class='error-text'>Range aren't defined</p>";

  // *** START VALIDATION
  // check all data was entered
  if (challengerOne['name'] != "" && challengerTwo['name'] != "" && challengerOne['guessString']  != "" && challengerTwo['guessString'] != "") {
    // check range was defined
    if (!isNaN(minRange)) {
      // check all names is alpha-numeric data type
      if(challengerOne['name'].match(letters) && challengerTwo['name'].match(letters)) {
        // check all guesses is inside range
        if (((minRange < challengerOne['guess'] || challengerOne['guess'] == minRange) && (maxRange > challengerOne['guess'] || challengerOne['guess'] == maxRange) && (minRange < challengerTwo['guess'] || challengerTwo['guess'] == minRange) && (maxRange > challengerTwo['guess'] || challengerTwo['guess'] == maxRange))) {
          //***START***
          //make reset and clear buttons dark grey
          activateButton();
          // place input values to spots in left section
          replaceOnce(challengerOne['namePlaces'], challengerOne['name']);
          replaceOnce(challengerTwo['namePlaces'], challengerTwo['name']);
          replaceOnce(challengerOne['guessPlace'], challengerOne['guess']);
          replaceOnce(challengerTwo['guessPlace'], challengerTwo['guess']);
          // place results to latest score block
          placeResults(challengerOne, challengerTwo, randomNumber);
          // add challengers to arrays
          addElementsToArray(arrayData['challengersOne'], challengerOne['name']);
          addElementsToArray(arrayData['challengersTwo'], challengerTwo['name']);
          // *** GAME ***

          if (challengerOne['guess'] == randomNumber) {
            winnerStuff(challengerOne['name'], start, randomNumber, arrayData['winners'], arrayData['guesses'], arrayData['minutes'], arrayData['challengersOne'], arrayData['challengersTwo'], minRange, maxRange);
          } else if (challengerTwo['guess'] == randomNumber) {
            winnerStuff(challengerTwo['name'], start, randomNumber, arrayData['winners'], arrayData['guesses'], arrayData['minutes'], arrayData['challengersOne'], arrayData['challengersTwo'], minRange, maxRange);
          }

          createRandomNumber(minRange, maxRange);

        } else {
          // *** ERRORS ***
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
      showErrors(1, challengerOne['namePath'], errorNoRange);
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
  removeErrorStyles(challengerInputs);
});

    clearButton.addEventListener('click', function() {

      clearForms();
      disableButton();

    });

    resetButton.addEventListener('click', function() {

      var minRange = parseInt(document.querySelector('#post-min-range').innerText, 10);
      var maxRange = parseInt(document.querySelector('#post-max-range').innerText, 10);
      createRandomNumber(minRange, maxRange);
      disableButton();

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

function addElementsToArray(array, value) {
  array.push(value);
}

function replaceTextToArray(array, value) {

  for (var i = 0; i < array.length; i++) {

    array[i].innerText = value;

  };

};

function replaceArrayToArray(arrayPlace, arrayValue) {
  for (var i = 0; i < arrayPlace.length; i++) {
    arrayPlace[i].innerText = arrayValue[i];
  };
};

function replaceOnce(place, value) {
  place.innerText = value;
}

// Function for displaying error content per conditional failures.
function showErrors(index, inputPath, error) {
  var errorContent = "<img class='error-icon' src='images/error-icon.svg' alt='error-icon'>";
  errorBoxes[index].style.display = 'flex';
  errorBoxes[index].innerHTML = errorContent + error;
  inputPath.classList.add('error-input');
};

function removeErrorStyles(inputs) {

  for (var i = 0; i < inputs.length; i++) {

    inputs[i].addEventListener('click', function() {

      for (var i = 0; i < inputs.length; i++) {

        inputs[i].classList.remove('error-input');

      }

      this.classList.remove('error-input');

      for (var i = 0; i < errorBoxes.length; i++) {

        errorBoxes[i].style.display = 'none';

      }

    });

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

  var minStorage = document.querySelector('#post-min-range');
  var maxStorage = document.querySelector('#post-max-range');

  if (minRange > 10) {

    minRange = minRange - 10;
    minStorage.innerText = minRange;
    maxRange = maxRange + 10;
    maxStorage.innerText = maxRange;

  } else {

    minStorage.innerText = minRange;
    maxRange = maxRange + 10;
    maxStorage.innerText = maxRange;

  }

}

function createRandomNumber(minRange, maxRange) {
  var randomStorage = document.querySelector('#random-number-storage');
  var randomNumber = Math.round(minRange - 0.5 + Math.random() * (maxRange - minRange + 1));
  randomStorage.innerText = randomNumber;
}

function winnerStuff(name, start, randomNumber, winners, guesses, minutes, chOne, chTwo, minRange, maxRange) {
  // get an end of game time
  const end = new Date().getTime();
  var gameTime = parseInt(((end - start) / 6000) * 100)/100;
  // put winner game data to array
  addElementsToArray(winners, name);
  addElementsToArray(guesses, randomNumber);
  addElementsToArray(minutes, gameTime);
  //create winner card
  insertCard()
  // outputs arrays
  var guessesPlaces = document.querySelectorAll('.guesses-number');
  var winnerNamePlaces = document.querySelectorAll('.winner-name');
  var minutesNumberPlaces = document.querySelectorAll('.minutes-number');
  var challengerOnePlaces = document.querySelectorAll('.ch-one');
  var challengerTwoPlaces = document.querySelectorAll('.ch-two');
  // Add text to winner card
  replaceArrayToArray(winnerNamePlaces, winners);
  replaceArrayToArray(guessesPlaces, guesses);
  replaceArrayToArray(minutesNumberPlaces, minutes);
  replaceArrayToArray(challengerOnePlaces, chOne);
  replaceArrayToArray(challengerTwoPlaces, chTwo);
  //change range min and max after winning
  changeMaxAndMin(minRange, maxRange);
}

function insertCard() {
  var insertArticle = document.createElement("article");
  insertArticle.classList.add('winner-card');
  document.querySelector('.section-right').appendChild(insertArticle);
  insertArticle.innerHTML =
  `
    <header class="header-card">
      <span class="name-one ch-one header-name">Challenger 1 name</span>
      <p class="vs"> vs </p>
      <span class="name-two ch-two header-name">Challenger 2 name</span>
     </header>
    <div class="winner-wrapper">
      <p class="winner-name">--</p>
    </div>
    <footer class="footer-card">
        <p class="guesses-number">--</p>
        <p class="minutes-number">--</p>
        <img class="footer-delete-icon" src="images/delete-icon.svg" width="350" />
    </footer>
  `;
}



function removeWinnerCard(event) {
  if (event.target.className === "footer-delete-icon") {
    var wName = document.querySelector('.winner-name').innerText;
    console.log((arrayData['winners'].indexOf(wName)));
    event.target.closest('.winner-card').remove();
  }
}
