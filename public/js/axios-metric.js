const axios = require("axios");
require('dotenv').config();
const baseUrl = 'https://finnhub.io/api/v1/';
const apiKey = `&token=${process.env.API_KEY}`;

var userMetricTest = "AAPL";

async function stockMetric() {
    const completeMetricQuery = `${baseUrl}stock/metric?symbol=${userMetricTest}&metric=all${apiKey}`;
    const response = await axios.get(completeMetricQuery)
    console.log(response);
}
stockMetric();