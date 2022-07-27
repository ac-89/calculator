let buttons = document.querySelectorAll("button");
let display = document.querySelector(`.screen`);

console.log(buttons);
console.log(display);

buttons.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    console.log(e);
    display.textContent += e.target.innerHTML;
  });
});

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(a, o, b) {
  if (o == "+") {
    add(a, b);
  } else if (o == "-") {
    subtract(a, b);
  } else if (o == "*") {
    multiply(a, b);
  } else if (o == "/") {
    divide(a, b);
  }
}

// function screen{

// }

// activateBtns();
