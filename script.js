const body = document.querySelector("body");
const container = document.querySelector(".container")

const buttons = document.querySelectorAll("[data-number]");
const buttonsMath = document.querySelectorAll(".buttonsMath");
const operationsP = document.querySelector("#operationsP");
const historyP = document.querySelector("#historyP");

let operator = ""; // math operator
let operand1 = '';
let operand2 = '';
let result = ""; // return result

operate = (a, b, operator) => {
    switch (operator) {
        case '+':
            results = (a + b);
        case '-': 
            results =  (a - b);
        case "X": 
            results =  (a * b);
        case "EXP":
            results =  Math.pow(a, b);
        /* factorial = (n) => {
            if (n === 0) return 1; else return n * factorial (n -1);
        };*/
        case "÷":
            if (b === 0) alert ("Nice try!") 
            else results = a / b;
        break;
    }
    console.log(results);
};
fullVisorClean = () => {
    operationsP.textContent = ".";
    addBlinking(operationsP);
    historyP.textContent = "";
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
    buttonsMath.forEach((buttonMath => buttonMath.addEventListener("click", () => getOperands(buttonMath.textContent))
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

getOperands = (operand) => {
    if (operand1 == '') {
        operand1 = Number(operationsP.textContent);
        console.log(operand1, 'operand 1');
    } else if (operand2 == ''){
        operand2 = Number(operationsP.textContent);
        console.log(operand2, 'operand 2');
    } else {
        operand1 = operand2; 
        operand2 = Number(operationsP.textContent);
    }
    
}






















// function activators //
getEventListeners();
