const sequelize = require('../config/connection');
const { User, Post, Comment, Stock } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');
const stockData = require('./stockData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData);

  await Post.bulkCreate(postData);

  await Comment.bulkCreate(commentData);

  await Stock.bulkCreate(stockData);
  process.exit(0);
};

seedDatabase();
