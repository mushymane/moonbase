const axios = require("axios");
require('dotenv').config();
const baseUrl = 'https://finnhub.io/api/v1/';
const apiKey = `&token=${process.env.API_KEY}`;


async function getAllXnys() {
    let mic = "XNYS"
    const completeSymbolQuery = `${baseUrl}stock/symbol?exchange=US&mic=${mic}&currency=USD${apiKey}`;
    const response = await axios.get(completeSymbolQuery)
    console.log(response.data);
}


async function getAllXnas() {
    let mic = "XNAS"
    const completeSymbolQuery = `${baseUrl}stock/symbol?exchange=US&mic=${mic}&currency=USD${apiKey}`;
    const response = await axios.get(completeSymbolQuery)
    console.log(response.data);
}


// Response example
// data: [
//     {
//       currency: 'USD',
//       description: 'LIMCO DEL MAR LTD',
//       displaySymbol: 'LIDM',
//       figi: 'BBG000BDP6P0',
//       mic: 'OOTC',
//       symbol: 'LIDM',
//       type: 'Common Stock'
//     },
//     {
//       currency: 'USD',
//       description: 'WP CAREY INC',
//       displaySymbol: 'WPC',
//       figi: 'BBG000BCQM58',
//       mic: 'XNYS',
//       symbol: 'WPC',
//       type: 'REIT'
//     },