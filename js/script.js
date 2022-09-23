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

  const preloader = () => {
    const preloaderElement = document.querySelector(".js-preloader");
    let preloaderString = "";

    for (const currency of currencies) {
      preloaderString += `<img style="opacity: 0;" alt="preload Flag" src="https://flagicons.lipis.dev/flags/4x3/${currency.flag}.svg"/>`;
    }
    preloaderElement.innerHTML = preloaderString;
  };

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
    document.querySelector(".js-to-currency").getElementsByTagName("option")[1].selected = "selected";
    selectElements.forEach((selectElement) => {
      const renderCaption = ({ name, flag }) => {
        selectElement.parentElement.querySelector(".js-img").src = `https://flagicons.lipis.dev/flags/4x3/${flag}.svg`;
        selectElement.parentElement.querySelector(".js-caption").innerHTML = `${name}`;
      };

      renderCaption(currencies[selectElement.selectedIndex]);
      selectElement.addEventListener("change", () => {
        renderCaption(currencies[selectElement.selectedIndex]);
      });
    });
  };

  const submitButton = document.querySelector(".js-submit");
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const getRate = () => {
      const amountInput = document.querySelector(".js-amount");
      let amount = amountInput.value;
      const fromCurrency = document.querySelector(".js-from-currency");
      const toCurrency = document.querySelector(".js-to-currency");
      const resultField = document.querySelector(".js-result");
      let result = (+amount * (+currencies[toCurrency.selectedIndex].rate / +currencies[fromCurrency.selectedIndex].rate)).toFixed(2);

      resultField.innerHTML = `${amount} ${currencies[fromCurrency.selectedIndex].code} = ${result} ${currencies[toCurrency.selectedIndex].code}`;
    };
    getRate();
  });

  const init = () => {
    preloader();
    render();
    
  };

  init();
}
