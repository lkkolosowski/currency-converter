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
      rate: 0.205,
      flag: "um",
    },
    {
      code: "EUR",
      name: "Euro",
      rate: 0.2104,
      flag: "eu",
    },
    {
      code: "JPY",
      name: "Jen japoński",
      rate: 29.3393,
      flag: "jp",
    },
    {
      code: "CZK",
      name: "Korona czeska",
      rate: 5.184,
      flag: "cz",
    },
    {
      code: "HRK",
      name: "Kuna chorwacka",
      rate: 1.5831,
      flag: "hr",
    },
    {
      code: "CHF",
      name: "Frank szwajcarski",
      rate: 0.2006,
      flag: "ch",
    },
    {
      code: "GBP",
      name: "Funt brytyjski",
      rate: 0.189,
      flag: "gb",
    },
  ];

  const selectElements = document.querySelectorAll(".js-form-select");

  const preloader = () => {
    const preloaderElement = document.querySelector(".js-preloader");
    let preloaderString = "";
    for (const currency of currencies) {
      preloaderString += `<img style="opacity: 0;" alt="preload Flag" src="https://flagicons.lipis.dev/flags/4x3/${currency.flag}.svg"/>`;
    };
    preloaderElement.innerHTML = preloaderString;
  };

  const render = () => {
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

  const getRate = () => {
    const amountInput = document.querySelector(".js-amount");
    let amount = amountInput.value;
    const fromCurrency = document.querySelector(".js-from-currency");
    const toCurrency = document.querySelector(".js-to-currency");
    const resultText = document.querySelector(".js-result-text");
    let result = (+amount * (+currencies[toCurrency.selectedIndex].rate / +currencies[fromCurrency.selectedIndex].rate)).toFixed(2);
    resultText.innerHTML = `${amount} ${currencies[fromCurrency.selectedIndex].code} = ${result} ${currencies[toCurrency.selectedIndex].code}`;
  };

  const getResult = () => {
    getRate();
    selectElements.forEach((selectElement) => {
      selectElement.addEventListener("change", (e) => {
        e.preventDefault();
        getRate();
      });
    });
    const submitButton = document.querySelector(".js-submit");
    submitButton.addEventListener("click", (e) => {
      e.preventDefault();
      getRate();
    });
  };

  const validateInput = () => {
    document.querySelector(".js-amount").addEventListener("keypress", function (e) {
      const allowedChars = "0123456789.,";
      function contains(stringValue, charValue) {
        return stringValue.indexOf(charValue) > -1;
      };
      const invalidKey = (e.key.length === 1 && !contains(allowedChars, e.key)) || (e.key === "." && contains(e.target.value, "."));
      invalidKey && e.preventDefault();
    });
  };

  const init = () => {
    preloader();
    render();
    getResult();
    validateInput();
  };

  init();
}
