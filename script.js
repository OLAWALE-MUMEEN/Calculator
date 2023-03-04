'use strict';

//Variable declearation
const btn = document.querySelectorAll('.btn');
// const btn = document.querySelector('.buttons');
// const operator = document.querySelector('.buttons');
const display = document.querySelector('.answer');
const calculator = document.querySelector('.calculator');

//Adding  Event Listerner

for (let i = 0; i < btn.length; i++) {
  btn[i].addEventListener('click', e => {
    if (e.target.matches('button')) {
      console.log('button is press');
      // Varible Require Are
      const key = e.target;
      const action = key.dataset.action;
      const keyContent = key.textContent;
      const displayNum = display.textContent;
      const previousKeyType = state.previousKeyType;
      calculator.dataset.firstValue;
      calculator.dataset.operator;
      calculator.dataset.modValue;
      const state = calculator.dataset;
      // const firstValue = state.firstValue;
      // const operator = state.operator;
      // const modValue = state.modValue;

      // Removing  isDepressed Class from  each  button
      //const eachButton = Array.from(key.parentNode.children);
      //eachButton.forEach(e => e.classList.remove('is-depressed'));
      // OR
      const eachButton = key.parentNode.children;
      for (let i = 0; i < eachButton.length; i++) {
        eachButton[i].classList.remove('is-depressed');
      }

      if (!action) {
        // console.log('number key');
        if (
          displayNum === '0' ||
          previousKeyType === 'operator' ||
          previousKeyType === 'calculate'
        ) {
          display.textContent = keyContent;
          // console.log(previousKeyType);
        } else {
          display.textContent = displayNum + keyContent;
          // display.textContent += keyContent;
        }

        // console.log(calculator);
        calculator.dataset.previousKeyType = 'number';
      }
      if (
        action === 'add' ||
        action === 'multiply' ||
        action === 'subtract' ||
        action === 'divide'
      ) {
        // console.log('operator key ');
        const firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        const secondValue = displayNum;
        if (
          firstValue &&
          operator &&
          previousKeyType !== 'operator' &&
          previousKeyType !== 'calculate'
        ) {
          console.log(calculator);
          const calcValue = calculateOperation(
            firstValue,
            operator,
            secondValue
          );
          display.textContent = calcValue;

          //Update the first Value
          calculator.dataset.firstValue = calcValue;
        } else {
          //   If there are no calculations, set displayedNum as the firstValue
          calculator.dataset.firstValue = displayNum;
        }
        key.classList.add('is-depressed');
        // Add a custom Attribute
        calculator.dataset.previousKeyType = 'operator';
        // calculator.dataset.firstValue = displayNum;
        calculator.dataset.operator = action;
        // console.log(calculator.dataset);
        // console.log(calculator);
        // console.log(calculator.dataset.firstValue);
        // console.log(calculator.dataset.operator);
      }
      if (action === 'decimal') {
        if (!displayNum.includes('.')) {
          display.textContent = displayNum + '.';
        }
        if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
          display.textContent = '0.';
          // console.log(calculator);
          // console.log('previous Key is Operator');
        }
        calculator.dataset.previousKeyType = 'decimal';
        // console.log('decimal key');
      }
      if (action === 'dlt') {
        calculator.dataset.firstValue = '';
        // console.log('delete key');
        // if (previousKeyType !== 'calculate') {
        display.textContent = displayNum.toString().slice(0, -1);
        // if (displayNum.toString().slice(0, -1)) {
        //   calculator.dataset.firstValue = display.textContent;
        //   calculator.dataset.secondValue = '';
        //   calculator.dataset.modValue = '';
        // }
        if (display.textContent === '') {
          display.textContent = 0;
          calculator.dataset.firstValue = '';
          calculator.dataset.modValue = '';
          calculator.dataset.secondValue = '';
        }
        // }
        calculator.dataset.previousKeyType = 'dlt';
        // console.log(calculator);
      }
      if (action === 'clr') {
        // console.log('clear key');

        calculator.dataset.firstValue = '';
        calculator.dataset.modValue = '';
        calculator.dataset.operator = '';
        calculator.dataset.previousKeyType = '';
        calculator.dataset.previousKeyType = 'clr';
        display.textContent = 0;
        // console.log(calculator);
      }
      if (action === 'calculate') {
        // console.log('equal key');
        let firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        let secondValue = displayNum;

        if (firstValue) {
          if (previousKeyType === 'calculate') {
            firstValue = displayNum;
            secondValue = calculator.dataset.modValue;
          }
          display.textContent = calculateOperation(
            firstValue,
            operator,
            secondValue
          );
          // console.log(calculator);
          // console.log(displayNum);

          // set mode attribute
          calculator.dataset.modValue = secondValue;
          calculator.dataset.previousKeyType = 'calculate';
        }
      }
    }
  });
}

const calculateOperation = function (fValue, operator, sValue) {
  const firstValue = parseFloat(fValue);
  const secondValue = parseFloat(sValue);
  if (operator === 'add') return firstValue + secondValue;
  if (operator === 'subtract') return firstValue - secondValue;
  if (operator === 'multiply') return firstValue * secondValue;
  if (operator === 'divide') return firstValue / secondValue;
};
