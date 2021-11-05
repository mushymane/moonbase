const createTrending = require('./cheerio-trending');

var trendingStocks = []; // should be populate after start

async function setHourlyTrendingStocks() {
    try {
        trendingStocks = await createTrending();
        // console.log(trendingStocks);
    } catch (err) {
        console.error(err);
    }
}

module.exports = { setHourlyTrendingStocks, trendingStocks };