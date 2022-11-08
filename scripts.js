let buttonsPressedArray = [];

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

function isButtonToLog(buttonId) {
  if (buttonId === 'clear') {
    clear();
    return 0;
  }

  if (buttonId === 'backspace') {
    backspace();
    return 0;
  }

  if (buttonId === 'equals') {
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