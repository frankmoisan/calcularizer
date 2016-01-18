var value = 0; // Currently pressed button
var sequence = 0; // Entire mathematical sequence, appended from current and operation buttons
var current = 0; // Holds current series of digits
var total = 0; // Calculated total
var grandTotal = '';
var decimal = false; // Checks for decimal
var digits = 0; // Counts the number of digits on screen - max: 12

$(document).ready(function() {

  // Clear ALL THE THINGS!
  $('#C').on('click', function() {
    ClearEverything();
    UpdateScreen('0');
  });

  // Add ALL THE THINGS!
  $('#equal').on('click', function() {
    sequence += current.toString();
    current = 0;
    digits = 0;
    decimal = false;

    try {
      total = math.eval(sequence);
      sequence = 0;
      
      // If total is foat, limit decimals to 10 places
      if(total % 1 !== 0) {
        total = total.toFixed(10);
      }
      
      UpdateScreen(total);
    } catch (err) {
      console.log(err);
      UpdateScreen('ERR');
    }
  });

  // Handle operators
  $('.operation-button').on('click', function() {
    value = $(this).text();
    if (digits != 0 || current != '0.' || current != '0.0') {
      if (sequence.toString().slice(-1) != '+' || sequence.toString().slice(-1) != '-' || sequence.toString().slice(-1) != '/' || sequence.toString().slice(-1) != '*') {
        if (value == '÷') {
          sequence += current + '/';
        } else if (value == '×') {
          sequence += current + '*';
        } else if (value == '+' || value == '-') {
          sequence += current + value.toString();
        }
        current = 0;
        digits = 0;
        decimal = false;
        UpdateScreen('0');
      }
    }
  });

  // Handle numbers and decimals
  $('.number-button').on('click', function() {
    // Capture the value of whatever button was pressed
    value = $(this).text();

    // Lets the decimal point play nice with others
    if (value == '.' && !decimal) {
      if (digits == 0) {
        current = '0.';
        digits = 2;
      } else if (digits < 12) {
        current += '.';
      }
      decimal = true;
    }

    // Handle numbers
    if (value != '.' && digits < 12) {
      if ($('#display').text() == '0') {
        current = value.toString();
      } else {
        current += value.toString();
      }
      digits++;
    }
    
    UpdateScreen(current);
  });
});

function UpdateScreen(current) {
  $('#display').text(current);
}

function ClearEverything() {
  value = 0;
  sequence = 0;
  current = 0;
  total = 0;
  digits = 0;
  decimal = false;
}