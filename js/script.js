{
  const currencies = [
    {
      code: "PLN",
      name: "Złoty Polski",
      rate: 1,
      flag: "pl",
    },
    {
      code: "USD",
      name: "Dolar amerykański",
      rate: 0.21,
      flag: "um",
    },
    {
      code: "EUR",
      name: "Euro",
      rate: 0.21,
      flag: "eu",
    },
    {
      code: "JPY",
      name: "Jen japoński",
      rate: 29.99,
      flag: "jp",
    },
    {
      code: "CZK",
      name: "Korona czeska",
      rate: 5.19,
      flag: "cz",
    },
    {
      code: "HRK",
      name: "Kuna chorwacka",
      rate: 1.58,
      flag: "hr",
    },
  ];

 

  const render = () => {
    const selectElements = document.querySelectorAll(".js-form-select");
    selectElements.forEach((selectElement) => {
      for (const currency of currencies) {
        let optionListString = `
        <option value="${currency.code}">
        ${currency.code}
        </option>
        `;
        selectElement.insertAdjacentHTML("beforeend", optionListString);
      }
    });
  };

  

  const init = () => {
    render();
  };

  init();
}
