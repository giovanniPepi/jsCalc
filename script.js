const body = document.querySelector("body");
const container = document.querySelector(".container")

const buttons = document.querySelectorAll("[data-number]");
const buttonsMath = document.querySelectorAll(".buttonsMath");
const operationsP = document.querySelector("#operationsP");
const historyP = document.querySelector("#historyP");

let inputOperation = "";
let result = "";
let operation = "";

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
}
visorClean = () => {
    operationsP.textContent = ".";
    addBlinking(operationsP);
}
getEventListeners = () => {
    const acBtn = document.querySelector("#acBtn");
    acBtn.addEventListener("click", fullVisorClean);

    cBtn = document.querySelector("#cBtn");
    console.log(cBtn);

    cBtn.addEventListener("click", visorClean);

    buttons.forEach((button) => 
        button.addEventListener("click", () => processNumber(button.textContent))
    );

    buttonsMath.forEach((buttonMath => 
        buttonMath.addEventListener("click", () => console.log(buttonMath.textContent))
    ));
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
processNumber = (number) => {
    if (operationsP.textContent === '.') operationsP.textContent="";
    operationsP.setAttribute("class", "visorP");
    operationsP.textContent.toString().length <= 10? operationsP.textContent += number : alert ("10 number maximum exceeded");
}



// function activators //
getEventListeners();
