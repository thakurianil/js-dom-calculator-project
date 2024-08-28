
const allButtonsElement = document.querySelectorAll(".btn");

let strToDisplay = "";
const displayElm = document.querySelector(".display");
const displayElm1 = document.querySelector(".display1");
const operators = ["%", "+", "-", "*", "/"];
const lastOperator = "";

allButtonsElement.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.innerText;
    buttonAction(value);
  });
});

const buttonAction = (value) => {
  if (value === "AC") {
    strToDisplay = "";
    displayElm1.innerText = "";
    return display(strToDisplay);
  }
  if (value === "C") {
    strToDisplay = strToDisplay.slice(0, -1);
    displayElm1.innerText = displayElm1.innerText.slice(0, -1);
    return display(strToDisplay);
  }

  if (value === "=") {
    const lastCharacter = strToDisplay[strToDisplay.length - 1];
    if (operators.includes(lastCharacter)) {
      strToDisplay = strToDisplay.slice(0, -1);
    }
    return totalCalculation();
  }

  //show only  last clicked operator
  if (operators.includes(value)) {
    const lastCharacter = strToDisplay[strToDisplay.length - 1];
    {
      if (operators.includes(lastCharacter)) {
        strToDisplay = strToDisplay.slice(0, -1);
      }
    }
  }

  //handle the dot
  if (value === ".") {
    if (!lastOperator) {
      if (operators.includes(strToDisplay[strToDisplay.length - 1])) {
        return;
      } else {
        const lastOperatorIndex = strToDisplay.lastIndexOf(lastOperator);
        const lastNumberSet = strToDisplay.slice(lastOperatorIndex - 1);

        if (lastNumberSet.includes(".")) {
          return;
        }
      }
    }
  }

  strToDisplay += value;
  display(strToDisplay);
  displayElm1.innerText = strToDisplay;
};

const display = (str) => {
  displayElm1.innerText = str || "0";
  displayElm.innerText = str || "0.0";
};

//calculate total calculations
const totalCalculation = () => {
  try {
    const total = eval(strToDisplay);
    display(total);
    strToDisplay = total;
  } catch (error) {
    display("Error");
    displayElm1.innerText = "";
  }
};
document.addEventListener("keydown", (e) => {
  const key = e.key;
  if (key === "Backspace") {
    buttonAction("C");
  } else if (key === "Enter" || key === "=") {
    buttonAction("=");
  } else if (
    [
      "%",
      "+",
      "-",
      "*",
      "/",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
    ].includes(key)
  ) {
    buttonAction(key);
  }
});