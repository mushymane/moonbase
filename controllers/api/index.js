const router = require('express').Router();
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');
const hypeRoutes = require('./hype-routes');
const stockRoutes = require('./stock-routes');
// include routes for comments, hypes, and stocks later

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/hype', hypeRoutes);
router.use('/stocks', stockRoutes);

module.exports = router;