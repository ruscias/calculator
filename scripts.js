import { add, subtract, multiply, divide, exp  } from '/helpers.js';


let buttonsSinceClear = [];
let buttonsToCommit = '';
let numbersToProcess = [];
let lastOperationRequested = '';


function clear() {
  buttonsSinceClear = [];
  buttonsToCommit = '';
  numbersToProcess = [];
  lastOperationRequested = '';
}

function backspace () {
  if (buttonsToCommit.length > 0) {
    buttonsToCommit = buttonsToCommit.slice(0,-1);
  }
}

function commitNumbers() {
  buttonsSinceClear.push(buttonsToCommit);
  numbersToProcess.push(parseFloat(buttonsToCommit));
  buttonsToCommit = '';
}

function processNumber(button) {
  if (buttonsToCommit.length > 8) {
    return 0;
  }

  if (numbersToProcess.length > 0 && lastOperationRequested === '') {
    return 0;
  }

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
  if (buttonsToCommit.length === 0) {
    return 0
  };
  const adjustButtonsToCommit = parseFloat(buttonsToCommit) * -1;
  buttonsToCommit = adjustButtonsToCommit.toString();
}

function processOperation(button) {

  if (buttonsToCommit.lastIndexOf === 0) {
    return 0;
  }

  if (buttonsToCommit.length > 0) {
    commitNumbers();
  }
  
  if (button.id === 'equals') {
    return 0;  
  } 
  
  if (lastOperationRequested.length > 0) {
    return 0;
  }

  let lastOperationRequestedSymbol = button.innerText;
  if (lastOperationRequested !== '') {
    buttonsSinceClear.pop();
  }
  buttonsSinceClear.push(lastOperationRequestedSymbol)
  lastOperationRequested = button.id;

}

function makeAnyCalculations(operationRequested, button) {
  if (numbersToProcess.length < 2) {
    return 0;
  }

  let result = 0;

  const a = numbersToProcess[0];
  const b = numbersToProcess[1];

  switch (operationRequested) {
    case 'subtract':
      result = subtract(a, b);
      break;
    case 'add': 
      result = add(a, b);
      break;
    case 'multiply':
      result = multiply(a, b);
      break;
    case 'exp':
      result = exp(a, b);
      break;
    case 'divide':
      result = divide(a, b);
      break;
    default:
      result = 0;
  }
  clear();
  buttonsToCommit = '';
  if (button.id !== 'equals') {
    buttonsSinceClear = [result, button.innerText];
    lastOperationRequested = button.id;
  }
  numbersToProcess = [result];
}

function updateButtonsToCommit() {
  const divButtonsToCommit = document.querySelector('div.buttons-to-commit');
  if (buttonsToCommit.length === 0 && numbersToProcess.length > 0) {
    divButtonsToCommit.innerText = numbersToProcess[0].toString();
  } else {
    divButtonsToCommit.innerText = buttonsToCommit;
  }
}

function updateButtonsSinceClear() {
  const divButtonsSinceClear = document.querySelector('div.buttons-since-clear');
  divButtonsSinceClear.innerText = buttonsSinceClear.join(' ');
}

function processButton() {
  //Call a function depending on the button pressed
  //handle clear
  if (this.id === 'clear') {
    clear();
  }
  //handle backspace
  if (this.id === 'backspace') {
    backspace();
  }
  //handle numbers
  if (this.className === 'number') {
    processNumber(this);
  } 
  //handle decimals
  if (this.id === 'decimal') {
    processDecimal();
  }
  //handle positive-or-negative button
  if (this.id === 'positive-or-negative') {
    processPositiveOrNegative();
  }
  //handle operations
  if (this.className === 'operation') {
    processOperation(this);
  }

  makeAnyCalculations(lastOperationRequested, this);

  //update ui - buttons-to-commit to reflect any needed changes
  updateButtonsToCommit();
  //update ui - buttons-since-clear to reflect any needed changes 
  updateButtonsSinceClear();

}


const buttons = document.querySelectorAll('button');

buttons.forEach( (button) => {
  button.addEventListener('click', processButton)
});
