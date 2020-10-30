function generateButtons(num, templateValues){
    let result, templateIsValid;
    result = [];
    templateIsValid = templateValues && templateValues.length >= num? true : false;

    for(let i=0; i < num; ++i){
        let newButton, buttonValue;
        buttonValue = templateIsValid? templateValues[i] : i;
        newButton = document.createElement('button');
        newButton.setAttribute('data-key', `${buttonValue}`);
        newButton.textContent = `${buttonValue}`;
        
        result.push(newButton);
    }

    return result;
}

function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

function operate(operator, a,b){
    let result;
    switch(operator){
        case '+': result = add(a,b); break;
        case '-': result = subtract(a,b); break;
        case '*': result = multiply(a,b); break;
        case '/': result = divide(a,b); break;
    }
    return result;
}

function getDisplay(domObject){
    let text, output;
    text = domObject.textContent;
    if(text === '.' || text === ''){
        output = '0';
    }else{
        output = text;
    }
    return output;
}

function appendToDisplay(domObject, string){
    domObject.textContent = domObject.textContent.concat(string);

    return domObject.textContent;
}

function resetDisplay(domObject){
    domObject.textContent = '';
}

function isInt(num){
    return num % 1 ? false : true;
}

const DOM = {
    calculator: document.querySelector('.calculator'),
    display: document.querySelector('.display'),
    pad: document.querySelector('.pad'),
};
const opList = ['AC', '/', '*', '-', '+', 'HI', 'C', '.', '='];
let numericPad, opButtons, storedEntry, operator, tempOperator, isDisplayTemp, isDotEnabled;
numericPad = [];
opButtons = [];

storedEntry = '0';
operator = '';
tempOperator = '';
isDisplayTemp = false;
isDotEnabled = false;


//Generate numeric pad and special buttons
numericPad = generateButtons(10);
opButtons = generateButtons(opList.length, opList);

//Append to pad in correct order
DOM.pad.append(
    opButtons[0], opButtons[1], opButtons[2], opButtons[3],
    numericPad[7], numericPad[8], numericPad[9], opButtons[4],
    numericPad[4], numericPad[5], numericPad[6], opButtons[5],
    numericPad[3], numericPad[2], numericPad[1], opButtons[6],
    opButtons[7], numericPad[0], opButtons[8]
);

DOM.pad.addEventListener('click', function(e){
    if(e.target.tagName === 'BUTTON'){
        let key, keyIsNumber, keyIsOperator;
        key = e.target.dataset.key;
        keyIsNumber = /\d+/.test(key);
        keyIsOperator = /[\+\-\*\/]/.test(key);

        if(keyIsNumber){
            if(tempOperator){
                operator = tempOperator;
            }
            if(isDisplayTemp){
                resetDisplay(DOM.display);
                isDisplayTemp = false;
            }

            appendToDisplay(DOM.display, key);
        }else if(keyIsOperator){
            if(operator){
                storedEntry = operate(operator, parseFloat(storedEntry), parseFloat(getDisplay(DOM.display)));
                resetDisplay(DOM.display);
                appendToDisplay(DOM.display, isInt(storedEntry) ? storedEntry : storedEntry.toFixed(2));
                isDisplayTemp = true;
                isDotEnabled = false;
                tempOperator = key;
                operator = '';
            }else{
                storedEntry = getDisplay(DOM.display);
                tempOperator = key;
                isDisplayTemp = true;
                isDotEnabled = false;
            }
        }else{
            switch(key){
                case '.':
                    if(!isDotEnabled && !isDisplayTemp){
                        appendToDisplay(DOM.display, '.');
                        isDotEnabled = true;
                    }
                    break;
                case 'AC':
                    resetDisplay(DOM.display);
                    storedEntry = '0';
                    operator = '';
                    tempOperator = '';
                    isDisplayTemp = false;
                    isDotEnabled = false;
                    break;

                case 'C':
                    resetDisplay(DOM.display);
                    isDotEnabled = false;
                    break;

                case '=':
                    if(operator){
                        storedEntry = operate(operator, parseFloat(storedEntry), parseFloat(getDisplay(DOM.display)));
                        operator = '';
                        resetDisplay(DOM.display);
                        appendToDisplay(DOM.display, isInt(storedEntry) ? storedEntry : storedEntry.toFixed(2));
                        isDisplayTemp = true;
                        isDotEnabled = false;
                    }
                    break;


                case 'HI':
                    window.open('https://github.com/alessandrovinciabc/another-one', '_blank');
                    break;
            }
        }
    }
});