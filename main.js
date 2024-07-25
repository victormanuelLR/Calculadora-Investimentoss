import { generateReturnsArray } from "./src/investmentGoals";

const formElement = document.getElementById("investment-form");
// const calculateButtonElement = document.getElementById("calculate-results");

function renderProgression(event) {
  event.preventDefault();
  //   const startingAmount = Number(formElement['startingAmount'])
  const startingAmount = Number(
    document.getElementById("starting-amount").value
  );
  const aditionalContribution = Number(
    document.getElementById("aditional-contribution").value
  );
  const timeAmount = Number(document.getElementById("time-amount").value);
  const timeAmountPeriod = document.getElementById("time-amount-period").value;
  const returnRate = Number(document.getElementById("return-rate").value);
  const returnRatePeriod = document.getElementById("evaluation-period").value;
  const taxtRate = Number(document.getElementById("tax-rate").value);

  const returnArray = generateReturnsArray(
    startingAmount,
    timeAmount,
    timeAmountPeriod,
    aditionalContribution,
    returnRate,
    returnRatePeriod
  );

  console.log(returnArray);
}

formElement.addEventListener("submit", renderProgression);
// calculateButtonElement.addEventListener("click", renderProgression)
