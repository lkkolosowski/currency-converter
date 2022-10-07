{
  const currencies = [
    {
      code: "PLN",
      name: "Złoty polski",
      rate: 1,
      flag: "pl",
    },
    {
      code: "USD",
      name: "Dolar amerykański",
      rate: 0.2023,
      flag: "um",
    },
    {
      code: "EUR",
      name: "Euro",
      rate: 0.2079,
      flag: "eu",
    },
    {
      code: "JPY",
      name: "Yen japoński",
      rate: 29.1681,
      flag: "jp",
    },
    {
      code: "CZK",
      name: "Korona czeska",
      rate: 5.1282,
      flag: "cz",
    },
    {
      code: "HRK",
      name: "Kuna chorwacka",
      rate: 1.5663,
      flag: "hr",
    },
    {
      code: "CHF",
      name: "Frank szwajcarski",
      rate: 0.1975,
      flag: "ch",
    },
    {
      code: "GBP",
      name: "Funt brytyjski",
      rate: 0.1861,
      flag: "gb",
    },
    {
      code: "INR",
      name: "Rupia indyjska",
      rate: 16.4741,
      flag: "in",
    },
    {
      code: "SEK",
      name: "Korona szwecka",
      rate: 2.2645,
      flag: "se",
    },
    {
      code: "KRW",
      name: "Won południowokoreański",
      rate: 288.2037,
      flag: "kr",
    },
    {
      code: "CNY",
      name: "Yuan chiński",
      rate: 1.4568,
      flag: "cn",
    },
  ];

  const preload = () => {
    const preloaderElement = document.querySelector(".js-preloader");
    let preloaderString = "";
    for (const currency of currencies) {
      preloaderString += `<img style="opacity: 0;" alt="preload Flag" src="https://flagicons.lipis.dev/flags/4x3/${currency.flag}.svg"/>`;
    }
    preloaderElement.innerHTML = preloaderString;
  };

  const render = (selectElements) => {
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
  };

  const load = (selectElements) => {
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

  const getRate = (amountInput, fromCurrency, toCurrency) => {
    let amount = amountInput.value;
    const resultText = document.querySelector(".js-result-text");
    let result = (+amount * (+currencies[toCurrency.selectedIndex].rate / +currencies[fromCurrency.selectedIndex].rate)).toFixed(2);
    resultText.innerHTML = `${amount} ${currencies[fromCurrency.selectedIndex].code} = ${result} ${currencies[toCurrency.selectedIndex].code}`;
  };

  const getResult = (selectElements, amountInput, fromCurrency, toCurrency) => {
    getRate(amountInput, fromCurrency, toCurrency);
    selectElements.forEach((selectElement) => {
      selectElement.addEventListener("change", (e) => {
        e.preventDefault();
        getRate(amountInput, fromCurrency, toCurrency);
      });
    });
    amountInput.addEventListener("input", () => {
      getRate(amountInput, fromCurrency, toCurrency);
    });
  };

  const swap = (fromCurrency, toCurrency, selectElements, amountInput) => {
    const exchangeIcon = document.querySelector(".js-exchange-icon");
    exchangeIcon.addEventListener("click", () => {
      let bufferValue = fromCurrency.value;
      fromCurrency.value = toCurrency.value;
      toCurrency.value = bufferValue;
      load(selectElements);
      getRate(amountInput, fromCurrency, toCurrency);
    });
  };

  const validate = () => {
    document.querySelector(".js-amount").addEventListener("keypress", function (e) {
      const allowedChars = "0123456789.,";
      function contains(stringValue, charValue) {
        return stringValue.indexOf(charValue) > -1;
      }
      const invalidKey = (e.key.length === 1 && !contains(allowedChars, e.key)) || (e.key === "." && contains(e.target.value, "."));
      invalidKey && e.preventDefault();
    });
  };

  const init = () => {
    const selectElements = document.querySelectorAll(".js-form-select");
    const fromCurrency = document.querySelector(".js-from-currency");
    const toCurrency = document.querySelector(".js-to-currency");
    const amountInput = document.querySelector(".js-amount");
    preload();
    render(selectElements);
    load(selectElements);
    getResult(selectElements, amountInput, fromCurrency, toCurrency);
    validate();
    swap(fromCurrency, toCurrency, selectElements, amountInput);
  };

  init();
}
