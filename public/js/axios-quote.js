const axios = require("axios");
require('dotenv').config();
const baseUrl = 'https://finnhub.io/api/v1/';
const apiKey = `&token=${process.env.API_KEY}`;


// var quoteBtn = document.getElementById('#quote')

var userQuoteTest = "AAPL";  // This is a hard-coded test variable

async function stockQuote() {
    const completeQuoteQuery = `${baseUrl}quote?symbol=${userQuoteTest}${apiKey}`;
    const response = await axios.get(completeQuoteQuery)
    console.log(response.data); // response explained below

    
}
stockQuote();

// quoteBtn.addEventListener("click", stockQuote); 

// what the results mean
// c - Current price
// d - Change
// dp - Percent change
// h - High price of the day
// l - Low price of the day
// o - Open price of the day
// pc - Previous close price

// {
//     c: 150.02,
//     d: 1.06,
//     dp: 0.7116,
//     h: 151.57,
//     l: 148.68,
//     o: 148.66,
//     pc: 148.96,
//     t: 1635883203
//   }