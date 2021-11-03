const router = require('express').Router();

const apiRoutes = require('./api');
const siteRoutes = require('./siteRoutes');

router.use('/api', apiRoutes);
router.use('/', siteRoutes);

module.exports = router;