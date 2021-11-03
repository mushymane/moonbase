const axios = require("axios");
require('dotenv').config();
const baseUrl = 'https://finnhub.io/api/v1/';
const apiKey = `&token=${process.env.API_KEY}`;

var userQuoteTest = "AAPL";

async function stockQuote() {
    const completeQuoteQuery = `${baseUrl}quote?symbol=${userQuoteTest}${apiKey}`;
    const response = await axios.get(completeQuoteQuery)
    console.log(response);
}
stockQuote();