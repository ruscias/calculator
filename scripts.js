let buttonsPressedArray = [];

const buttons = document.querySelectorAll('button');

buttons.forEach( (button) => {
  button.addEventListener('click', main)
});

function clear(buttonPressed) {
  const divButtonPressed = document.querySelector('div#button-pressed');
  divButtonPressed.innerText = '';  
  const divOperationsSinceClear = document.querySelector('div#operations-since-clear');
  buttonsPressedArray = [];
  divOperationsSinceClear.innerText = buttonsPressedArray
}

function updateOperationsSinceClear() {
  const divOperationsSinceClear = document.querySelector('div#operations-since-clear');
  divOperationsSinceClear.innerText = buttonsPressedArray.join(' ');
}

function backspace() {
  if (buttonsPressedArray.length === 0) {
    return 0;
  }
  buttonsPressedArray.pop();
  updateOperationsSinceClear();
  console.log(buttonsPressedArray);
}

function showButtonPressed(buttonPressed) {
  const divButtonPressed = document.querySelector('div#button-pressed');
  divButtonPressed.innerText = buttonPressed;
  buttonsPressedArray.push(buttonPressed);  
}

function main() {
  if (this.id === 'clear') {
    clear();
    return 0;
  }

  if (this.id === 'backspace') {
    backspace();
    return 0;
  }
  // put those if statements in something - a function to check the buttons we don't want to log maybe?
  showButtonPressed(this.innerText);
  updateOperationsSinceClear();
} 