import { add, subtract, multiply, divide, exp  } from '/helpers.js';


let buttonsSinceClear = [];
let buttonsToCommit = [];
let committedButtons = [];
let lastOperationRequested = '';



function clear() {
  return 0;
}

function backspace () {
  return 0;
}

function commitButtons() {
    return 0;
}

function processNumber() {
  return 0;
}

function processPeriod() {
  return 0;
}

function processPositiveOrNegative() {
  return 0;
}

function processOperation() {
  return 0;
}

function updateButtonsToCommit() {
  const divButtonsToCommit= document.querySelector('div.buttons-to-commit');
  divButtonsToCommit.innerText = buttonsToCommit.join('');
}

function updateButtonsSinceClear() {
  return 0;
}

function processButton() {
  console.log(this);
  //Call a function depending on the button pressed
  //if id = clear
  //if id = backspace
  //if className = number 
  //if id = period
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
