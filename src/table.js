const isNonEmptyArray = arrayElement => {
  return Array.isArray(arrayElement) && arrayElement.length > 0;
};
const istheElementInsideIt = (supposedChildElement, supposedParentElement) => {
  return Boolean(supposedParentElement.querySelector(supposedChildElement));
};

document.lastChild.re;
export const createTable = (columnsArray, dataArray, tableId) => {
  if (
    !isNonEmptyArray(columnsArray) ||
    !isNonEmptyArray(dataArray) ||
    !tableId
  ) {
    throw new Error(
      "Para a correta execução, precisamos de um array com as colunas, outro com as informações das linhas e também o id do elemento selecionado"
    );
  }

  const tableElement = document.getElementById(tableId);

  if (!tableElement || tableElement.nodeName !== "TABLE") {
    throw new Error("Id informado não corresponde a nenhum elemento table");
  }

  createTableHeader(tableElement, columnsArray);
  createTableBody(tableElement, dataArray, columnsArray);
};

function createTableHeader(tableReference, columnsArray) {
  function createTheadElement(tableReference) {
    const thead = document.createElement("thead");

    tableReference.appendChild(thead);

    return thead;
  }

  const tableHeaderReference =
    tableReference.querySelector("thead") ?? createTheadElement(tableReference);

  const headerRow = document.createElement("tr");

  ["bg-blue-900", "text-slate-200", "sticky", "top-0"].forEach(cssClass =>
    headerRow.classList.add(cssClass)
  );

  for (const tableColumnObject of columnsArray) {
    const headerElement = /*html*/ `<th>${tableColumnObject.columnLabel}</th>`;

    // headerRow.appendChild(headerElement) testar depois!!

    headerRow.innerHTML += headerElement;
  }
  if (istheElementInsideIt("tr", tableHeaderReference)) {
    tableHeaderReference.removeChild(tableHeaderReference.querySelector("tr"));
  }

  tableHeaderReference.appendChild(headerRow);
}
function createTableBody(tableReference, tableItens, columnsArray) {
  function createTbodyElement(tableReference) {
    const tbody = document.createElement("tbody");

    tableReference.appendChild(tbody);

    return tbody;
  }

  const tableBodyReference =
    tableReference.querySelector("tbody") ?? createTbodyElement(tableReference);
  const numberOfRowsInTheTable = tableBodyReference.children.length;
  if (istheElementInsideIt("tr", tableBodyReference)) {
    for (let tableRow = 0; tableRow < numberOfRowsInTheTable; tableRow++) {
      tableBodyReference.lastChild.remove();
    }
  }
  for (const [itemIndex, tableItem] of tableItens.entries()) {
    const tableRow = document.createElement("tr");

    if (itemIndex % 2 !== 0) {
      tableRow.classList.add("bg-blue-200");
    }

    for (const tableColumn of columnsArray) {
      const formatFn = tableColumn.format ?? (info => info);

      tableRow.innerHTML += /*HTML*/ `<td>${formatFn(
        tableItem[tableColumn.acessor]
      )}</td>`;
    }

    tableBodyReference.appendChild(tableRow);
  }
}
