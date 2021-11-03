const { Stock } = require('../models');

const stockData = [

];

const seedStock = () => Stock.bulkCreate(stockData);

module.exports = seedStock;