const body = document.querySelector("body");
const container = document.querySelector(".container")

const numBtn = document.querySelectorAll("[data-number]");
const operatBtn = document.querySelectorAll(".operatBtn");
const currentVisor = document.querySelector("#currentVisor");
const resultP = document.querySelector("#resultP");

let operationMode = null; // math operator
let operand1 = '';
let operand2 = '';
let shouldRefreshScreen = false;

stopBlinking = () => {
    currentVisor.setAttribute("class", 'visorP');
}
addBlinking = (currentVisor) => {
    currentVisor.setAttribute("class", 'visorPBlink');
}
fullVisorClean = () => {
    currentVisor.textContent = ".";
    addBlinking(currentVisor);
    resultP.textContent = "";
    operand1 = '';
    operand2 = '';
    operationMode = null;
    shouldRefreshScreen = false;
}
visorCleanBlink = () => {
    currentVisor.textContent = ".";
    addBlinking(currentVisor);
    shouldRefreshScreen = false;
}
visorClean = () => {
    currentVisor.textContent = "";
    addBlinking(currentVisor);
    shouldRefreshScreen = false;
}
getEventListeners = () => {
    const acBtn = document.querySelector("#acBtn");
    acBtn.addEventListener("click", fullVisorClean);

    cBtn = document.querySelector("#cBtn");
    cBtn.addEventListener("click", visorCleanBlink);

    numBtn.forEach((button) => 
        button.addEventListener("click", () => writeVisorNumber(button.textContent))
    );
    
    operatBtn.forEach((btn => btn.addEventListener("click", () => setOperation(btn.textContent))
    ));

    evaluateBtn = document.querySelector(".evaluate");
    evaluateBtn.addEventListener("click", () => evaluate());

    window.addEventListener('keydown', processKeyboardInpt);
}
function writeVisorNumber (number) {
    if (currentVisor.textContent === '.' || shouldRefreshScreen) visorClean();
    stopBlinking();
    currentVisor.textContent += number;
}
function setOperation (operator){
    if (operationMode !== null) evaluate();
    if (currentVisor.textContent !== ".") operand1 = currentVisor.textContent;
    operationMode = operator;   
    resultP.textContent = `${operand1} ${operationMode}`;
    shouldRefreshScreen = true;
}
function evaluate () {
    if (shouldRefreshScreen || operationMode === null) return;
    operand2 = currentVisor.textContent; 
    currentVisor.textContent = round(getMath(operand1, operand2, operationMode));
    resultP.textContent = `${operand1} ${operationMode} ${operand2} = ` ;
    if (operand2 == 0 && operationMode === "÷") {
        alert("Division by 0 is not possible");
        fullVisorClean();
    }
    operationMode = null;
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
        case "÷":
            if (b === 0) return;
            else return a / b;
    }
};
function round(number) {
    return Math.round(number*1000000000000000) / 1000000000000000;
}

function convertLower (e) {
    return e.toLowerCase();
}

function processKeyboardInpt (e) {
    if (e.key >= 0 && e.key <=9) writeVisorNumber(e.key);
    if (convertLower(e.key) === "c" || e.key === "Escape") fullVisorClean();
    if (e.key === "Enter") evaluate();
    if (e.key == "+" || e.key === "-" || e.key === "/" || e.key === "*" || convertLower(e.key) === "e") setOperation(processKeyboardOperator(e.key));
}

function processKeyboardOperator (keyOp) {
    if (keyOp === '+') return "+";
    if (keyOp === '-') return "-";
    if (keyOp === '/') return "÷";
    if (keyOp === '*') return "X";
    if (convertLower(keyOp) === "e") return "EXP";
}













///

getEventListeners();