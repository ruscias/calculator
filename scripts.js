const buttons = document.querySelectorAll('button');

buttons.forEach( (button) => {
  button.addEventListener('click', main)
});

function showButtonPressed (buttonPressed) {
  const divButtonPressed = document.querySelector('div#button-pressed');
  divButtonPressed.innerText = buttonPressed;  
}

function main() {
  showButtonPressed(this.id);
} 