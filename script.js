document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "e5e27aa4030d1435927b5429";
  const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

  const fromCurrency = document.getElementById("from-currency");
  const toCurrency = document.getElementById("to-currency");
  const amountInput = document.getElementById("amount");
  const form = document.getElementById("currency-form");
  const resultDiv = document.getElementById("result");

  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      const currencies = Object.keys(data.conversion_rates);
      populateDropdowns(currencies);
    })
    .catch((error) => console.error("Error fetching currency data:", error));

  function populateDropdowns(currencies) {
    currencies.forEach((currency) => {
      const option1 = document.createElement("option");
      option1.value = currency;
      option1.textContent = currency;
      fromCurrency.appendChild(option1);

      const option2 = document.createElement("option");
      option2.value = currency;
      option2.textContent = currency;
      toCurrency.appendChild(option2);
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (isNaN(amount)) {
      resultDiv.textContent = "Please enter a valid amount";
      resultDiv.style.opacity = 1;
      return;
    }

    convertCurrency(amount, from, to);
  });

  function convertCurrency(amount, from, to) {
    const convertURL = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}`;
    fetch(convertURL)
      .then((response) => response.json())
      .then((data) => {
        const rate = data.conversion_rate;
        const convertedAmount = (amount * rate).toFixed(2);
        resultDiv.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;

        // Trigger animation by changing opacity
        resultDiv.style.opacity = 0; // Start with opacity 0
        setTimeout(() => {
          resultDiv.style.opacity = 1; // Fade in
        }, 50);
      })
      .catch((error) => console.error("Error converting currency:", error));
  }
});
