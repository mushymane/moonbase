const createTrending = require('./cheerio-trending');

function setHourlyTrendingStocks() {
    async () => {
        const trendingStocks = await createTrending();
        return trendingStocks;
    }
}

module.exports = setHourlyTrendingStocks;


// await setInterval(  {
//     createTrending();
//     console.log("interval set");
//     console.log(createTrending());
// }, 10000);