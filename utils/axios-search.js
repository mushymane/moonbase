const axios = require("axios");
require('dotenv').config();
const baseUrl = 'https://finnhub.io/api/v1/';
const apiKey = `&token=${process.env.API_KEY}`;

async function stockSearch(ticker) {
    try {
        let userSearch = ticker
        const completeSearchQuery = `${baseUrl}search?q=${userSearch}${apiKey}`;
        const response = await axios.get(completeSearchQuery)
        // console.log(response.data.result); // full results
        // console.log(response.data.result[0]); //probably want the 0 position one. This is a few seconds faster too.
        return response.data.result[0];
    } catch (err) {
        console.error(err);
    }
}

module.exports = stockSearch;

// [
//     {
//       description: 'APPLE INC',
//       displaySymbol: 'AAPL',
//       symbol: 'AAPL',
//       type: 'Common Stock'
//     },