const previousDisplay = document.querySelector('.previous');
const currentDisplay = document.querySelector('.current');
const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operator');
const equalsBtn = document.querySelector('#equals');
const clearBtn = document.querySelector('#clear');
const deleteBtn = document.querySelector('#delete');

let previousDisplayNum = '';
let currentDisplayNum = '';
let lastOperator = '';
let result = null;

numbers.forEach(number => {
    number.addEventListener('click', (e) => {
        ifNope();
        if (e.target.textContent == '.' && currentDisplayNum.includes('.')) return;
        currentDisplayNum += e.target.textContent
        currentDisplay.textContent = currentDisplayNum;
    })
})

operations.forEach(operator => {
    operator.addEventListener('click', (e) => {
        ifNope();
        if (!currentDisplayNum) return;
        const operationName = e.target.textContent;
        if (currentDisplayNum && previousDisplayNum && lastOperator) {
            operate(lastOperator, previousDisplayNum, currentDisplayNum);
        } else {
            result = parseFloat(currentDisplayNum);
        }
        clearDisplay(operationName)
        lastOperator = operationName;
    })
})

equalsBtn.addEventListener('click', (e) => {
    if (!currentDisplayNum || !previousDisplayNum) return;
    operate(lastOperator, previousDisplayNum, currentDisplayNum);
    clearDisplay();
    currentDisplay.textContent = result;
    currentDisplayNum = result;
    previousDisplayNum = '';
})

clearBtn.addEventListener('click', clearCalc)

deleteBtn.addEventListener('click', (e) => {
    currentDisplayNum = currentDisplayNum.toString().slice(0,-1);
    currentDisplay.textContent = currentDisplay.textContent.toString().slice(0,-1);
})

window.addEventListener('keydown', (e) => {
    if (e.key == '1' || e.key == '2' || e.key == '3' || e.key == '4' || 
        e.key == '5' || e.key == '6' || e.key == '7' || e.key == '8' ||
        e.key == '9' || e.key == '0' || e.key == '.') {
        numberKeys(e.key);
    } else if (e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/') {
        operatorKeys(e.key);
    } else if (e.key == '=') {
        equalsKey(e.key)
    } else if (e.key == 'Backspace') {
        deleteKey(e.key);
    } else if (e.key == "Escape") {
        clearKey(e.key);
    }
})

function numberKeys(key) {
    numbers.forEach(number => {
        if (number.textContent == key) {
            number.click();
        }
    })
}

function operatorKeys(key) {
    operations.forEach(operator => {
        if (operator.textContent == key) {
            operator.click();
        }
    })
}

function equalsKey(key) {
    if (equalsBtn.textContent == key) {
        equalsBtn.click();
    }
}

function deleteKey(key) {
    if (key == 'Backspace') {
        deleteBtn.click();
    }
}

function clearKey(key) {
    if (key == 'Escape') {
        clearBtn.click();
    }
}

function operate(lastOperator, a, b) {
    if (lastOperator == '+') {
        result = add(result, parseFloat(currentDisplayNum));
    } else if (lastOperator == '-') {
        result = subtract(result, parseFloat(currentDisplayNum));
    } else if (lastOperator == '*') {
        result = multiply(result, parseFloat(currentDisplayNum));
    } else if (lastOperator == '/') {
        if (currentDisplayNum == 0) {
            result = 'NOPE';
        } else {
            result = divide(result, parseFloat(currentDisplayNum));
        }
    }
}

function clearDisplay (opName = '') {
    previousDisplayNum += (currentDisplayNum) + ' ' + opName + ' ';
    previousDisplay.textContent = previousDisplayNum;
    currentDisplay.textContent = result;
    currentDisplayNum = '';
}

function clearCalc () {
    previousDisplay.textContent = '0';
    currentDisplay.textContent = '0';
    previousDisplayNum = '';
    currentDisplayNum = '';
    result = '';
}

function ifNope() {
    if (result == 'NOPE') clearCalc();
}

function add(a,b) {
    return a+b;
}
function subtract(a,b) {
    return a-b;
}
function multiply(a,b) {
    return a*b;
}
function divide(a,b) {
    return a/b;
}