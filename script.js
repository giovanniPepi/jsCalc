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


function operate () {
    add = (a, b) => (a + b);
    subtract = (a, b) => (a - b);
    multiply = (a, b) => (a * b);
    power = (a, b) => Math.pow(a, b);
    factorial = (n) => {
        if (n === 0) return 1; else return n * factorial (n -1);
    };
    divide = (a, b) => {if (b === 0) alert ("Nice try!"); else return a / b};
}
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
        buttonMath.addEventListener("click", () => {
            operator = buttonMath.textContent;
            writeVisorNumber(buttonMath.textContent);
            writeOperand(buttonMath.textContent);
            visorClean();
        })
    ));
    operate = document.querySelector(".operate");
    operate.addEventListener("click", () => console.log("FUUUUUUUUCK"));
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
writeOperand = () => {
    placeholderP.textContent = operationsP.textContent;
}


// function activators //
getEventListeners();
