const axios = require("axios");
const apiParams = require("./finnhub-params");
const apiKey = apiParams.apiKey;
const baseUrl = apiParams.baseUrl;
const symbolURL = `${baseUrl}stock/symbol`;


async function getAllNyse() {
    let mic = "NYSE"
    const completeSymbolQuery = `${symbolURL}?exchange=US&?mic=${mic}&?currency=USD${apiKey}`;
    const response = await axios.get(completeSymbolQuery)
    console.log(response);
}
getAllNyse();


async function getAllNxas() {
    let mic = "NXAS"
    const completeSymbolQuery = `${symbolURL}?exchange=US&?mic=${mic}&?currency=USD${apiKey}`;
    const response = await axios.get(completeSymbolQuery)
    console.log(response);
}
getAllNxas();