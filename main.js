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

const DOM = {
    calculator: document.querySelector('.calculator'),
    display: document.querySelector('.display'),
    pad: document.querySelector('.pad'),
};

const opList = ['AC', '/', '*', '-', '+', 'HI', 'C', '.', '='];
let numericPad, opButtons;
numericPad = [];
opButtons = [];

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