const router = require('express').Router();
const userRoutes = require('./user-routes'); // user comment routes will go here
const postRoutes = require('./post-routes'); // post comment routes will go here
const hypeRoutes = require('./hype-routes');
// include routes and stocks later

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/hype', hypeRoutes);
// router.use comments, hypes, stocks

module.exports = router;