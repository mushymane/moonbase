const router = require('express').Router();
const userRoutes = require('./user-routes');
// const postRoutes = require('./post-routes');
// include routes for comments, hypes, and stocks later

router.use('/users', userRoutes);
// router.use('/posts', postRoutes);
// router.use comments, hypes, stocks

module.exports = router;