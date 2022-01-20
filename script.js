const body = document.querySelector("body");
const container = document.querySelector(".container")

const buttons = document.querySelectorAll("[data-number]");
const buttonsMath = document.querySelectorAll(".buttonsMath");
const operationsP = document.querySelector("#operationsP");
const historyP = document.querySelector("#historyP");
const placeholderP = document.querySelector("#operandPlacegolder");

let operator = ""; // math operator
let operand1 = "";
let operand2 = "";
let result = ""; // return result

operate = (a, b, operator) => {
    a = operand1;
    b = operand2;
    switch (operator) {
        case '+':
            return  (a + b);
        case '-': 
            return (a - b);
        case "X": 
            return (a * b);
        case "EXP":
            return Math.pow(a, b);
        /* factorial = (n) => {
            if (n === 0) return 1; else return n * factorial (n -1);
        };*/
        case "÷":
            if (b === 0) alert ("Nice try!") 
            else return a / b;
        break;
    }
};
fullVisorClean = () => {
    operationsP.textContent = ".";
    addBlinking(operationsP);
    historyP.textContent = "";
    placeholderP.textContent = "";
}
visorClean = () => {
    operationsP.textContent = ".";
    addBlinking(operationsP);
}
getEventListeners = () => {
    const acBtn = document.querySelector("#acBtn");
    acBtn.addEventListener("click", fullVisorClean);

    cBtn = document.querySelector("#cBtn");
    cBtn.addEventListener("click", visorClean);

    buttons.forEach((button) => 
        button.addEventListener("click", () => writeVisorNumber(button.textContent))
    );
    buttonsMath.forEach((buttonMath => 
        buttonMath.addEventListener("click", () => getOperands(buttonMath.textContent))
        ));

    operateBtn = document.querySelector(".operate");
    operateBtn.addEventListener("click", () => console.log("FUUUUUUUUCK"));
}
stopBlinking = () => {
    const visorPBlink = document.querySelector(".visorPBlink")
    if (visorPBlink) visorPBlink.setAttribute("class", 'visorP');
}
addBlinking = (operationsP) => {
    operationsP.setAttribute("class", 'visorPBlink');
}
addBlinking = () => {
    const visorPBlink = document.querySelector("#operationsP");  
    visorPBlink.setAttribute("class", "visorPBlink");
}
writeVisorNumber = (number) => {
    if (operationsP.textContent === '.') operationsP.textContent="";
    operationsP.setAttribute("class", "visorP");
    operationsP.textContent.toString().length <= 15? operationsP.textContent += number : ("Exceeded maximum of 15 numbers");
}
writeResult = (number) => {
    const stringResult = number.toString().length;
    stringResult > 15? alert ("Exceeded maximum of 15 numbers") : historyP.textContent = number;
}
writeVisorOperand = () => {
    placeholderP.textContent = operationsP.textContent;
}
getOperands = (button) => {
        if (!operand1) operand1 = Number(operationsP.textContent)
        else if (!operand2) operand2 = Number(operationsP.textContent);
        else if (operand1 && operand2) {
            operand1 = operand2;
            operand2 = Number(operationsP.textContent);
        }
        operator = button;
        writeVisorNumber(button);
        writeVisorOperand(button);
        visorClean();
        console.log({operand1}, {operand2}, operator)
        result = operate(operand1, operand2, operator)
        historyP.textContent = `${result}`;

    }


// function activators //
getEventListeners();
