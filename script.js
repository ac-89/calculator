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

const getKeyType = (key) => {
  const { action } = key.dataset;
  if (!action) return `number`;
  if (
    action === "plus" ||
    action === "subtract" ||
    action === "multiply" ||
    action === "divide"
  )
    return `operator`;
  return action;
};

const createResultString = (key, displayedNum, state) => {
  const value = key.textContent;
  const keyType = getKeyType(key);
  const { firstValue, operator, modValue, previousKeyType } = state;

  if (keyType === `number`) {
    return displayedNum === `0` ||
      previousKeyType === `operator` ||
      previousKeyType === `equals`
      ? value
      : displayedNum + value;
  }

  if (keyType === "decimal") {
    if (!displayedNum.includes(`.`)) return displayedNum + `.`;
    if (previousKeyType === `operator` || previousKeyType === `equals`)
      return `0.`;
    return displayedNum;
  }
  if (keyType === `operator`) {
    return firstValue &&
      operator &&
      previousKeyType !== `operator` &&
      previousKeyType !== `equals`
      ? calculate(firstValue, operator, displayedNum)
      : displayedNum;
  }
  if (keyType === "clear") return 0;

  if (keyType === "all-clear") return 0;

  if (keyType === `equals`) {
    return firstValue
      ? previousKeyType === `equals`
        ? calculate(displayedNum, operator, modValue)
        : calculate(firstValue, operator, displayedNum)
      : displayedNum;
  }
};

const updateCalculatorState = (
  key,
  calculator,
  calculatedValue,
  displayedNum
) => {
  const keyType = getKeyType(key);
  const { firstValue, operator, modValue, previousKeyType } =
    calculator.dataset;

  calculator.dataset.previousKeyType = keyType;

  if (keyType === "operator") {
    calculator.dataset.operator = key.dataset.action;
    calculator.dataset.firstValue =
      firstValue &&
      operator &&
      previousKeyType !== `operator` &&
      previousKeyType !== `equals`
        ? calculatedValue
        : displayedNum;
  }
  if (keyType === "all-clear") {
    calculator.dataset.firstValue = "";
    calculator.dataset.modValue = "";
    calculator.dataset.operator = "";
    calculator.dataset.previousKeyType = "";
  }
  if (keyType === "equals") {
    calculator.dataset.modValue =
      firstValue && previousKeyType === `equals` ? modValue : displayedNum;
  }
};

numButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // if (e.target.matches(`button`)) return;
    const key = btn;
    console.log(e.target, btn);
    const displayedNum = display.textContent;
    const resultString = createResultString(
      key,
      displayedNum,
      calculator.dataset
    );
    display.textContent = resultString;
    updateCalculatorState(key, calculator, resultString, displayedNum);
  });
});
