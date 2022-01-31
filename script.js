const previousDisplay = document.querySelector('.previous');
const currentDisplay = document.querySelector('.current');
const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operator');
const equalsBtn = document.querySelector('#equals');
const clearBtn = document.querySelector('#clear');

let previousDisplayNum = '';
let currentDisplayNum = '';
let lastOperator = '';
let result = null;

numbers.forEach(number => {
    number.addEventListener('click', (e) => {
        if (e.target.textContent == '.' && !hasDecimal) {
            hasDecimal = true;
        } else if (e.target.textContent == '.' && hasDecimal) {
            return;
        }
        currentDisplayNum += e.target.textContent
        currentDisplay.textContent = currentDisplayNum;
    })
})

operations.forEach(operator => {
    operator.addEventListener('click', (e) => {
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

clearBtn.addEventListener('click', (e) => {
    previousDisplay.textContent = '0';
    currentDisplay.textContent = '0';
    previousDisplayNum = '';
    currentDisplayNum = '';
    result = '';
})

function operate(lastOperator, a, b) {
    if (lastOperator == '+') {
        result = add(result, parseFloat(currentDisplayNum));
    } else if (lastOperator == '-') {
        result = subtract(result, parseFloat(currentDisplayNum));
    } else if (lastOperator == '*') {
        result = multiply(result, parseFloat(currentDisplayNum));
    } else if (lastOperator == '/') {
        if (currentDisplayNum == 0) {
            result = 'NOPE'
        } else {
            result = divide(result, parseFloat(currentDisplayNum));
        }
        
    }
}


function clearDisplay (opName = '') {
    previousDisplayNum += currentDisplayNum + ' ' + opName + ' ';
    previousDisplay.textContent = previousDisplayNum;
    currentDisplay.textContent = result;
    currentDisplayNum = '';
}

function add(a,b) {
    console.log(currentDisplayNum);
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
