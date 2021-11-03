const axios = require("axios");
require('dotenv').config();
const baseUrl = 'https://finnhub.io/api/v1/';
const apiKey = `&token=${process.env.API_KEY}`;

var userSearchTest = "apple";  // This is a hard-coded test variable

async function stockSearch() {
    // console.log("You will want the stock ticker that does NOT have a '.XX' at the end.");
    const completeSearchQuery = `${baseUrl}search?q=${userSearchTest}${apiKey}`;
    const response = await axios.get(completeSearchQuery)
    console.log(response.data.result); // full results
    console.log(response.data.result[0]); //probably want the 0 position one. This is a few seconds faster too.


    
}
stockSearch();

// [
//     {
//       description: 'APPLE INC',
//       displaySymbol: 'AAPL',
//       symbol: 'AAPL',
//       type: 'Common Stock'
//     },