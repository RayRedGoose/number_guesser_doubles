

// Global Variables

var submitButton = document.querySelector('#submit-button');
var clearButton = document.querySelector('#clear-button');
var resetButton = document.querySelector('#reset-button');
var updateButton = document.querySelector('#update-button');

// Function for top article empty-field validation.




// Function for retrieving user input (Min and Max Range values) and for posting them in the second article of the left-section //
// We could not get the function to successfully output our RANGE VALUES to the global scope.

updateButton.addEventListener("click", function(event) {
  event.preventDefault();
  var getMinRangeValue = document.querySelector('#get-min-range').value;
  var postMinRangeValue = document.querySelector('#post-min-range');
  var getMaxRangeValue = document.querySelector('#get-max-range').value;
  var postMaxRangeValue = document.querySelector('#post-max-range');
  var errorBoxes = document.querySelectorAll('.error');
  var errorContent = "<img class='error-icon' src='images/error-icon.svg' alt='error-icon'>";
  var errorNumber = "<p class='error-text'>Enter number</p>";

  if (getMinRangeValue != "" && getMaxRangeValue != "") {

    postMinRangeValue.innerText = getMinRangeValue;
    postMaxRangeValue.innerText = getMaxRangeValue;

// Section within function(which involves another function) that generates the random "Winning" number

    function randomNumber(min, max) {
      let rand = min - 0.5 + Math.random() * (max - min + 1);
      return Math.round(rand);
    };

    var randomIntegerValue = randomNumber(getMinRangeValue, getMaxRangeValue);
    random = randomIntegerValue;

  } else {

      if (getMinRangeValue == "" && getMaxRangeValue == "") {
        errorBoxes[0].style.display = "flex";

        errorBoxes[0].innerHTML = errorContent + errorNumber;

        postMinRangeValue.classList.add('.error-input');

        postMaxRangeValue.classList.add('.error-input');

        errorBoxes[1].style.display = "flex";

        errorBoxes[1].innerHTML = errorContent + errorNumber;

      } else if (getMinRangeValue == "") {

        errorBoxes[0].style.display = "flex";

        errorBoxes[0].innerHTML = errorContent + errorNumber;

        postMinRangeValue.classList.add('.error-input');

      } else if (getMaxRangeValue == "") {

        errorBoxes[1].style.display = "flex";

        errorBoxes[1].innerHTML = errorContent + errorNumber;

        postMaxRangeValue.classList.add('.error-input');
      }
  }
});
