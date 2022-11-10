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

  if (buttonsToCommit.length > 0) {
    commitNumbers();
  }
  
  if (button.id === 'equals') {
    return 0;  
  } 
  
  let lastOperationRequestedSymbol = button.innerText;
  if (lastOperationRequested !== '') {
    buttonsSinceClear.pop();
  }
  buttonsSinceClear.push(lastOperationRequestedSymbol)
  lastOperationRequested = button.id;

}

function makeAnyCalculations(operationRequested) {
  if (numbersToProcess.length < 2) {
    return 0;
  }

  let result = 0;
  console.log(`operation ${operationRequested}`);
  switch (operationRequested) {
    case 'subtract':
      result = subtract(numbersToProcess[0], numbersToProcess[1]);
      break;
    case 'add': 
      result = add(numbersToProcess[0], numbersToProcess[1]);
      break;
    case 'multiply':
      result = multiply(numbersToProcess[0], numbersToProcess[1]);
      break;
    case 'exp':
      result = exp(numbersToProcess[0], numbersToProcess[1]);
      break;
    case 'divide':
      result = divide(numbersToProcess[0], numbersToProcess[1]);
      break;
    default:
      result = 0;
  }
  clear();
  console.log(`result ${result}`);
  buttonsToCommit = '';
  buttonsSinceClear = [result];
  numbersToProcess = [result];
  lastOperationRequested = '';
}

function updateButtonsToCommit() {
  const divButtonsToCommit = document.querySelector('div.buttons-to-commit');
  if (buttonsToCommit.length === 0) {
    divButtonsToCommit.innerText = '0';
  } else {
    divButtonsToCommit.innerText = buttonsToCommit;
  }
}

function updateButtonsSinceClear() {
  const divButtonsSinceClear = document.querySelector('div.buttons-since-clear');
  divButtonsSinceClear.innerText = buttonsSinceClear.join(' ');
}

function processButton() {
  console.log(this);
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

  makeAnyCalculations(lastOperationRequested);

  //update ui - buttons-to-commit to reflect any needed changes
  updateButtonsToCommit();
  //update ui - buttons-since-clear to reflect any needed changes 
  updateButtonsSinceClear();

}


const buttons = document.querySelectorAll('button');

buttons.forEach( (button) => {
  button.addEventListener('click', processButton)
});
