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
