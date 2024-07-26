import { generateReturnsArray } from "./src/investmentGoals";

const form = document.getElementById("investment-form");
// const calculateButtonElement = document.getElementById("calculate-results");

function renderProgression(evt) {
  evt.preventDefault();

  if (document.querySelector(".error")) {
    return;
  }

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
form.addEventListener("reset", resetFormErrors);
// calculateButtonElement.addEventListener("click", renderProgression)
{
  /* <p class="text-red-500">Insira um valor numérico maior que zero!</p> */
}
