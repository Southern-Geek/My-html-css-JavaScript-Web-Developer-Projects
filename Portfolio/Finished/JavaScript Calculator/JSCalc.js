import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";

const display = document.getElementById("display");

let currentNum = "";
let prevNum = "";
let currentFactor = "";

//Display:
const updNum = () => {
  display.textContent = currentNum || "0";
};

// AC function:
const clear = () => {
  currentNum = "";
  prevNum = "";
  currentFactor = "";
  updNum();
};

// Numbers:
const factorNum = (num) => {
  if (currentNum === "0" || currentNum === "-0") {
    currentNum = num.toString();
  } else {
    currentNum += num.toString();
  }
  updNum();
};

// Decimal:
const addDec = () => {
  if (!currentNum.includes(".")) {
    currentNum += ".";
    updNum();
  }
};

// Factor:
const addFactor = (factor) => {
  if (currentNum !== "") {
    currentFactor = factor;
    prevNum = currentNum;
    currentNum = "";
  }
};

const calculation = () => {
  if (prevNum !== "" && currentNum !== "" && currentFactor !== "") {
    const num1 = parseFloat(prevNum);
    const num2 = parseFloat(currentNum);
    let answer = 0;

    switch (currentFactor) {
      case "+":
        answer = num1 + num2;
        break;
      case "-":
        answer = num1 - num2;
        break;
      case "*":
        answer = num1 * num2;
        break;
      case "/":
        answer = num2 !== 0 ? num1 / num2 : "Error";
        break;
    }

    currentNum = answer.toString();
    prevNum = "";
    currentFactor = "";
    updNum();
  }
};

// Event listeners & query selectors:

document.querySelectorAll(".num-calc").forEach((button) => {
  button.addEventListener("click", () => factorNum(button.textContent));
});

document.getElementById("dec").addEventListener("click", addDec);
document.getElementById("AC").addEventListener("click", clear);

document.querySelectorAll(".factor").forEach((button) => {
  button.addEventListener("click", () => addFactor(button.textContent));
});

document.getElementById("equals").addEventListener("click", calculation);
