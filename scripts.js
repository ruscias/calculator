import { add, subtract, multiply, divide, exp  } from '/helpers.js';


let buttonsSinceClear = [];
let buttonsToCommit = '';
let committedButtons = [];
let numbersToProcess = [];
let lastOperationRequested = '';



function clear() {
  buttonsSinceClear = [];
  buttonsToCommit = '';
  committedButtons = [];
  numbersToProcess = [];
  lastOperationRequested = '';
}

function backspace () {
  return 0;
}

function commitButtons() {
    return 0;
}

function processNumber(button) {
  buttonsToCommit += button.id;
}

function processDecimal() {
  if (buttonsToCommit.includes('.')) {
    return 0;
  } else if (buttonsToCommit.length === 0) {
    buttonsToCommit += '0.';
  } else {
    buttonsToCommit += '.';  
  }
}

function processPositiveOrNegative() {
  return 0;
}

function processOperation() {
  return 0;
}

function updateButtonsToCommit() {
  const divButtonsToCommit= document.querySelector('div.buttons-to-commit');
  divButtonsToCommit.innerText = buttonsToCommit;
}

function updateButtonsSinceClear() {
  return 0;
}

function processButton() {
  console.log(this);
  //Call a function depending on the button pressed
  //handle clear
  if (this.id === 'clear') {
    clear();
  }
  //if id = backspace
  //handle numbers
  if (this.className === 'number') {
    processNumber(this);
  } 
  //handle decimals
  if (this.id === 'decimal') {
    processDecimal();
  }
  //if id = positive-or-negative
  //if className = operation


  //update ui - buttons-to-commit to reflect any needed changes
  updateButtonsToCommit();
  //update ui - buttons-since-clear to reflect any needed changes 

}


const buttons = document.querySelectorAll('button');

buttons.forEach( (button) => {
  button.addEventListener('click', processButton)
});
