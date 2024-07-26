import { generateReturnsArray } from "./src/investmentGoals";
import { Chart } from "chart.js/auto";

const finalMoneyChartElement = document.getElementById(
  "final-money-distribution"
);
const progressionChartElement = document.getElementById("progression");
const form = document.getElementById("investment-form");
// const calculateButtonElement = document.getElementById("calculate-results");
let doughnutChartReference = {};
let progressionChartReference = {};

function formatCurrency(value) {
  return value.toFixed(2);
}

function renderProgression(evt) {
  evt.preventDefault();

  if (document.querySelector(".error")) {
    return;
  }

  resetCharts();

  //   const startingAmount = Number(formElement['startingAmount'])

  const startingAmount = Number(
    document.getElementById("starting-amount").value.replace(",", ".")
  );
  const aditionalContribution = Number(
    document.getElementById("aditional-contribution").value.replace(",", ".")
  );
  const timeAmount = Number(document.getElementById("time-amount").value);
  const timeAmountPeriod = document.getElementById("time-amount-period").value;
  const returnRate = Number(
    document.getElementById("return-rate").value.replace(",", ".")
  );
  const returnRatePeriod = document.getElementById("evaluation-period").value;
  const taxtRate = Number(
    document.getElementById("tax-rate").value.replace(",", ".")
  );

  const returnsArray = generateReturnsArray(
    startingAmount,
    timeAmount,
    timeAmountPeriod,
    aditionalContribution,
    returnRate,
    returnRatePeriod
  );

  const finalInvestmentObject = returnsArray[returnsArray.length - 1];

  doughnutChartReference = new Chart(finalMoneyChartElement, {
    type: "doughnut",
    data: {
      labels: ["Total investido", "Rendimento", "Imposto"],
      datasets: [
        {
          data: [
            formatCurrency(finalInvestmentObject.investedAmount),
            formatCurrency(
              finalInvestmentObject.totalInterestReturns * (1 - taxtRate / 100)
            ),
            formatCurrency(
              finalInvestmentObject.totalInterestReturns * (taxtRate / 100)
            ),
          ],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    },
  });

  progressionChartReference = new Chart(progressionChartElement, {
    type: "bar",
    data: {
      labels: returnsArray.map(investmentObject => investmentObject.month),
      datasets: [
        {
          label: "Total Investido",
          data: returnsArray.map(investmentObject =>
            formatCurrency(investmentObject.investedAmount)
          ),
          backgroundColor: "rgb(255, 99, 132)",
        },
        {
          label: "Retorno do Investimento",
          data: returnsArray.map(investmentObject =>
            formatCurrency(investmentObject.interestReturns)
          ),
          backgroundColor: "rgb(54, 162, 235)",
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    },
  });
}

function validateInput(evt) {
  if (evt.target.value === "") {
    return;
  }

  const { parentElement } = evt.target;
  const grandParentElement = evt.target.parentElement.parentElement;
  const inputValue = evt.target.value.replace(",", ".");

  if (
    (isNaN(inputValue) || Number(inputValue) <= 0) &&
    !parentElement.classList.contains("error")
  ) {
    const errorTextElement = document.createElement("p");

    errorTextElement.classList.add("text-red-500", "error-mesage");
    errorTextElement.innerText = "Insira um valor numérico maior que zero!";

    parentElement.classList.add("error");

    grandParentElement.appendChild(errorTextElement);
  } else if (
    parentElement.classList.contains("error") &&
    !isNaN(inputValue) &&
    Number(inputValue) > 0
  ) {
    parentElement.classList.remove("error");
    grandParentElement.querySelector(".error-mesage").remove();
  }
}

function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function resetCharts() {
  if (
    !isObjectEmpty(doughnutChartReference) &&
    !isObjectEmpty(progressionChartReference)
  ) {
    doughnutChartReference.destroy();
    progressionChartReference.destroy();
  }
}

function resetFormErrors() {
  const errorInputsContainers = document.querySelectorAll(".error");

  for (const errorInputsContainer of errorInputsContainers) {
    errorInputsContainer.classList.remove("error");
    errorInputsContainer.parentElement.querySelector(".error-mesage").remove();
  }
}

for (const formElement of form) {
  if (formElement.tagName === "INPUT" && formElement.hasAttribute("name")) {
    formElement.addEventListener("blur", validateInput);
  }
}

form.addEventListener("submit", renderProgression);
form.addEventListener("reset", () => {
  resetFormErrors(), resetCharts();
});
// calculateButtonElement.addEventListener("click", renderProgression)
{
  /* <p class="text-red-500">Insira um valor numérico maior que zero!</p> */
}
