let buttonsPressedArray = [];
let lastOperationRequested = '';
let numbersToProcess = [0]
let currentIndexNumbersToProcess = 0;

const buttons = document.querySelectorAll('button');

buttons.forEach( (button) => {
  button.addEventListener('click', main)
});

function clear() {
  const divButtonPressed = document.querySelector('div#button-pressed');
  divButtonPressed.innerText = '';  
  const divOperationsSinceClear = document.querySelector('div#operations-since-clear');
  buttonsPressedArray = [];
  divOperationsSinceClear.innerText = buttonsPressedArray
}

function backspace() {
  if (buttonsPressedArray.length === 0) {
    return 0;
  }
  buttonsPressedArray.pop();
}

function equals() {
  numbersToProcess = [1,2];
  lastOperationRequested = 'exp';
  let result = 0;
  
  switch (lastOperationRequested) {
    case 'subtract':
      result = numbersToProcess[0] - numbersToProcess[1];
      break;
    case 'add': 
      result = numbersToProcess[0] + numbersToProcess[1];
      break;
    case 'multiply':
      result = numbersToProcess[0] * numbersToProcess[1];
      break;
    case 'exp':
      result = numbersToProcess[0] ** numbersToProcess[1];
      break;
    case 'divide':
      result = numbersToProcess[0] / numbersToProcess[1];
      break;
    default:
      result = 0;
  }
  numbersToProcess = [0];
  lastOperationRequested = '';
  return result;
}

function isButtonToLog(buttonId) {

//add positive or negative button
//add percent button

  if (buttonId === 'clear') {
    clear();
    return 0;
  }

  if (buttonId === 'backspace') {
    backspace();
    return 0;
  }

  if (buttonId === 'equals') {
    console.log(equals());
    return 0;
  }
}

function processButton(buttonPressed) {
  if (isButtonToLog(buttonPressed.id) === 0) {
    return 0;
  }
  const divButtonPressed = document.querySelector('div#button-pressed');
  divButtonPressed.innerText = buttonPressed.innerText;
  buttonsPressedArray.push(buttonPressed.innerText);  
}

function updateOperationsSinceClear() {
  const divOperationsSinceClear = document.querySelector('div#operations-since-clear');
  divOperationsSinceClear.innerText = buttonsPressedArray.join(' ');
}

function main() {
  processButton(this);
  updateOperationsSinceClear();
} 