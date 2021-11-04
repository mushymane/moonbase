const cheerio = require('cheerio');
const axios = require("axios");
const quotePrice = require('./axios-quote');
const yahooTrendingUrl = "https://finance.yahoo.com/trending-tickers/";

async function loadTrending() {
    try {
        var trendingStock = [];
        const response = await axios.get(yahooTrendingUrl)
        const $ = cheerio.load(response.data);
        $('a[data-test=quoteLink]').each((i, element) => {
            trendingStock.push({
                ticker: element.children[0].data,
                name: element.attribs.title,
                price: 0,
                change: 0,
                percent_change: 0,
                open: 0,
                high: 0,
                low: 0
            });
        });
        return trendingStock;
    } catch (err) {
        console.error(err);
    }
}

async function quoteTrending() {
    try {
        var trendingStock = await loadTrending();
        for (var i = 0; i < trendingStock.length; i++) {
            let quoteForI = await quotePrice(trendingStock[i].ticker);
            trendingStock[i].price = quoteForI.c,
                trendingStock[i].change = quoteForI.d,
                trendingStock[i].percent_change = quoteForI.dp,
                trendingStock[i].open = quoteForI.o,
                trendingStock[i].high = quoteForI.h,
                trendingStock[i].low = quoteForI.l
        }
        return trendingStock;
    } catch (err) {
        console.error(err);
    }
}

async function createTrending() {
    try {
        var trendingWithPrice = await quoteTrending();
        return trendingWithPrice;
    } catch (err) {
        console.error(err);
    }
}

module.exports = createTrending;