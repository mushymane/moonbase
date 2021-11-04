const User = require("./User");
const Stock = require("./Stock");
const Post = require("./Post");
const Comment = require("./Comment");
const Hype = require("./Hype");

//relationships here
User.hasMany(Post, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

User.hasMany(Hype, {
    foreignKey: 'user_id'
});

// not necessary i think?
// Stock.belongsToMany(Post, {
//     foreignKey: 'post_id',
// });

// User.hasMany(Stock, {
    
// })

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
})

// Post.hasOne(Stock, {
//     foreignKey: 'stock_id'
// });

// Post.belongsToMany(Hype, {
//     through: Hype
// })

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

Hype.belongsTo(Post, {
    foreignKey: 'post_id'
})

Hype.belongsTo(User, {
    foreignKey: 'user_id'
})


module.exports = {User, Stock, Post, Comment, Hype};