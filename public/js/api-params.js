require('dotenv').config();

const baseUrl = 'https://finnhub.io/api/v1/';
const apiKey = `&token=${process.env.API_KEY}`;

module.exports = { baseUrl, apiKey }