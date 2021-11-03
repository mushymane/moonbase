const sequelize = require('../config/connection');
const { User, Post, Comment, Hype, Stock } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');
const hypeData = require('./hypeData.json');
const stockData = require('./stocktData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const posts = await Post.bulkCreate(postData, {
    individualHooks: true,
    returning: true,
  });

  const comments = await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });

  const hype = await Comment.bulkCreate(hypeData, {
    individualHooks: true,
    returning: true,
  });
  const stock = await Comment.bulkCreate(stockData, {
    individualHooks: true,
    returning: true,
  });
  process.exit(0);
};

seedDatabase();