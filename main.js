let billInput = document.querySelector(".bill-amount input");
let tipPercent = document.querySelectorAll(".tip-percent input[type='radio']");
let tipCustomPercent = document.querySelector(".custom");
let peopleNum = document.querySelector(".people-num input");
let resetBtn = document.querySelector(".reset");
let tipAmountElement = document.querySelector(".tip-amount .result h2");
let totalAmountElement = document.querySelector(".total .result h2");

let billInputValue;
billInput.onblur = function () {
  if (!isNaN(billInput.value) && billInput.value !== "") {
    billInputValue = billInput.value;
  } else {
    billInput.value = "";
  }
  checkInputs();
};

tipCustomPercent.onfocus = function () {
  tipPercent.forEach((tip) => {
    tip.checked = false;
  });
};

function calcTipPercent() {
  let tipValue;
  if (!isNaN(tipCustomPercent.value) && tipCustomPercent.value !== "") {
    tipValue = tipCustomPercent.value;
  } else {
    tipCustomPercent.value = "";
    tipPercent.forEach((tip) => {
      if (tip.checked) {
        tipValue = tip.value;
      }
    });
  }
  return tipValue;
}

let peopleNumValue;
let calcTipValue;
peopleNum.onblur = function () {
  calcTipValue = calcTipPercent();
  if (!isNaN(peopleNum.value) && peopleNum.value !== "") {
    if (peopleNum.value == 0) {
      document.querySelector(".people-title span").classList.add("active");
      peopleNum.value = "";
    } else {
      peopleNumValue = peopleNum.value;
    }
  } else {
    peopleNum.value = "";
  }
  checkInputs();
};

function checkInputs() {
  if (
    billInputValue !== undefined &&
    peopleNumValue !== undefined &&
    calcTipValue !== undefined
  ) {
    calc();
  }
}

function calc() {
  let tipAmount = (billInputValue * (calcTipValue / 100)) / 5;
  tipAmountElement.innerHTML = tipAmount.toFixed(2);

  let total = billInputValue / peopleNumValue + tipAmount;
  totalAmountElement.innerHTML = total.toFixed(2);
}

resetBtn.onclick = function (e) {
  e.preventDefault();
  billInput.value = "";
  tipPercent.forEach((tip) => {
    tip.checked = false;
  });
  billInput.value = "";
  tipCustomPercent.value = "";
  peopleNum.value = "";
  tipAmountElement.innerHTML = "0.00";
  totalAmountElement.innerHTML = "0.00";
};
