// Include api for currency change
const api = "https://api.exchangerate-api.com/v4/latest/USD";

// For selecting different controls
let search = document.querySelector(".searchBox");
let convert = document.querySelector(".convert");
let fromCurrency = document.querySelector(".from");
let toCurrency = document.querySelector(".to");
let finalValue = document.querySelector(".finalValue");
let finalAmount = document.getElementById("finalAmount");
let resultFrom = 'GBP'; // Default 'from' currency
let resultTo = 'EUR';   // Default 'to' currency
let searchValue = '10'; // Default input value

// Prepopulate the Modal when the page loads
window.addEventListener('DOMContentLoaded', function () {
    // Set initial values for currency options and input
    fromCurrency.value = resultFrom;
    toCurrency.value = resultTo;
    search.value = searchValue;
	calcResult();
});

// Event when currency is changed
fromCurrency.addEventListener('change', (event) => {
    resultFrom = event.target.value;
    calcResult();
});

// Event when currency is changed
toCurrency.addEventListener('change', (event) => {
    resultTo = event.target.value;
    calcResult();
});

search.addEventListener('input', updateValue);

// Function for updating value
function updateValue(e) {
    searchValue = e.target.value;
    calcResult();
}

// When user clicks, it calls function getResults
convert.addEventListener("click", getResults);

// Function getresults
function getResults() {
    fetch(`${api}`)
        .then(currency => {
            return currency.json();
        }).then(displayResults);
}

// Display results after conversion
function displayResults(currency) {
    let fromRate = currency.rates[resultFrom];
    let toRate = currency.rates[resultTo];
    finalValue.innerHTML =
        ((toRate / fromRate) * searchValue).toFixed(2);
    finalAmount.style.display = "block";
}

// Function to calculate and display result
function calcResult() {
    fetch(`${api}`)
        .then(currency => {
            return currency.json();
        }).then(displayResults);
}

// When user clicks on reset button
function clearVal() {
    window.location.reload();
    finalValue.innerHTML = "";
}