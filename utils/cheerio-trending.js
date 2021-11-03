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
        // console.log(element.attribs.title);
        trendingTinkerArray.push(element.children[0].data)
        trendingNameArray.push(element.attribs.title)
    });
    console.log(trendingTinkerArray);
    console.log(trendingNameArray);

}
loadTrending();

