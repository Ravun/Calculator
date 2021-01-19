const calculator = {
  displayValue: '0', // input of user
  firstOperand: null,
  secondOperand: false, // checks if both the first operand and the operator are inputted.
  operator: null, // stores the operator for an expression
};

const keys = document.querySelector('.calculatorKeys');


// functions


//updating display

function updateDisplay() {

  const display = document.querySelector('.display');
  display.value = calculator.displayValue;  // updates the value of the element with the content of displayvalue

}
updateDisplay();

function inputNumber(number) {
  const {displayValue,  secondOperand} = calculator; //A property can be unpacked from an object and assigned to a variable with a different name than the object property.

  if (secondOperand === true) { // if this is true then the displayed value is overwritten
    calculator.displayValue = number;
    calculator.secondOperand = false;
  } else { // if its false then we do the same check as above
    calculator.displayValue = displayValue === '0' ? number : displayValue + number;
  }
  console.log(calculator);
}

function inputDecimal(period) {
  if (!calculator.displayValue.includes(period)) // if the displayedvalue does not have a decimal
  {
    calculator.displayValue = calculator.displayValue + period;
  }

}

function operators(handleOperators) {
  const {    firstOperand,    displayValue,    operator  } = calculator; // destructuring the porpers on the calculatoe object
  const inputNum = parseFloat(displayValue); // convert to float number

if(operator && calculator.secondOperand){
  calculator.operator = handleOperators;
  console.log(calculator);
  return;
}
  if (firstOperand === null && !isNaN(inputNum)) // input is a legal number
  {
    calculator.firstOperand = inputNum;
  } else if (operator) { // if its assigned an operator
    const result = calculate(firstOperand, inputNum, operator);
    calculator.displayValue = String(result); // result is displayed to user
    calculator.firstOperand = result; // first operand is set from result to use calculator again
  }
  calculator.secondOperand = true;
  calculator.operator = handleOperators;
  console.log(calculator);
}
// calculate
function calculate(firstOperand, secondOp, operator) {
  if (operator === '+') {
    return firstOperand + secondOp;
  } else if (operator === '-') {
    return firstOperand - secondOp;
  } else if (operator === '*') {
    return firstOperand * secondOp;
  } else if (operator === '/') {
    return firstOperand / secondOp;
  }
  return secondOp; // if the operator is =
}

function clearKeys(){

  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.secondOperand = false; // checks if both the first operand and the operator are inputted.
  calculator.operator= null; // stores the operator for an expression
  console.log(calculator);
}


// event listeners

keys.addEventListener('click', (event) => {
  const target = event.target;

  if (!target.matches('button')) {
    return;
  }
  if (target.classList.contains('operator')) { // contains / * - +
    operators(target.value);
    updateDisplay();
    return;
  }
  if (target.classList.contains('decimal')) { // containts .
    inputDecimal(target.value); // passes the decimal
    updateDisplay();
    return;
  }
  if (target.classList.contains('clear')) { // containts C
    clearKeys();// ckears the screen
    updateDisplay();
    return;
  }

  inputNumber(target.value); // containts number
  updateDisplay();
});
