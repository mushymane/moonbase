const axios = require("axios");
require('dotenv').config();
const baseUrl = 'https://finnhub.io/api/v1/';
const apiKey = `&token=${process.env.API_KEY}`;

var userMetricTest = "AAPL"; // This is a hard-coded test variable

async function stockMetric() {
    const completeMetricQuery = `${baseUrl}stock/metric?symbol=${userMetricTest}&metric=all${apiKey}`;
    const response = await axios.get(completeMetricQuery)
    console.log(response.data.metric); // Probably don't need all of these
}
stockMetric();




// {
//     '10DayAverageTradingVolume': 73.34312,
//     '13WeekPriceReturnDaily': 2.70122,
//     '26WeekPriceReturnDaily': 13.95101,
//     '3MonthAverageTradingVolume': 1608.77652,
//     '52WeekHigh': 157.26,
//     '52WeekHighDate': '2021-09-07',
//     '52WeekLow': 107.32,
//     '52WeekLowDate': '2020-11-02',
//     '52WeekPriceReturnDaily': 29.89941,
//     '5DayPriceReturnDaily': 0.74652,
//     assetTurnoverAnnual: 1.08408,
//     assetTurnoverTTM: 1.08408,
//     beta: 1.20589,
//     bookValuePerShareAnnual: 3.84068,
//     bookValuePerShareQuarterly: 3.84068,
//     bookValueShareGrowth5Y: -8.56159,
//     capitalSpendingGrowth5Y: -2.73554,
//     cashFlowPerShareAnnual: 6.2831,
//     cashFlowPerShareTTM: 6.2831,
//     cashPerSharePerShareAnnual: 3.81322,
//     cashPerSharePerShareQuarterly: 3.81322,
//     currentDividendYieldTTM: 0.56742,
//     'currentEv/freeCashFlowAnnual': 31.57672,
//     'currentEv/freeCashFlowTTM': 31.57672,
//     currentRatioAnnual: 1.07455,
//     currentRatioQuarterly: 1.07455,
//     dividendGrowthRate5Y: 7.72173,
//     dividendPerShare5Y: 0.735,
//     dividendPerShareAnnual: 0.85,
//     dividendYield5Y: 0.89882,
//     dividendYieldIndicatedAnnual: 0.58745,
//     dividendsPerShareTTM: 0.85,
//     ebitdPerShareTTM: 7.12918,
//     ebitdaCagr5Y: 11.48175,
//     ebitdaInterimCagr5Y: 11.25799,
//     epsBasicExclExtraItemsAnnual: 5.66903,
//     epsBasicExclExtraItemsTTM: 5.66246,
//     epsExclExtraItemsAnnual: 5.61402,
//     epsExclExtraItemsTTM: 5.60714,
//     epsGrowth3Y: 22.53337,
//     epsGrowth5Y: 22.00709,
//     epsGrowthQuarterlyYoy: 68.22124,
//     epsGrowthTTMYoy: 71.64066,
//     epsInclExtraItemsAnnual: 5.61402,
//     epsInclExtraItemsTTM: 5.60714,
//     epsNormalizedAnnual: 5.61402,
//     focfCagr5Y: 13.67622,
//     freeCashFlowAnnual: 78486,
//     freeCashFlowPerShareTTM: 4.6538,
//     freeCashFlowTTM: 78486,
//     'freeOperatingCashFlow/revenue5Y': 19.49073,
//     'freeOperatingCashFlow/revenueTTM': 21.45499,
//     grossMargin5Y: 39.14537,
//     grossMarginAnnual: 41.77936,
//     grossMarginTTM: 41.77936,
//     inventoryTurnoverAnnual: 40.03026,
//     inventoryTurnoverTTM: 40.03026,
//     'longTermDebt/equityAnnual': 174.156,
//     'longTermDebt/equityQuarterly': 174.156,
//     marketCapitalization: 2476219,
//     monthToDatePriceReturnDaily: 5.86572,
//     netDebtAnnual: 62928,
//     netDebtInterim: 62928,
//     netIncomeEmployeeAnnual: 629103,
//     netIncomeEmployeeTTM: 614805.2,
//     netInterestCoverageAnnual: null,
//     netInterestCoverageTTM: null,
//     netMarginGrowth5Y: 4.08444,
//     netProfitMargin5Y: 22.69914,
//     netProfitMarginAnnual: 25.88179,
//     netProfitMarginTTM: 25.88179,
//     operatingMargin5Y: 26.61791,
//     operatingMarginAnnual: 29.78238,
//     operatingMarginTTM: 29.78238,
//     payoutRatioAnnual: 15.24187,
//     payoutRatioTTM: 15.24187,
//     pbAnnual: 39.00353,
//     pbQuarterly: 39.00353,
//     pcfShareTTM: 23.36849,
//     peBasicExclExtraTTM: 25.94632,
//     peExclExtraAnnual: 26.6832,
//     peExclExtraHighTTM: 35.67625,
//     peExclExtraTTM: 26.71594,
//     peExclLowTTM: 13.09033,
//     peInclExtraTTM: 26.71594,
//     peNormalizedAnnual: 26.6832,
//     pfcfShareAnnual: 31.54982,
//     pfcfShareTTM: 31.54982,
//     pretaxMargin5Y: 27.16387,
//     pretaxMarginAnnual: 29.8529,
//     pretaxMarginTTM: 29.8529,
//     'priceRelativeToS&P50013Week': -1.98451,
//     'priceRelativeToS&P50026Week': 3.45477,
//     'priceRelativeToS&P5004Week': -0.6504,
//     'priceRelativeToS&P50052Week': -6.63499,
//     'priceRelativeToS&P500Ytd': -7.92498,
//     psAnnual: 6.76901,
//     psTTM: 6.76901,
//     ptbvAnnual: 39.24899,
//     ptbvQuarterly: 39.24899,
//     quickRatioAnnual: 1.02211,
//     quickRatioQuarterly: 1.02211,
//     receivablesTurnoverAnnual: 17.25633,
//     receivablesTurnoverTTM: 17.25633,
//     revenueEmployeeAnnual: 2430678,
//     revenueEmployeeTTM: 2375435,
//     revenueGrowth3Y: 11.26228,
//     revenueGrowth5Y: 11.14945,
//     revenueGrowthQuarterlyYoy: 28.84479,
//     revenueGrowthTTMYoy: 33.25938,
//     revenuePerShareAnnual: 21.691,
//     revenuePerShareTTM: 21.691,
//     revenueShareGrowth5Y: 17.21938,
//     roaRfy: 28.05791,
//     roaa5Y: 18.20499,
//     roae5Y: 64.28559,
//     roaeTTM: 147.4433,
//     roeRfy: 147.4433,
//     roeTTM: 28.05791,
//     roi5Y: 26.18254,
//     roiAnnual: 42.64702,
//     roiTTM: 42.64702,
//     tangibleBookValuePerShareAnnual: 3.84068,
//     tangibleBookValuePerShareQuarterly: 3.84068,
//     tbvCagr5Y: -12.01172,
//     'totalDebt/totalEquityAnnual': 199.0284,
//     'totalDebt/totalEquityQuarterly': 199.0284,
//     totalDebtCagr5Y: 7.6067,
//     yearToDatePriceReturnDaily: 12.89472
//   }