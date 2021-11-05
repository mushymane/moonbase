const axios = require("axios");
require('dotenv').config();
const baseUrl = 'https://finnhub.io/api/v1/';
const apiKey = `&token=${process.env.API_KEY}`;


async function stockQuote(ticker) {
    try {
        let userQuote = ticker;
        if (ticker === 'LSPD.TO' || ticker === 'D05.SI') {
            let badStock = {
                c: 0,
                d: 0,
                dp: 0,
                h: 0,
                l: 0,
                o: 0,
                pc: 0,
                t: 0
            }
            return badStock;
        } else {
            const completeQuoteQuery = `${baseUrl}quote?symbol=${userQuote}${apiKey}`;
            const response = await axios.get(completeQuoteQuery)
            // console.log(response.data);
            return response.data; // response explained below
        }
    } catch (err) {
        console.error(err);
    }
}

module.exports = stockQuote;

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