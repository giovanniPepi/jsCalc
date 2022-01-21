const body = document.querySelector("body");
const container = document.querySelector(".container")

const numBtn = document.querySelectorAll("[data-number]");
const buttonsMath = document.querySelectorAll(".buttonsMath");
const currentOperation = document.querySelector("#currentOperation");
const resultP = document.querySelector("#resultP");

let operator = ""; // math operator
let operand1 = '';
let operand2 = '';
let shouldRefreshScreen = false;

getEventListeners = () => {
    const acBtn = document.querySelector("#acBtn");
    acBtn.addEventListener("click", fullVisorClean);

    cBtn = document.querySelector("#cBtn");
    cBtn.addEventListener("click", visorClean);

    numBtn.forEach((button) => 
        button.addEventListener("click", () => writeVisorNumber(button.textContent))
    );
    buttonsMath.forEach((buttonMath => buttonMath.addEventListener("click", () => setOperator(buttonMath.textContent))
    ));
    operateBtn = document.querySelector(".operate");
    operateBtn.addEventListener("click", () => evaluate());
}


function evaluate () {
    if (shouldRefreshScreen) return;
    operand2 = currentOperation.textContent; 
    currentOperation.textContent = getMath (operand1, operand2, operator);
    resultP.textContent = `${operand1} ${operator} ${operand2} `;
}

function writeVisorNumber (number) {
    if (currentOperation.textContent === '.' || shouldRefreshScreen) currentOperation.textContent = "";
    stopBlinking();
    currentOperation.textContent += number;
}


fullVisorClean = () => {
    currentOperation.textContent = ".";
    addBlinking(currentOperation);
    resultP.textContent = "";
    shouldRefreshScreen = false;
}
visorClean = () => {
    currentOperation.textContent = ".";
    addBlinking(currentOperation);
    shouldRefreshScreen = false;
}
stopBlinking = () => {
    const visorPBlink = document.querySelector(".visorPBlink")
    if (visorPBlink) visorPBlink.setAttribute("class", 'visorP');
}
addBlinking = (currentOperation) => {
    currentOperation.setAttribute("class", 'visorPBlink');
    addBlinking = () => {
        const visorPBlink = document.querySelector("#currentOperation");  
        visorPBlink.setAttribute("class", "visorPBlink");
    }
}

function setOperator (op){
    operator = op;
    operand1 = currentOperation.textContent;
    resultP.textContent = `${operand1} ${operator}`;
    shouldRefreshScreen = true;
    return operator;    
}


function getMath (a, b, operator) {
    a = Number(a);
    b = Number(b);

    switch (operator) {
        case '+':
            return (a + b);
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












///

getEventListeners();