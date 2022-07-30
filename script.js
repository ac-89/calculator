const calculator = document.querySelector(`.calc-body`);
const numButtons = document.querySelectorAll("button");
const display = document.querySelector(`.screen`);

const calculate = (n1, operator, n2) => {
  const firstNum = parseFloat(n1);
  const secondNum = parseFloat(n2);
  if (operator === "plus") return firstNum + secondNum;
  if (operator === "minus") return firstNum - secondNum;
  if (operator === "multiply") return firstNum * secondNum;
  if (operator === "divide") return firstNum / secondNum;
};

const createResultString = () => {
  //Variables
  //1. keyContent
  //2. displayedNum
  //3. previousKeyType
  //4. action
  //5. calculator.dataset.firstValue
  //6. calculator.dataset.operator
  if (!action) {
    return displayedNum === `0` || previousKeyType === `operator`
      ? value
      : displayedNum + value;
  }
  if (action === "decimal") {
    if (!displayedNum.includes(`.`)) return displayedNum + `.`;
    if (previousKeyType === `operator` || previousKeyType === `calculate`)
      return `0.`;
    return displayedNum;
  }
  calculator.dataset.previousKeyType = `decimal`;
  if (
    action === "plus" ||
    action === "minus" ||
    action === "multiply" ||
    action === "divide"
  ) {
    const firstValue = calculator.dataset.firstValue;
    const operator = calculator.dataset.operator;
    return firstValue &&
      operator &&
      previousKeyType !== `operator` &&
      previousKeyType !== `calculate`
      ? calculate(firstValue, operator, displayedNum)
      : displayedNum;
  }
  if (action === "clear") return 0;

  if (action === "all-clear") return 0;

  if (action === `equals`) {
    let firstValue = calculator.dataset.firstValue;
    const operator = calculator.dataset.operator;
    let secondValue = displayedNum;
    return firstValue
      ? previousKeyType === `equals`
        ? calculate(displayedNum, operator, modValue)
        : calculate(firstValue, operator, displayedNum)
      : displayedNum;
  }
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
    if (action === "all-clear") {
      calculator.dataset.firstValue = "";
      calculator.dataset.modValue = "";
      calculator.dataset.operator = "";
      calculator.dataset.previousKeyType = "";
      display.textContent = "0";
      calculator.dataset.previousKeyType = "clear";
    }
    if (action === "decimal") {
      if (!displayedNum.includes(`.`)) {
        display.textContent = displayedNum + `.`;
      } else if (
        previousKeyType === `operator` ||
        previousKeyType === `calculate`
      ) {
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

      if (
        firstValue &&
        operator &&
        previousKeyType !== `operator` &&
        previousKeyType !== `calculate`
      ) {
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
      let firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      let secondValue = displayedNum;
      console.log(firstValue, operator, secondValue);
      if (firstValue) {
        if (previousKeyType === `equals`) {
          firstValue = displayedNum;
          secondValue = calculator.dataset.modValue;
        }
        display.textContent = calculate(firstValue, operator, secondValue);

        // calculator.dataset.firstValue = calcValue;
        calculator.dataset.modValue = secondValue;
        calculator.dataset.previousKeyType = `equals`;
        //   calculator.dataset.operator = null;
      }
    }
  });
});
