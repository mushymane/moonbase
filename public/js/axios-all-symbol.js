const axios = require("axios");
require('dotenv').config();
const baseUrl = 'https://finnhub.io/api/v1/';
const apiKey = `&token=${process.env.API_KEY}`;


async function getAllNyse() {
    let mic = "NYSE"
    const completeSymbolQuery = `${baseUrl}stock/symbol?exchange=US&?mic=${mic}&?currency=USD${apiKey}`;
    const response = await axios.get(completeSymbolQuery)
    console.log(response);
}
getAllNyse();


async function getAllNxas() {
    let mic = "NXAS"
    const completeSymbolQuery = `${baseUrl}stock/symbol?exchange=US&?mic=${mic}&?currency=USD${apiKey}`;
    const response = await axios.get(completeSymbolQuery)
    console.log(response);
}
getAllNxas();