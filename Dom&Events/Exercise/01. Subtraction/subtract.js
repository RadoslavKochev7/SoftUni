function subtract() {
   let firstNumber = document.getElementById('firstNumber').value;
   let secondNumber = document.getElementById('secondNumber').value;

   let sum = document.getElementById('result');
   sum.textContent = Number(firstNumber) - Number(secondNumber);
   console.log(sum.textContent);

}