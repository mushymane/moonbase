const User = require('./User');
const Stock = require('./Stock');
const Post = require('./Post');
const Comment = require('./Comment');
const Hype = require('./Hype');

//relationships here
User.hasMany(Post, {
    foreignKey: 'user_id',
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
});

User.hasMany(Hype, {
    foreignKey: 'user_id',
});


Post.belongsTo(User, {
    foreignKey: 'user_id',
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
});

Post.hasMany(Hype, {
    foreignKey: 'post_id',
});


Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
});


Hype.belongsTo(Post, {
    foreignKey: 'post_id',
});

Hype.belongsTo(User, {
    foreignKey: 'user_id',
});


module.exports = { User, Stock, Post, Comment, Hype };
