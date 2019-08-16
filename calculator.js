let add = (a,b) =>  a + b;
let substract = (a,b) =>  a - b;
let multiply = (a,b) =>  a * b;
let divide = (a,b) =>  a / b;
let operate = (operator, a, b) => {
  switch (operator) {
    case "+":
      return add(a,b);
      break;
    case "-":
      return substract(a,b);
      break;
    case "*":
      return multiply(a,b);
      break;
    case "/":
      return divide(a,b);
      break;
  }
}
//Define all buttons and groups of buttons
let buttons = document.getElementsByClassName('button');
let operButtons = document.getElementsByClassName('oper');
let resultDisplay = document.getElementsByClassName('result')[0];
let inputDisplay = document.getElementsByClassName('input')[0];
let clearButton = document.getElementsByClassName('clear')[0];
let dotButton = document.getElementsByClassName('dot')[0];

//Define the functions
let toggleButtonAnimation = () => event.target.classList.toggle('clicked');
let revertClass = () => event.target.classList.toggle('clicked');
let displayNumber = () => {
  if (inputDisplay.textContent.length < 15) {
    inputDisplay.textContent += event.target.textContent;
  }
}
let blockDecimals = () => {
  if (inputDisplay.textContent.indexOf(".") > 0) {
    event.target.removeEventListener("click", displayNumber);
  }
}

Array.from(buttons).forEach( x => {
  x.addEventListener("click", toggleButtonAnimation);
  x.addEventListener("click", displayNumber);
  x.addEventListener("transitionend", revertClass);
})

Array.from(operButtons).forEach( x => {
  x.removeEventListener("click", displayNumber);
})

dotButton.addEventListener("click", blockDecimals);
