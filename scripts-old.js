let buttonsPressedArray = [];
let lastOperationRequested = '';
let numbersToProcess = ['0'];
let currentIndexNumbersToProcess = 0;
let decimalRequested = false; 

const buttons = document.querySelectorAll('button');

buttons.forEach( (button) => {
  button.addEventListener('click', main)
});

function clear() {
  const divButtonPressed = document.querySelector('div#button-pressed');
  divButtonPressed.innerText = '';  
  const divOperationsSinceClear = document.querySelector('div#operations-since-clear');
  buttonsPressedArray = [];
  numbersToProcess = [0];
  divOperationsSinceClear.innerText = buttonsPressedArray
}

function backspace() {
  if (buttonsPressedArray.length === 0) {
    return 0;
  }
  buttonsPressedArray.pop();
  if (numbersToProcess[currentIndexNumbersToProcess] !== '0') {
    numbersToProcess[currentIndexNumbersToProcess] = numbersToProcess[currentIndexNumbersToProcess].slice(0, -1);
  }
}

function equals() {
  if (numbersToProcess.length === 1) {
    return numbersToProcess[0];
  }

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

  buttonsPressedArray = [];
  lastOperationRequested = '';
  numbersToProcess = [0];
  currentIndexNumbersToProcess = 0;
  decimalRequested = false; 

  return result;
}

function processNumberModifier(buttonId) {
  if (buttonId === 'period' && decimalRequested !== true) {
    decimalRequested = true; 
    numbersToProcess += '.';
  }

  if (buttonId === 'positive-or-negative' && numbersToProcess[currentIndexNumbersToProcess] > 0) {
    numbersToProcess[currentIndexNumbersToProcess] = numbersToProcess[currentIndexNumbersToProcess] * -1;
  }

}

function isOperation(buttonPressedClass, buttonPressedId) {
  if (buttonPressedClass === 'operation' && numbersToProcess.length === 1) {
    lastOperationRequested = buttonPressedId;
    currentIndexNumbersToProcess = 1;
  }

  if (buttonPressedClass === 'operation' && numbersToProcess.length === 2) {
    equals();
  }
}

function isButtonToLog(buttonId, buttonClass) {
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

  if (buttonClass === 'number-modifier') {
    processNumberModifier(buttonId);
    return 0;
  }

  if (buttonId === 'equals') {
    equals();
    return 0;
  }
}

function processButton(buttonPressed) {
  if (isButtonToLog(buttonPressed.id,buttonPressed.className) === 0) {
    return 0;
  }
  
  isOperation(buttonPressed.className, buttonPressed.id);

  const divButtonPressed = document.querySelector('div#button-pressed');
  divButtonPressed.innerText = buttonPressed.innerText;
  buttonsPressedArray.push(buttonPressed.innerText);
  if (numbersToProcess[currentIndexNumbersToProcess] === '0') {
    numbersToProcess[currentIndexNumbersToProcess] = buttonPressed.innerText;
  } else {
    numbersToProcess[currentIndexNumbersToProcess] += buttonPressed.innerText;
  }
}

function updateOperationsSinceClear() {
  const divOperationsSinceClear = document.querySelector('div#operations-since-clear');
  divOperationsSinceClear.innerText = buttonsPressedArray.join(' ');
}

function main() {
  processButton(this);
  console.log(numbersToProcess[0]);
  updateOperationsSinceClear();
} 