let add = (a,b) =>  a + b;
let substract = (a,b) =>  a - b;
let multiply = (a,b) =>  a * b;
let divide = (a,b) =>  a / b;
let operate = (a,b,operator) => {
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
      if(b != 0) {
        return divide(a,b);
        break;
      }
  }
}
//Define all buttons and groups of buttons
let resultDisplay = document.getElementsByClassName('result')[0];
let inputDisplay = document.getElementsByClassName('input')[0];
let buttons = document.getElementsByClassName('button');
let numbers = document.getElementsByClassName('number');
let dotButton = document.getElementsByClassName('dot')[0];
let operButtons = document.getElementsByClassName('oper');
let clearButton = document.getElementsByClassName('clear')[0];
let delButton = document.getElementsByClassName('del')[0];
let equalButton = document.getElementsByClassName('equal')[0];
let valueMemory = "";
let allOperands = [];
let resultValue = "";

//Define the functions
let toggleButtonAnimation = () => event.target.classList.toggle('clicked');
let revertClass = () => event.target.classList.toggle('clicked');
let displayNumber = () => {
  if (inputDisplay.textContent.length < 18) {
    valueMemory += event.target.textContent;
    inputDisplay.textContent += " " + event.target.textContent;
  }
}
let displayOperand = () => {
  if (valueMemory == "" && resultValue != "") {
    allOperands.push(parseFloat(resultValue.toFixed(2)));
    allOperands.push(event.target.textContent);
    inputDisplay.textContent = "Ans " + " " + event.target.textContent;
    resultValue = "";
  } else if (valueMemory != "") {
    allOperands.push(parseFloat(valueMemory));
    allOperands.push(event.target.textContent);
    valueMemory = "";
    inputDisplay.textContent += " " + event.target.textContent;
  }
}

let addDecimal = () => {
  if (!(valueMemory.indexOf(".") > -1)) {
    valueMemory += event.target.textContent;
    inputDisplay.textContent += event.target.textContent;
  }
}
let clearDisplay = () => {
  inputDisplay.textContent = "";
  resultDisplay.textContent = "";
  allOperands = [];
}

let reduceOperator = (array,string) =>{
  while (array.indexOf(string) > -1){
    let numberIndex = array.indexOf(string);
    let newNumber = operate(array[numberIndex - 1], array[numberIndex + 1], array[numberIndex]);
    array.splice(numberIndex - 1, 3, newNumber);
  }
}

let calculate = () => {
  if (valueMemory != ""){
    allOperands.push(parseFloat(valueMemory));
    valueMemory = "";
  }
  reduceOperator(allOperands, "*");
  reduceOperator(allOperands, "/");
  reduceOperator(allOperands, "+");
  reduceOperator(allOperands, "-");
  resultValue = parseFloat(allOperands[0]);
  if (resultValue === resultValue) {
    resultValue % 1 != 0 ? resultDisplay.textContent = resultValue.toFixed(2)
    : resultDisplay.textContent = resultValue;
    inputDisplay.textContent = "";
    allOperands = [];
  } else {
    resultDisplay.textContent = "ERROR :("
    inputDisplay.textContent = "";
  }
}

let deleteLast = () => {
  let newInputDisplay = inputDisplay.textContent.slice(0,inputDisplay.textContent.length-1);
  inputDisplay.textContent = newInputDisplay;
  let newValueMemory = valueMemory.slice(0,valueMemory.length-1);
  valueMemory = newValueMemory;
}

//Assign functions
Array.from(buttons).forEach( x => {
  x.addEventListener("click", toggleButtonAnimation);
  x.addEventListener("transitionend", revertClass);
})
Array.from(numbers).forEach( x => {
  x.addEventListener("click", displayNumber);
})

Array.from(operButtons).forEach (x => {
  x.addEventListener("click", displayOperand);
})

dotButton.addEventListener("click", addDecimal);

equalButton.removeEventListener("click", displayOperand);
equalButton.addEventListener("click", calculate);

delButton.removeEventListener("click", displayOperand);
delButton.addEventListener("click", deleteLast);

clearButton.removeEventListener("click", displayOperand);
clearButton.addEventListener("click", clearDisplay);
