const cheerio = require('cheerio');
const axios = require("axios");

const yahooTrendingUrl = "https://finance.yahoo.com/trending-tickers/";

async function loadTrending() {
    var trendingTinkerArray = [];
    var trendingNameArray = [];

    const response = await axios.get(yahooTrendingUrl)

    const $ = cheerio.load(response.data);
    $('a[data-test=quoteLink]').each((i, element) => {
        // console.log(i+1);
        // console.log(element);
        trendingTinkerArray.push(element.children[0].data)
        trendingNameArray.push(element.attribs.title)
    });
    console.log(trendingTinkerArray);
    console.log(trendingNameArray);

    var trendingStock = [];
    for (var i = 0; i < trendingTinkerArray.length; i++) {
        trendingStock.push({
            ticker: trendingTinkerArray[i],
            name: trendingNameArray[i],
            price: 1.11,
            change: 1.22,
            percent_change: 1.33,
            open: 1.55,
            high: 1.66,
            low: 1.44
        });
    }
    console.log(trendingStock);
}
loadTrending();