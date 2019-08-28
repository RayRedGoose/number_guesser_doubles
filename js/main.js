// *** GLOBAL VARIABLES ***

var forms = document.querySelectorAll('form');
var inputs = document.querySelectorAll('input');
var errorBoxes = document.querySelectorAll('.error');
var sectionRight = document.querySelector('.section-right');
var sectionLeft = document.querySelector('.section-left');
// Initiates timer for checking game time
const start = new Date().getTime();

// *** EVENT LISTENERS ***

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
    clearGame();
  }
  if (event.target.classList.contains('error-input')) {
    event.target.classList.add('flip');
    removeErrorStyles(event.target);
  }
  if (event.target.classList.contains('cookie') || event.target.classList.contains('bunny')) {
    event.target.remove();
  }
});

sectionLeft.addEventListener('input', function(event) {
  if (event.target.classList.contains('input')) {
    document.querySelector('#clear-button').classList.add('button--dark-grey');
    document.querySelector('#clear-button').classList.remove('button--light-grey');
  }
});

sectionRight.addEventListener('click', function(event) {
  if (event.target.classList.contains('footer-delete-icon')) {
    removeWinnerCard();
  }
  if (event.target.classList.contains('delete-all-button')) {
    deleteAllCards();
  }
});

// *** FUNCTIONS ***

// Function for altering the color states of the clear and reset buttons from light to dark grey
function activateButton() {
  document.querySelector('#clear-button').classList.add('button--dark-grey');
  document.querySelector('#clear-button').classList.remove('button--light-grey');
  document.querySelector('#reset-button').classList.add('button--dark-grey');
  document.querySelector('#reset-button').classList.remove('button--light-grey');
};

// Function for updating the input range values upon successful win
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

// Function for removing content from various container types
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
  document.querySelector('#update-button').classList.remove('flash-button');
  document.querySelector('#submit-button').classList.remove('flash-button');
};

// Function for clear button
function clearGame() {
  disableButton();
  clearForms();
  removeBunny();
}

// KONAMI CODE!
function createBunny(winnerName) {
  if (winnerName == 'Bunny' || winnerName == 'BUNNY' || winnerName == 'bunny') {
    var secret = document.querySelector(".secret");
    var insertSecret = document.createElement("article");
    secret.appendChild(insertSecret);
    insertSecret.innerHTML = `<img class="bunny" src="images/bunny.png" alt="">`;
  }
  if (winnerName == 'Cookie' || winnerName == 'cookie' || winnerName == 'COOKIE') {
    var secret = document.querySelector(".secret");
    var insertSecret = document.createElement("article");
    secret.appendChild(insertSecret);
    insertSecret.innerHTML = `<img class="cookie" src="images/cookie.png" alt="">`;
  }
}

// Function for generating the random winning number from within user-provided range
function createRandomNumber(minRange, maxRange) {
  var randomStorage = document.querySelector('#random-number-storage');
  var randomNumber = Math.round(minRange - 0.5 + Math.random() * (maxRange - minRange + 1));
  randomStorage.innerText = randomNumber;
};

// Function for deleting all cards
function deleteAllCards() {
  var cards = document.querySelectorAll('.winner-card');
  for (var i = 0; i < cards.length; i++) {
    cards[i].remove();
  }
  document.querySelector('#delete-all-button').style.display = 'none';
}

// Function for altering the color states of the clear and reset buttons from dark to light grey
function disableButton() {
  document.querySelector('#clear-button').classList.remove('button--dark-grey');
  document.querySelector('#clear-button').classList.add('button--light-grey');
  document.querySelector('#reset-button').classList.remove('button--dark-grey');
  document.querySelector('#reset-button').classList.add('button--light-grey');
};

// Function for dynamically generating winner cards
function insertCard(nameOne, nameTwo, winnerName, randomNumber, gameTime) {
  document.querySelector('#delete-all-button').style.display = 'block';
  var insertArticle = document.createElement("article");
  insertArticle.classList.add('winner-card');
  insertArticle.classList.add('slide-from-right');
  document.querySelector('.cards-section').appendChild(insertArticle);
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

// Function for situating user-provided input values at targeted locations
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

// Function for removing konami code
function removeBunny() {
  var bunnies = document.querySelectorAll('.bunny');
  var cookies = document.querySelectorAll('.cookie');
  for (var i = 0; i < bunnies.length; i++) {
    bunnies[i].remove();
  }
  for (var i = 0; i < cookies.length; i++) {
    cookies[i].remove();
  }
}

// Function for clearing out validation error displays (tied to eventListeners on the left section)
function removeErrorStyles(input) {
  input.classList.remove('error-input');
  if (input.classList.contains('range')) {
    errorBoxes[0].style.display = 'none';
    document.querySelector('#update-button').classList.remove('flash-button');
  }
  if (input.classList.contains('input-first-row')) {
    errorBoxes[1].style.display = 'none';
    document.querySelector('#submit-button').classList.remove('flash-button');
  }
  if (input.classList.contains('input-second-row')) {
    errorBoxes[2].style.display = 'none';
    document.querySelector('#submit-button').classList.remove('flash-button');
  }
};

// Function for removing winner card via the footer-delete-icon button
function removeWinnerCard() {
  event.target.closest('.winner-card').remove();
};

// Function for generally displaying messages and values in targeted locations
function replaceOnce(place, value) {
  place.innerText = value;
};

// Function tied to reset button
function resetGame() {
  var minRange = parseInt(document.querySelector('#post-min-range').innerText, 10);
  var maxRange = parseInt(document.querySelector('#post-max-range').innerText, 10);
  createRandomNumber(minRange, maxRange);
  disableButton();
  clearForms();
  removeBunny()
};

// Function for displaying error content per validations
function showErrors(index, inputPath, error) {
  var errorContent = "<img class='error-icon' src='images/error-icon.svg' alt='error-icon'>";
  errorBoxes[index].style.display = 'flex';
  errorBoxes[index].innerHTML = errorContent + error;
  inputPath.classList.add('error-input');
  inputPath.classList.remove('flip');
  if (errorBoxes[0].style.display == 'flex') {
    document.querySelector('#update-button').classList.add('flash-button');
  }
  if (errorBoxes[1].style.display == 'flex' || errorBoxes[2].style.display == 'flex') {
    document.querySelector('#submit-button').classList.add('flash-button');
  }
};

// Function for generating winner card with updated range values
function showWinner(gameTime, nameOne, nameTwo, winnerName, randomNumber, minRange, maxRange) {
  insertCard(nameOne, nameTwo, winnerName, randomNumber, gameTime);
  changeMaxAndMin(minRange, maxRange);
};

// Function to launch game
function startGame(){
  // Create challengers
  class Challenger {
    constructor(obj) {
      this.namePath = document.querySelector(obj.namePath);
      this.guessPath = document.querySelector(obj.guessPath);
      this.namePlaces = document.querySelector(obj.namePlaces);
      this.guessPlace = document.querySelector(obj.guessPlace);
      this.resultPlace = document.querySelector(obj.resultPlace);
      this.name = this.namePath.value;
      this.guessString = this.guessPath.value
      this.guess = parseInt(this.guessString, 10);
    }
  }
  var challengerOne = new Challenger({namePath: '#name-challenger-1', guessPath: '#guess-1', namePlaces: '.name-one', guessPlace: '.guess-one', resultPlace: '#challenger-one-result'});
  var challengerTwo = new Challenger({namePath: '#name-challenger-2', guessPath: '#guess-2', namePlaces: '.name-two', guessPlace: '.guess-two', resultPlace: '#challenger-two-result'});

  // Create random number
  var minRange = parseInt(document.querySelector('#post-min-range').innerText, 10);
  var maxRange = parseInt(document.querySelector('#post-max-range').innerText, 10);
  var randomNumber = document.querySelector('#random-number-storage').innerText;

  // Validation of challenger form
  var letters = /^[0-9a-zA-Z]+$/;
  var numbers = /^[0-9]+$/;
  var errorAll = "<p class='error-text'>Enter name and guess</p>";
  var errorName = "<p class='error-text'>Enter name</p>";
  var errorNameVal = "<p class='error-text'>Name must have only alpha-numeric symbols</p>";
  var errorGuess = "<p class='error-text'>Enter guess</p>";
  var errorGuess = "<p class='error-text'>Guess is not number</p>";
  var errorGuessVal = "<p class='error-text'>Guess must have only numeric symbols</p>";
  var errorOutRange = "<p class='error-text'>Guess must be within range</p>";
  var errorNoRange = "<p class='error-text'>Range aren't defined</p>";
  var errorSameVal = "<p class='error-text'>Guesses should be different</p>";

  // Beginning of validation
  if ((challengerOne['name'] != "" && challengerTwo['name'] != "" && challengerOne['guessString']  != "" && challengerTwo['guessString'] != "") && (!isNaN(minRange)) && (challengerOne['name'].match(letters) && challengerTwo['name'].match(letters)) && (challengerOne['guessString'].match(numbers) && challengerTwo['guessString'].match(numbers)) && ((minRange < challengerOne['guess'] || challengerOne['guess'] == minRange) && (maxRange > challengerOne['guess'] || challengerOne['guess'] == maxRange) && (minRange < challengerTwo['guess'] || challengerTwo['guess'] == minRange) && (maxRange > challengerTwo['guess'] || challengerTwo['guess'] == maxRange)) && (challengerOne['guess'] != challengerTwo['guess'])) {
    //***START***
    activateButton();
    // Place input values to spots in left section
    replaceOnce(challengerOne['namePlaces'], challengerOne['name']);
    replaceOnce(challengerTwo['namePlaces'], challengerTwo['name']);
    replaceOnce(challengerOne['guessPlace'], challengerOne['guess']);
    replaceOnce(challengerTwo['guessPlace'], challengerTwo['guess']);
    placeResults(challengerOne, challengerTwo, randomNumber);
    // *** GAME ***
    const end = new Date().getTime();
    var gameTime = parseInt(((end - start) / 6000) * 100)/100;
    if (challengerOne['guess'] == randomNumber) {
      showWinner(gameTime, challengerOne['name'], challengerTwo['name'], challengerOne['name'], randomNumber, minRange, maxRange);
      createBunny(challengerOne['name']);
    }
    if (challengerTwo['guess'] == randomNumber) {
      showWinner(gameTime, challengerOne['name'], challengerTwo['name'], challengerTwo['name'], randomNumber, minRange, maxRange);
      createBunny(challengerTwo['name']);
    }
    createRandomNumber(minRange, maxRange);
  }
    //***END OF GAME***

  // *** ERRORS ***
  // Error if all or some inputs are empty
  if (challengerOne['name'] == "" && challengerTwo['name'] == "" && challengerOne['guessString'] == "" && challengerTwo['guessString'] == "") {
    showErrors(1, challengerOne['namePath'], errorAll);
    showErrors(2, challengerTwo['namePath'], errorAll);
    challengerOne['guessPath'].classList.add('error-input');
    challengerTwo['guessPath'].classList.add('error-input');
  }
  // Errors if all first inputs are empty
  if (challengerOne['name'] == "" && challengerOne['guessString'] == "") {
    showErrors(1, challengerOne['namePath'], errorAll);
    challengerOne['guessPath'].classList.add('error-input');
  }
  // Errors if all second inputs are empty
  if (challengerTwo['name'] == "" && challengerTwo['guessString'] == "") {
    showErrors(2, challengerTwo['namePath'], errorAll);
    challengerTwo['guessPath'].classList.add('error-input');
  }
  // Errors if name inputs are empty
  if (challengerOne['name'] == "" && challengerTwo['name']) {
    showErrors(1, challengerOne['namePath'], errorName);
    showErrors(2, challengerTwo['namePath'], errorName);
  }
  // Errors if guess inputs are empty
  if (challengerOne['guessString'] == "" && challengerTwo['guessString'] != "") {
    showErrors(1, challengerOne['guessPath'], errorGuess);
    showErrors(2, challengerTwo['guessPath'], errorGuess);
  }
  // Errors if challenger 1 name input is empty
  if (challengerOne['name'] == "") {
    showErrors(1, challengerOne['namePath'], errorName);
  }
  // Errors if challenger 2 name input is empty
  if (challengerTwo['name'] == "") {
    showErrors(2, challengerTwo['namePath'], errorName);
  }
  // Errors if challenger 1 guess input is empty
  if (challengerTwo['guessString'] == "") {
    showErrors(1, challengerOne['guessPath'], errorGuess);
  }
  // Errors if challenger 2 guess input is empty
  if (challengerTwo['guess'] == "") {
    showErrors(2, challengerTwo['guessPath'], errorGuess);
  }
  // Error message if range have not be defined
  if (isNaN(minRange)) {
    showErrors(1, challengerOne['namePath'], errorNoRange);
  }
  // Errors if both names are not alpha-numeric types
  if (!challengerOne['name'].match(letters) && !challengerTwo['name'].match(letters)) {
    showErrors(1, challengerOne['namePath'], errorNameVal);
    showErrors(2, challengerTwo['namePath'], errorNameVal);
  }
  // Error if challenger 1 name is not alpha-numeric type
  if (!challengerOne['name'].match(letters)) {
    showErrors(1, challengerOne['namePath'], errorNameVal);
  }
  // Errors if challenger 2 name is not alpha-numeric type
  if (!challengerTwo['name'].match(letters)) {
    showErrors(2, challengerTwo['namePath'], errorNameVal);
  }
  // Errors if both guess are not numeric types
  if (!challengerOne['guessString'].match(numbers) && !challengerTwo['guessString'].match(numbers)) {
    showErrors(1, challengerOne['guessPath'], errorGuessVal);
    showErrors(2, challengerTwo['guessPath'], errorGuessVal);
  }
  // Error if challenger 1 guess is not numeric type
  if (!challengerOne['guessString'].match(numbers)) {
    showErrors(1, challengerOne['guessPath'], errorGuessVal);
  }
  // Error if challenger 2 guess is not numeric type
  if (!challengerTwo['guessString'].match(numbers)) {
    showErrors(2, challengerTwo['guessPath'], errorGuessVal);
  }
  // Error if challenger 1 and 2 guesses are less than range min
  if ((challengerOne['guess'] < minRange) && (challengerTwo['guess'] < minRange)) {
    showErrors(1, challengerOne['guessPath'], errorOutRange);
    showErrors(2, challengerTwo['guessPath'], errorOutRange);
  }
  // Error if challenger 1 and 2 guesses are more than range max
  if ((maxRange < challengerOne['guess']) && (maxRange < challengerTwo['guess'])) {
    showErrors(1, challengerOne['guessPath'], errorOutRange);
    showErrors(2, challengerTwo['guessPath'], errorOutRange);
  }
  // Error if challenger 1 guess is less than range min and more than range max
  if ((challengerOne['guess'] < minRange) || (maxRange < challengerOne['guess'])) {
    showErrors(1, challengerOne['guessPath'], errorOutRange);
  }
  // Error if challenger 2 guess is less than range min and more than range max
  if ((challengerTwo['guess'] < minRange) || (maxRange < challengerTwo['guess'])) {
    showErrors(2, challengerTwo['guessPath'], errorOutRange);
  }
  // Error if challenger 1 and 2 guesses is the same
  if ((challengerOne['guess'] == challengerTwo['guess'])) {
    showErrors(1, challengerOne['guessPath'], errorSameVal);
    showErrors(2, challengerTwo['guessPath'], errorSameVal);
  }
};

// Function for retrieving user input (Min and Max Range values) and for posting them in the second article of the left-section //
function updateRange() {
  var selectMinRangeId = document.querySelector('#get-min-range');
  var selectMaxRangeId = document.querySelector('#get-max-range');
  var postMinRangeValue = document.querySelector('#post-min-range');
  var postMaxRangeValue = document.querySelector('#post-max-range');
  var getMinRangeValue = document.querySelector('#get-min-range').value;
  var getMaxRangeValue = document.querySelector('#get-max-range').value;
  var errorContent = "<img class='error-icon' src='images/error-icon.svg' alt='error-icon'>";
  var errorNumber = "<p class='error-text'>Enter number</p>";
  var errorComparison = "<p class='error-text'>The Min range value must be less than the Max value</p>"
  var errorVal = "<p class='error-text'>This is not a number</p>";
  var numbers = /^[0-9]+$/;
  // Conditional involving empty-field validation and random nunber generation
  if (getMinRangeValue != "" && getMaxRangeValue != "" && (parseInt(getMinRangeValue, 10) < parseInt(getMaxRangeValue, 10)) && (getMinRangeValue.match(numbers) && getMaxRangeValue.match(numbers))) {
    postMinRangeValue.innerText = getMinRangeValue;
    postMaxRangeValue.innerText = getMaxRangeValue;
    createRandomNumber(parseInt(getMinRangeValue, 10), parseInt(getMaxRangeValue, 10));
  }
  // Error messages for no numbers entered
  if (getMinRangeValue == "" && getMaxRangeValue == "") {
    showErrors(0, selectMinRangeId, errorNumber);
    showErrors(0, selectMaxRangeId, errorNumber);
  }
  // Error message if min number isn't entered
  if (getMinRangeValue == "") {
    showErrors(0, selectMinRangeId, errorNumber);
  }
  // Error message if max number isn't entered
  if (getMaxRangeValue == "") {
    showErrors(0, selectMaxRangeId, errorNumber);
  }
  // Error message if both guess are not numeric types
  if (!getMinRangeValue.match(numbers) && !getMaxRangeValue.match(numbers)) {
    showErrors(0, selectMinRangeId, errorVal);
  }
  // Error message if challenger 1 guess is not numeric type
  if (!getMinRangeValue.match(numbers)) {
    showErrors(0, selectMinRangeId, errorVal);
  }
  // Error message if challenger 2 guess is not numeric type
  if (!getMaxRangeValue.match(numbers)) {
    showErrors(0, selectMaxRangeId, errorVal);
  }
  // Error messages if min > max
  if (parseInt(getMinRangeValue, 10) > parseInt(getMaxRangeValue, 10)) {
    showErrors(0, selectMinRangeId, errorComparison);
    showErrors(0, selectMaxRangeId, errorComparison);
  }
  // Error messages if min = max
  if (parseInt(getMinRangeValue, 10) == parseInt(getMaxRangeValue, 10)) {
    showErrors(0, selectMinRangeId, errorComparison);
    showErrors(0, selectMaxRangeId, errorComparison);
  }
};
