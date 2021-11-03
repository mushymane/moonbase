const { Model, DataTypes, Sequelize } = require('sequelize');
const { User, Post, Comment, Hype } = require('../../models');
const withAuth = require('../../utils/auth');
const router = require('./user-routes');


// Get a post's hypes
router.get('/posts/:id', withAuth, async (req, res) => {
    try {
        const postHypeData = await Hype.findAll({
            include: [{ model: Post }, { model: User }],
            where: { post_id: req.params.id  }
        })
        res.status(200).json(postHypeData);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Get a user's hypes
router.get('/users/:id', withAuth, async (req, res) => {
    try {
        const userHypeData = await Hype.findAll({
            include: [{ model: Post }, { model: User }],
            where: { user_id: req.params.id  }
        })
        res.status(200).json(userHypeData);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Get a post's hype count
router.get('/posts/:id/hypecount', withAuth, async (req, res) => {
    try {
        const postHypeCount = await Post.findByPk(req.params.id, {
            include: [{ model: Post, attributes: ['hype_count'] }]
        })
        res.status(200).json(postHypeCount);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.put('/posts/:id', withAuth, async (req, res) => {
    try {
        const postHypeData = await Post.update({
            field: Sequelize.literal('hype_count + 1')
        },
        {
            where: { id: req.params.id }
        })
    } catch (err) {
        res.status(500).json(err);
    }
})


// adds another hype element, not sure if this works we can check
// api/hype/
router.post('/', withAuth, async (req, res) => {
    try {
        const hypeData = await Hype.create(...req.body);
        res.status(200).json(hypeData);
    } catch (err) {
        res.status(400).json(err);
    }
});


router.delete('/:id', withAuth, async (req, res) => {
// deletes hype based on hype id api/hype/:id
    try {
        const hypeData = await Hype.destroy({
            where: { id: req.params.id }
        });

        if (!hypeData) {
            res.status(404).json({ message: 'no hype found with this id' })
            return;
        }
        res.status(200).json(hypeData);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;