const body = document.querySelector("body");
const container = document.querySelector(".container")

const buttons = document.querySelectorAll("[data-number]");
const operationsP = document.querySelector("#operationsPBlink");
const historyP = document.querySelector("#historyP");


add = (a, b) => (a + b);
subtract = (a, b) => (a - b);
   /* sum = (array) => array.reduce((previous, current) => previous + current, 0);
   multiply = (array) => array.reduce((previous, current) => previous * current);
    */
multiply = (a, b) => (a * b);
power = (a, b) => Math.pow(a, b);
factorial = (n) => {
if (n === 0) return 1; else return n * factorial (n -1);
};
divide = (a, b) => {if (b === 0) alert ("Nice try, fucker"); else return a / b};

fullVisorClean = () => {
    operationsP.textContent = "";
    historyP.textContent = "";
};

visorClean = () => {
    operationsP.textContent = "";
}
getEventListeners = () => {
    const acBtn = document.querySelector("#acBtn");
    acBtn.addEventListener("click", fullVisorClean);
    cBtn = document.querySelector("#cBtn");
    cBtn.addEventListener("click", visorClean);
}
stopBlinking = () => {
    const visorPBlink = document.querySelector(".visorPBlink")
    visorPBlink.setAttribute("class", 'visorP');
    console.log(visorPBlink);
}

getEventListeners();

