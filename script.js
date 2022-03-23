const body = document.querySelector("body");
const container = document.querySelector(".container")
const numBtn = document.querySelectorAll('.buttons');
const operatBtn = document.querySelectorAll(".operatBtn");
const currentVisor = document.querySelector("#currentVisor");
const resultP = document.querySelector("#resultP");
let operationMode = null;
let operand1 = '';
let operand2 = '';
let shouldRefreshScreen = false;

getListeners = () => {
    window.addEventListener('keydown', processKeyboardInpt);
    window.addEventListener('keyup', removeTransition);
    
    acBtn = document.querySelector("#acBtn");
    acBtn.addEventListener("click", () => fullVisorClean());
    
    cBtn = document.querySelector("#cBtn");
    cBtn.addEventListener("click", fullVisorClean());

    numBtn.forEach((button) => 
        button.addEventListener("click", () => writeVisorNumber(button.textContent))
    );      
    operatBtn.forEach((btn => btn.addEventListener("click", () => setOperation(btn.textContent))
    ));
    evaluateBtn = document.querySelector(".evaluate");
    evaluateBtn.addEventListener("click", () => evaluate());

    cBtn = document.querySelector("#cBtn");
    cBtn.addEventListener("click", delNumber);

    pointBtn = document.querySelector("#point");
    pointBtn.addEventListener("click", insertPoint); 
}
stopBlinking = () => {
    currentVisor.setAttribute("class", 'visorP');
}
addBlinking = (currentVisor) => {
    currentVisor.setAttribute("class", 'visorPBlink');
}
fullVisorClean = () => {
    resultP.textContent = "";
    operand1 = '';
    operand2 = '';
    operationMode = null;
    visorCleanBlink();
}
visorCleanBlink = () => {
    currentVisor.textContent = ".";
    addBlinking(currentVisor);
    shouldRefreshScreen = false;
}
visorClean = () => {
    currentVisor.textContent ="";
    addBlinking(currentVisor);
    shouldRefreshScreen = false;
}
writeVisorNumber = (number) => {
    if (currentVisor.textContent === '.' || shouldRefreshScreen) visorClean();
    stopBlinking();
    currentVisor.textContent += number;
}
getMath = (a, b, operator) => {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+':
            return (a + b);
        case '-': 
            return (a - b);
        case "x": 
            return (a * b);
        case "e":
            return Math.pow(a, b);
        case "÷":
            if (b === 0) return;
            else return a / b;
        case "%":
            return (b * a) / 100;
    }
};
round = (number) => {
    return Math.round(number*1000000) / 1000000;
}
evaluate = () => {
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
setOperation = (operator) => {
    if (operationMode !== null) evaluate();
    if (currentVisor.textContent !== ".") operand1 = currentVisor.textContent;
    operationMode = operator;   
    resultP.textContent = `${operand1} ${operationMode}`;
    visorClean();
}
delNumber = () => {
    if(currentVisor.textContent === '.') return;
    string = currentVisor.textContent.toString().slice(0, -1);
    console.log(string);
    currentVisor.textContent = string;
    procesedString = string.length;
    if (procesedString < 1) visorCleanBlink();    
}
simulateBtnClick = (number) => {                                        
    btnToPress = document.querySelector(`[data-number="${number}"]`).classList.add('activeNm');    
}
getKeyCode = (e) => {
    if (e.keyCode === 49 || e.keyCode === 97) simulateBtnClick(1);
    else if (e.keyCode === 98 || e.keyCode === 50) simulateBtnClick(2);
    else if (e.keyCode === 51 || e.keyCode === 99) simulateBtnClick(3);
    else if (e.keyCode === 52 || e.keyCode === 100) simulateBtnClick(4);
    else if (e.keyCode === 53 || e.keyCode === 101) simulateBtnClick(5);
    else if (e.keyCode === 54 || e.keyCode === 102) simulateBtnClick(6);
    else if (e.keyCode === 55 || e.keyCode === 103) simulateBtnClick(7);
    else if (e.keyCode === 56 || e.keyCode === 104) simulateBtnClick(8);
    else if (e.keyCode === 57 || e.keyCode === 105) simulateBtnClick(9);
    else if (e.keyCode === 48 || e.keyCode === 96) simulateBtnClick(0);
    else if (e.keyCode === 106 || e.keyCode === 88) simulateBtnClick('*');
    else if (e.keyCode === 191 || e.keyCode === 111) simulateBtnClick('/');
    else if (e.keyCode === 190 || e.keyCode === 110) simulateBtnClick('.');
    else if (e.keyCode === 67) simulateBtnClick('c');
    else if (e.keyCode === 69) simulateBtnClick('e');
    else if (e.keyCode === 61 || e.keyCode === 187) simulateBtnClick('='); 
    else if (e.keyCode === 107) simulateBtnClick('+');
    else if (e.keyCode === 109 || e.keyCode === 173) simulateBtnClick('-');
    else if (e.keyCode === 65) simulateBtnClick('a');
    else if (e.keyCode === 13) simulateBtnClick('=');
}
processKeyboardOperator = (keyOp) => {
    keyOp = keyOp.toLowerCase();
    if (keyOp === '+') return "+";
    if (keyOp === '-') return "-";
    if (keyOp === '/') return "÷";
    if (keyOp === '*') return "x";
    if (keyOp === "e") return "e";
    if (keyOp === "x") return "x";
    if (keyOp === "%") return "%";
}
insertPoint = () => {
    visorClean();
    if (currentVisor.textContent === "") currentVisor.textContent = 0;
    if (currentVisor.textContent.includes(".")) return
    writeVisorNumber(".");
}
processKeyboardInpt = (e) => {
    e.key = e.key.toLowerCase();
    if (e.key >= 0 && e.key <=9) writeVisorNumber(e.key);
    if (e.key === "c" || e.key === "Escape") delNumber();
    if (e.key === 'a') fullVisorClean();
    if (e.key === "Enter") evaluate();
    if (e.key === "Backspace") delNumber();
    if (e.key === "." || e.key === ",") insertPoint();
    if (e.key == "+" || e.key === "-" || e.key === "/" || e.key === "*" || e.key === "x" || e.key === "e" || e.key === "%") setOperation(processKeyboardOperator(e.key));
    getKeyCode(e)
}
removeTransition = () => {
    toRemove = document.querySelectorAll(".activeNm");
    toRemove.forEach(remove => remove.classList.remove('activeNm'));
}
getListeners();
