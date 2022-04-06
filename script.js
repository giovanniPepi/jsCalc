main = (() => {
    let operationMode = null;
    let operand1 = '';
    let operand2 = '';
    let shouldRefreshScreen = false;

    //handles DOM Queries
    dQuery = (function() {    const body = document.querySelector("body");
        const container = document.querySelector(".container")
        const numBtn = document.querySelectorAll('.buttons');
        const operatBtn = document.querySelectorAll(".operatBtn");
        const currentVisor = document.querySelector("#currentVisor");
        const resultP = document.querySelector("#resultP");
        const acBtn = document.querySelector("#acBtn");
        const cBtn = document.querySelector("#cBtn");
        const evaluateBtn = document.querySelector(".evaluate");
        const pointBtn = document.querySelector("#point");
        
        return {
            body,
            container,
            numBtn,
            operatBtn,
            currentVisor,
            resultP,
            acBtn,
            cBtn,
            evaluateBtn,
            pointBtn,
        }
    })();

    // handles CSS transitions and animations
    getTransitions = (() => {

        removeTransition = () => {
            const toRemove = document.querySelectorAll(".activeNm");
            toRemove.forEach(remove => remove.classList.remove('activeNm'));
        };    

        simulateBtnClick = (number) => {                                        
            btnToPress = document.querySelector(`[data-number="${number}"]`).classList.add('activeNm');    
        };

        stopBlinking = () => {
            dQuery.currentVisor.setAttribute("class", 'visorP');
        };

        addBlinking = (currentVisor) => {
            dQuery.currentVisor.setAttribute("class", 'visorPBlink');
        };

        visorCleanBlink = () => {
            currentVisor.textContent = ".";
            addBlinking(currentVisor);
            shouldRefreshScreen = false;
        };

        fullVisorClean = () => {
            resultP.textContent = "";
            operand1 = '';
            operand2 = '';
            operationMode = null;
            visorCleanBlink();
        };

        visorClean = () => {
            currentVisor.textContent ="";
            addBlinking(currentVisor);
            shouldRefreshScreen = false;
        };

        delNumber = () => {
            if(currentVisor.textContent === '.') return;
            string = currentVisor.textContent.toString().slice(0, -1);
            currentVisor.textContent = string;
            procesedString = string.length;
            if (procesedString < 1) getTransitions.visorCleanBlink();    
        };

        insertPoint = () => {
            if (currentVisor.textContent === "." || currentVisor.textContent === '') currentVisor.textContent = 0;
            //avoids more than one .
            if (currentVisor.textContent.includes(".")) return
            writeVisorNumber(".");
        };

        writeVisorNumber = (number) => {
            if (currentVisor.textContent === '.' || shouldRefreshScreen) visorClean();
            stopBlinking();
            currentVisor.textContent += number;
        };

        return {
            removeTransition,
            simulateBtnClick,
            stopBlinking,
            addBlinking,
            visorCleanBlink,
            fullVisorClean,
            visorClean,
            delNumber,
            insertPoint,
            writeVisorNumber,
        }
    })(); 

    // main math
    calculator = ((a, b) => {
        const add = (a, b) => a + b;
        const sub = (a, b) => a - b;
        const mul = (a, b) => a * b;
        const div = (a, b) => {
            if(b === 0) return;
            return a / b;
        };
        const pow = (a, b) => Math.pow(a, b);
        const per = (a, b) => (b * a) / 100;

        return {
            add, sub, mul, div, pow, per,
        };
    })();

    // set operations, evaluate
    getOperations = (() => {
        
        round = (number) => {
            return Math.round(number*1000000) / 1000000;
        };

        setOperation = (operator) => {
            if (operationMode !== null) evaluate();
            if (currentVisor.textContent !== ".") operand1 = currentVisor.textContent;
            if (opereator = "e^")
            operationMode = operator;   
            resultP.textContent = `${operand1} ${operationMode}`;
            getTransitions.visorClean();
        };
        
        evaluate = () => {
            if (shouldRefreshScreen || operationMode === null) return;
            operand2 = currentVisor.textContent; 
            switch(operationMode) {
                case '+':
                    currentVisor.textContent = round(calculator.add(Number(operand1), Number(operand2)));
                    break;
                case '-': 
                    currentVisor.textContent = round(calculator.sub(Number(operand1), Number(operand2)));
                    break;
                case 'x': 
                    currentVisor.textContent = round(calculator.mul(Number(operand1), Number(operand2)));
                    break;
                case '÷': 
                    currentVisor.textContent = round(calculator.div(Number(operand1), Number(operand2)));
                    break;
                case 'e':
                    currentVisor.textContent = round(calculator.pow(Number(operand1), Number(operand2)));
                    break;
                case '%': 
                    currentVisor.textContent = round(calculator.per(Number(operand1), Number(operand2)));
                    break;
            };

            resultP.textContent = `${operand1} ${operationMode} ${operand2} = ` ;
            if (operand2 == 0 && operationMode === "÷") {
            alert("Division by 0 is not possible");
            getTransitions.fullVisorClean();
        };

            operationMode = null;
        };
        
        return {
            evaluate, setOperation,
        };
    })();

    // listen for clicks and keyboard
    getListeners = (() => {            

        dQuery.acBtn.addEventListener("click", () => getTransitions.fullVisorClean());        
        dQuery.cBtn.addEventListener("click", getTransitions.fullVisorClean());
        dQuery.numBtn.forEach((button) => 
            button.addEventListener("click", () => getTransitions.writeVisorNumber(button.textContent))
        );      

        dQuery.operatBtn.forEach((btn => btn.addEventListener("click", () => getOperations.setOperation(btn.textContent))
        ));

        dQuery.evaluateBtn.addEventListener("click", () => getOperations.evaluate());
        dQuery.cBtn.addEventListener("click", getTransitions.delNumber);
        dQuery.pointBtn.addEventListener("click", getTransitions.insertPoint); 
        
        processKeyboardInpt = (e) => {
            e.key = e.key.toLowerCase();
            if (e.key >= 0 && e.key <=9) getTransitions.writeVisorNumber(e.key);
            if (e.key === "c" || e.key === "Escape") getTransitions.delNumber();
            if (e.key === 'a') getTransitions.fullVisorClean();
            if (e.key === "Enter") getOperations.evaluate();
            if (e.key === "Backspace") getTransitions.delNumber();
            if (e.key === "." || e.key === ",") getTransitions.insertPoint();
            if (e.key == "+" || e.key === "-" || e.key === "/" || e.key === "*" || e.key === "x" || e.key === "e" || e.key === "%") getOperations.setOperation(processKeyboardOperator(e.key));
            getKeyCode(e)
        };

        getKeyCode = (e) => {
            if (e.keyCode === 49 || e.keyCode === 97) getTransitions.simulateBtnClick(1);
            else if (e.keyCode === 98 || e.keyCode === 50) getTransitions.simulateBtnClick(2);
            else if (e.keyCode === 51 || e.keyCode === 99) getTransitions.simulateBtnClick(3);
            else if (e.keyCode === 52 || e.keyCode === 100) getTransitions.simulateBtnClick(4);
            else if (e.keyCode === 53 || e.keyCode === 101) getTransitions.simulateBtnClick(5);
            else if (e.keyCode === 54 || e.keyCode === 102) getTransitions.simulateBtnClick(6);
            else if (e.keyCode === 55 || e.keyCode === 103) getTransitions.simulateBtnClick(7);
            else if (e.keyCode === 56 || e.keyCode === 104) getTransitions.simulateBtnClick(8);
            else if (e.keyCode === 57 || e.keyCode === 105) getTransitions.simulateBtnClick(9);
            else if (e.keyCode === 48 || e.keyCode === 96) getTransitions.simulateBtnClick(0);
            else if (e.keyCode === 106 || e.keyCode === 88) getTransitions.simulateBtnClick('*');
            else if (e.keyCode === 191 || e.keyCode === 111) getTransitions.simulateBtnClick('/');
            else if (e.keyCode === 190 || e.keyCode === 110) getTransitions.simulateBtnClick('.');
            else if (e.keyCode === 67) getTransitions.simulateBtnClick('c');
            else if (e.keyCode === 69) getTransitions.simulateBtnClick('e');
            else if (e.keyCode === 61 || e.keyCode === 187) getTransitions.simulateBtnClick('='); 
            else if (e.keyCode === 107) getTransitions.simulateBtnClick('+');
            else if (e.keyCode === 109 || e.keyCode === 173) getTransitions.simulateBtnClick('-');
            else if (e.keyCode === 65) getTransitions.simulateBtnClick('a');
            else if (e.keyCode === 13) getTransitions.simulateBtnClick('=');
        };

        processKeyboardOperator = (keyOp) => {
            keyOp = keyOp.toLowerCase();
            if (keyOp === '+') return "+";
            if (keyOp === '-') return "-";
            if (keyOp === '/') return "÷";
            if (keyOp === '*') return "x";
            if (keyOp === "e") return "e";
            if (keyOp === "x") return "x";
            if (keyOp === "%") return "%";
        };

        window.addEventListener('keydown', processKeyboardInpt);
        window.addEventListener('keyup', () => getTransitions.removeTransition());
        window.addEventListener('touchend', () => removeTransition());
    })();

    //handling mobile touch 
    window.onload = function() {
      if(/iP(hone|ad)/.test(window.navigator.userAgent)) {
          document.body.addEventListener('touchstart', function() {}, false);
      }
      if(/Android/.test(window.navigator.userAgent)) {
        document.body.addEventListener('touchstart', function() {}, false);
    }
  }

})();

