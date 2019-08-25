

// Global Variables

var submitButton = document.querySelector('#submit-button');
var clearButton = document.querySelector('#clear-button');
var resetButton = document.querySelector('#reset-button');
var updateButton = document.querySelector('#update-button');






// Function for retrieving user input (Min and Max Range values) and for posting them in the second article of the left-section //
// We could not get the function to successfully output our RANGE VALUES to the global scope.

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
  var errorComparison = "<p class='error-text'>Check that your minimum and maximum values make sense</p>"

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
