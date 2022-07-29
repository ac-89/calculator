const calculator = document.querySelector(`.calc-body`);
const numButtons = document.querySelectorAll("button");
const display = document.querySelector(`.screen`);

const calculate = (n1, operator, n2) => {
  let result = "";
  if (operator === "plus") {
    result = parseFloat(n1) + parseFloat(n2);
  } else if (operator === "minus") {
    result = parseFloat(n1) - parseFloat(n2);
  } else if (operator === "multiply") {
    result = parseFloat(n1) * parseFloat(n2);
  } else if (operator === "divide") {
    result = parseFloat(n1) / parseFloat(n2);
  }

  return result;
};

numButtons.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const key = e.target;
    const action = key.dataset.action;
    const previousKeyType = calculator.dataset.previousKeyType;
    const displayedNum = display.textContent;
    const value = e.target.textContent;
    if (!action) {
      if (displayedNum === `0` || previousKeyType === `operator`) {
        display.textContent = value;
      } else {
        display.textContent = displayedNum + value;
      }
      calculator.dataset.previousKeyType = `number`;
    }
    if (action === "clear") {
      calculator.dataset.previousKeyType = `clear`;
      display.textContent = "0";
    }
    if (action === "decimal") {
      if (!displayedNum.includes(`.`)) {
        display.textContent = displayedNum + `.`;
      } else if (previousKeyType === `decimal`) {
        display.textContent = `0.`;
      }
      calculator.dataset.previousKeyType = `decimal`;
    }

    if (
      action === "plus" ||
      action === "minus" ||
      action === "multiply" ||
      action === "divide"
    ) {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      if (firstValue && operator && previousKeyType !== `operator`) {
        const calcValue = calculate(firstValue, operator, secondValue);
        display.textContent = calcValue;
        calculator.dataset.firstValue = calcValue;
      } else {
        calculator.dataset.firstValue = displayedNum;
      }
      calculator.dataset.previousKeyType = `operator`;
      calculator.dataset.operator = action;
    }
    if (action === `equals`) {
      calculator.dataset.previousKeyType = `equals`;
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      //   calculator.dataset.secondValue = displayedNum;
      //   console.log(firstValue + secondValue);
      console.log(firstValue, operator, secondValue);
      display.textContent = calculate(firstValue, operator, secondValue);
    }
  });
});
