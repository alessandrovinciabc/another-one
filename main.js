const DOM = {
    calculator: document.querySelector('.calculator'),
    display: document.querySelector('.display'),
    pad: document.querySelector('.pad'),
};

const opList = ['AC', '/', '*', '-', '+', 'HI', 'CE', '=', '.'];
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

DOM.pad.append(...numericPad);
DOM.pad.append(...opButtons);