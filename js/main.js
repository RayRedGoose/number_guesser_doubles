// *** GLOBAL VARIABLES ***

// often used element
var forms = document.querySelectorAll('form');
var inputs = document.querySelectorAll('input');
var errorBoxes = document.querySelectorAll('.error');
var sectionRight = document.querySelector('.section-right');
var sectionLeft = document.querySelector('.section-left');

sectionLeft.addEventListener('click', function(event) {
  event.preventDefault();
  if (event.target.classList.contains('update-button')) {
    updateRange();
  }
  if (event.target.classList.contains('submit-button')) {
    startGame();
  }
  if (event.target.classList.contains('reset-button')) {
    resetGame();
  }
  if (event.target.classList.contains('clear-button')) {
    disableButton();
    clearForms();
  }
  if (event.target.classList.contains('input')) {
    removeErrorStyles(event.target);
  }
});
sectionLeft.addEventListener('input', function(event) {
  if (event.target.classList.contains('input')) {
    document.querySelector('#clear-button').classList.add('button--dark-grey');
    document.querySelector('#clear-button').classList.remove('button--light-grey');
  }
});
sectionRight.addEventListener('click', removeWinnerCard);

// start timer to check game time
const start = new Date().getTime();

// Function for retrieving user input (Min and Max Range values) and for posting them in the second article of the left-section //
function updateRange() {
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
  var errorVal = "<p class='error-text'>This is not a number</p>";
  // var for validation
  var numbers = /^[0-9]+$/;
  // Beginning of conditionals involving empty-field validation
  if (getMinRangeValue != "" && getMaxRangeValue != "" && (parseInt(getMinRangeValue, 10) < parseInt(getMaxRangeValue, 10)) && (getMinRangeValue.match(numbers) && getMaxRangeValue.match(numbers))) {
      //start of click event
      postMinRangeValue.innerText = getMinRangeValue;
      postMaxRangeValue.innerText = getMaxRangeValue;
      // Section within function(which involves another function) that generates the random "Winning" number
      createRandomNumber(parseInt(getMinRangeValue, 10), parseInt(getMaxRangeValue, 10));
      //end of click event
  }
  // *** ERRORS ***
  if (getMinRangeValue == "" && getMaxRangeValue == "") {
    // error messages if no numbers entered
    showErrors(0, selectMinRangeId, errorNumber);
    showErrors(0, selectMaxRangeId, errorNumber);
  }
  if (getMinRangeValue == "") {
    // error messages  if min number isn't entered
    showErrors(0, selectMinRangeId, errorNumber);
  }
  if (getMaxRangeValue == "") {
    // error messages  if max number isn't entered
    showErrors(0, selectMaxRangeId, errorNumber);
  }
  if (!getMinRangeValue.match(numbers) && !getMaxRangeValue.match(numbers)) {
    // errors if both guess are not numeric types
    showErrors(0, selectMinRangeId, errorVal);
  }

  if (!getMinRangeValue.match(numbers)) {
    // error if challenger 1 guess is not numeric type
    showErrors(0, selectMinRangeId, errorVal);
  }

  if (!getMaxRangeValue.match(numbers)) {
    // errors if challenger 2 guess is not numeric type
    showErrors(0, selectMaxRangeId, errorVal);
  }

  if (parseInt(getMinRangeValue, 10) > parseInt(getMaxRangeValue, 10)) {
      //error messages if min > max
      showErrors(0, selectMinRangeId, errorComparison);
      showErrors(0, selectMaxRangeId, errorComparison);
  }
  if (parseInt(getMinRangeValue, 10) == parseInt(getMaxRangeValue, 10)) {
      //error messages if min > max
      showErrors(0, selectMinRangeId, errorComparison);
      showErrors(0, selectMaxRangeId, errorComparison);
  }
};

function startGame(){
  // *** CREATE CHALLENGER'S OBJECT ***
  class Challenger {
    constructor(namePath, guessPath, namePlaces, guessPlace, resultPlace) {
      this.namePath = document.querySelector(namePath);
      this.guessPath = document.querySelector(guessPath);
      this.namePlaces = document.querySelector(namePlaces);
      this.guessPlace = document.querySelector(guessPlace);
      this.resultPlace = document.querySelector(resultPlace);
      this.name = this.namePath.value;
      this.guessString = this.guessPath.value
      this.guess = parseInt(this.guessString, 10);
    }
  }
  // challenger 1
  var challengerOne = new Challenger('#name-challenger-1', '#guess-1', '.name-one', '.guess-one', '#challenger-one-result');
  // challenger 2
  var challengerTwo = new Challenger('#name-challenger-2', '#guess-2', '.name-two', '.guess-two', '#challenger-two-result');
  // range and random
  var minRange = parseInt(document.querySelector('#post-min-range').innerText, 10);
  var maxRange = parseInt(document.querySelector('#post-max-range').innerText, 10);
  var randomNumber = document.querySelector('#random-number-storage').innerText;

  // ***VALIDATION OF CHALLENGER FORM***
  //parameters for validation
  var letters = /^[0-9a-zA-Z]+$/;
  var numbers = /^[0-9]+$/;
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
  if ((challengerOne['name'] != "" && challengerTwo['name'] != "" && challengerOne['guessString']  != "" && challengerTwo['guessString'] != "") && (!isNaN(minRange)) && (challengerOne['name'].match(letters) && challengerTwo['name'].match(letters)) && (challengerOne['guessString'].match(numbers) && challengerTwo['guessString'].match(numbers)) && ((minRange < challengerOne['guess'] || challengerOne['guess'] == minRange) && (maxRange > challengerOne['guess'] || challengerOne['guess'] == maxRange) && (minRange < challengerTwo['guess'] || challengerTwo['guess'] == minRange) && (maxRange > challengerTwo['guess'] || challengerTwo['guess'] == maxRange))) {
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
    // *** GAME ***
    const end = new Date().getTime();
    var gameTime = parseInt(((end - start) / 6000) * 100)/100;
    if (challengerOne['guess'] == randomNumber) {
      showWinner(gameTime, challengerOne['name'], challengerTwo['name'], challengerOne['name'], randomNumber, minRange, maxRange);
    }
    if (challengerTwo['guess'] == randomNumber) {
      showWinner(gameTime, challengerOne['name'], challengerTwo['name'], challengerTwo['name'], randomNumber, minRange, maxRange);
    }
    createRandomNumber(minRange, maxRange);
    //***END OF GAME***
  }
  // *** ERRORS ***
  //error if all or some inputs are empty
  if (challengerOne['name'] == "" && challengerTwo['name'] == "" && challengerOne['guessString'] == "" && challengerTwo['guessString'] == "") {
    showErrors(1, challengerOne['namePath'], errorAll);
    showErrors(2, challengerTwo['namePath'], errorAll);
    challengerOne['guessPath'].classList.add('error-input');
    challengerTwo['guessPath'].classList.add('error-input');
  }
  // errors if all first inputs are empty
  if (challengerOne['name'] == "" && challengerOne['guessString'] == "") {
    showErrors(1, challengerOne['namePath'], errorAll);
    challengerOne['guessPath'].classList.add('error-input');
  }
  // errors if all second inputs are empty
  if (challengerTwo['name'] == "" && challengerTwo['guessString'] == "") {
    showErrors(2, challengerTwo['namePath'], errorAll);
    challengerTwo['guessPath'].classList.add('error-input');
  }
  // errors if name inputs are empty
  if (challengerOne['name'] == "" && challengerTwo['name']) {
    showErrors(1, challengerOne['namePath'], errorName);
    showErrors(2, challengerTwo['namePath'], errorName);
  }

  if (challengerOne['guessString'] == "" && challengerTwo['guessString'] != "") {
    // errors if guess inputs are empty
    showErrors(1, challengerOne['guessPath'], errorGuess);
    showErrors(2, challengerTwo['guessPath'], errorGuess);
  }

  if (challengerOne['name'] == "") {
    // errors if challenger 1 name input is empty
    showErrors(1, challengerOne['namePath'], errorName);
  }

  if (challengerTwo['name'] == "") {
    // errors if challenger 2 name input is empty
    showErrors(2, challengerTwo['namePath'], errorName);
  }

  if (challengerTwo['guessString'] == "") {
    // errors if challenger 1 guess input is empty
    showErrors(1, challengerOne['guessPath'], errorGuess);
  }

  if (challengerTwo['guess'] == "") {
    // errors if challenger 2 guess input is empty
    showErrors(2, challengerTwo['guessPath'], errorGuess);
  }

  if (isNaN(minRange)) {
    // error message if range have not be defined
    showErrors(1, challengerOne['namePath'], errorNoRange);
  }

  if (!challengerOne['name'].match(letters) && !challengerTwo['name'].match(letters)) {
    // errors if both names are not alpha-numeric types
    showErrors(1, challengerOne['namePath'], errorNameVal);
    showErrors(2, challengerTwo['namePath'], errorNameVal);
  }

  if (!challengerOne['name'].match(letters)) {
    // error if challenger 1 name is not alpha-numeric type
    showErrors(1, challengerOne['namePath'], errorNameVal);
  }

  if (!challengerTwo['name'].match(letters)) {
    // errors if challenger 2 name is not alpha-numeric type
    showErrors(2, challengerTwo['namePath'], errorNameVal);
  }

  if (!challengerOne['guessString'].match(numbers) && !challengerTwo['guessString'].match(numbers)) {
    // errors if both guess are not numeric types
    showErrors(1, challengerOne['guessPath'], errorGuessVal);
    showErrors(2, challengerTwo['guessPath'], errorGuessVal);
  }

  if (!challengerOne['guessString'].match(numbers)) {
    // error if challenger 1 guess is not numeric type
    showErrors(1, challengerOne['guessPath'], errorGuessVal);
  }

  if (!challengerTwo['guessString'].match(numbers)) {
    // errors if challenger 2 guess is not numeric type
    showErrors(2, challengerTwo['guessPath'], errorGuessVal);
  }

  if ((challengerOne['guess'] < minRange) && (challengerTwo['guess'] < minRange)) {
    showErrors(1, challengerOne['guessPath'], errorOutRange);
    showErrors(2, challengerTwo['guessPath'], errorOutRange);
  }

  if ((maxRange < challengerOne['guess']) && (maxRange < challengerTwo['guess'])) {
    showErrors(1, challengerOne['guessPath'], errorOutRange);
    showErrors(2, challengerTwo['guessPath'], errorOutRange);
  }

  if ((challengerOne['guess'] < minRange) || (maxRange < challengerOne['guess'])) {
    showErrors(1, challengerOne['guessPath'], errorOutRange);
  }

  if ((challengerTwo['guess'] < minRange) || (maxRange < challengerTwo['guess'])) {
    showErrors(2, challengerTwo['guessPath'], errorOutRange);
  }

};

function resetGame() {
  var minRange = parseInt(document.querySelector('#post-min-range').innerText, 10);
  var maxRange = parseInt(document.querySelector('#post-max-range').innerText, 10);
  createRandomNumber(minRange, maxRange);
  disableButton();
  clearForms();
};

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

function disableButton() {

  document.querySelector('#clear-button').classList.remove('button--dark-grey');
  document.querySelector('#clear-button').classList.add('button--light-grey');

  document.querySelector('#reset-button').classList.remove('button--dark-grey');
  document.querySelector('#reset-button').classList.add('button--light-grey');

};

function activateButton() {

  document.querySelector('#clear-button').classList.add('button--dark-grey');
  document.querySelector('#clear-button').classList.remove('button--light-grey');

  document.querySelector('#reset-button').classList.add('button--dark-grey');
  document.querySelector('#reset-button').classList.remove('button--light-grey');

};

function replaceOnce(place, value) {
  place.innerText = value;
};

// Function for displaying error content per conditional failures.
function showErrors(index, inputPath, error) {
  var errorContent = "<img class='error-icon' src='images/error-icon.svg' alt='error-icon'>";
  errorBoxes[index].style.display = 'flex';
  errorBoxes[index].innerHTML = errorContent + error;
  inputPath.classList.add('error-input');
};

function removeErrorStyles(input) {
  input.classList.remove('error-input');
  if (input.classList.contains('range')) {
    errorBoxes[0].style.display = 'none';
  }
  if (input.classList.contains('input-first-row')) {
    errorBoxes[1].style.display = 'none';
  }
  if (input.classList.contains('input-second-row')) {
    errorBoxes[2].style.display = 'none';
  }
};

function placeResults(challengerOne, challengerTwo, randomNumber) {

  if (challengerOne['guess'] < randomNumber) {
    replaceOnce(challengerOne['resultPlace'], "that's too low!");
  }

  if (challengerOne['guess'] > randomNumber) {
    replaceOnce(challengerOne['resultPlace'], "that's too high!");
  }

  if (challengerTwo['guess'] < randomNumber) {
    replaceOnce(challengerTwo['resultPlace'], "that's too low!");
  }

  if (challengerTwo['guess'] > randomNumber) {
    replaceOnce(challengerTwo['resultPlace'], "that's too high!");
  }

  if (challengerOne['guess'] == randomNumber) {
    replaceOnce(challengerOne['resultPlace'], "BOOM!");
  }

  if (challengerTwo['guess'] == randomNumber) {
    replaceOnce(challengerTwo['resultPlace'], "BOOM!");
  }
};

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
};

function createRandomNumber(minRange, maxRange) {
  var randomStorage = document.querySelector('#random-number-storage');
  var randomNumber = Math.round(minRange - 0.5 + Math.random() * (maxRange - minRange + 1));
  randomStorage.innerText = randomNumber;
};

function showWinner(gameTime, nameOne, nameTwo, winnerName, randomNumber, minRange, maxRange) {
  //create winner card
  insertCard(nameOne, nameTwo, winnerName, randomNumber, gameTime);
  //change range min and max after winning
  changeMaxAndMin(minRange, maxRange);
};

function insertCard(nameOne, nameTwo, winnerName, randomNumber, gameTime) {
  var insertArticle = document.createElement("article");
  insertArticle.classList.add('winner-card');
  sectionRight.appendChild(insertArticle);
  insertArticle.innerHTML =
  `
    <header class="header-card">
      <span class="ch-one header-name">${nameOne}</span>
      <p class="vs"> vs </p>
      <span class="ch-two header-name">${nameTwo}</span>
     </header>
    <div class="winner-wrapper">
      <p class="winner-name">${winnerName}</p>
    </div>
    <footer class="footer-card">
        <p class="guesses-number">${randomNumber}</p>
        <p class="minutes-number">${gameTime}</p>
        <img class="footer-delete-icon" src="images/delete-icon.svg" width="350" />
    </footer>
  `;
};

function removeWinnerCard(event) {
  if (event.target.className === "footer-delete-icon") {
    event.target.closest('.winner-card').remove();
  }
};
