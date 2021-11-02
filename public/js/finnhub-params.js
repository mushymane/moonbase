require('dotenv').config();

// General Use
const baseUrl = 'https://finnhub.io/api/v1/';
const apiKey = `&token=${process.env.API_KEY}`;

// Search Use
const userSearchTest = "apple";
const completeSearchQuery = `${baseUrl}search?q=${userSearchTest}`; // REQUIRED

 
// Metric Use (AKA Basic Financials in the finnhub docs)



// ?symbol=

const metricURL = `${baseUrl}stock/metric`; // REQUIRED




// Symbol Use
const symbolURL = `${baseUrl}stock/symbol`;

const XNAS = "XNAS";
const XNYS = "XNYS";

const mic = `?mic=`; // optional. Using XNYS or XNAS

const completeSymbolQuery = `${symbolURL}?exchange=US&?mic=${XNAS}&?currency=USD${apiKey}`
 
// Quote Use
const completeQuoteQuery = `${baseUrl}quote?symbol=`; // REQUIRED






module.exports = { baseUrl, apiKey }