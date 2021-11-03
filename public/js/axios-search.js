const axios = require("axios");
require('dotenv').config();
const baseUrl = 'https://finnhub.io/api/v1/';
const apiKey = `&token=${process.env.API_KEY}`;

var userSearchTest = "apple";

async function stockSearch() {
    console.log("You will want the stock ticker that does NOT have a '.XX' at the end.");
    const completeSearchQuery = `${baseUrl}search?q=${userSearchTest}${apiKey}`;
    const response = await axios.get(completeSearchQuery)
    console.log(response);
}
stockSearch();