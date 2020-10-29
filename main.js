const DOM = {
    calculator: document.querySelector('.calculator'),
    display: document.querySelector('.display'),
    pad: document.querySelector('.pad'),
};

const opList = ['AC', '/', '*', '-', '+', 'HI', 'C', '.', '='];
let numericPad, opButtons;
numericPad = [];
opButtons = [];

//Generate numeric pad
for(let i=0; i <= 9; ++i){
    let newButton;
    newButton = document.createElement('button');
    newButton.setAttribute('data-key', `${i}`);
    newButton.textContent = `${i}`;

    numericPad.push(newButton);
}

//Generate special buttons
for(let i=0; i < opList.length; ++i){
    let newButton;
    newButton = document.createElement('button');
    newButton.setAttribute('data-key', `${opList[i]}`);
    newButton.textContent = `${opList[i]}`;

    opButtons.push(newButton);
}

//Append to pad in correct order
DOM.pad.append(
    opButtons[0], opButtons[1], opButtons[2], opButtons[3],
    numericPad[7], numericPad[8], numericPad[9], opButtons[4],
    numericPad[4], numericPad[5], numericPad[6], opButtons[5],
    numericPad[3], numericPad[2], numericPad[1], opButtons[6],
    opButtons[7], numericPad[0], opButtons[8]
);