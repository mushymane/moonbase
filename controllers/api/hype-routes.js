const router = require("express").Router();
const { User, Post, Comment, Hype } = require('../../models');
const withAuth = require('../../utils/auth');

// get all hypes
router.get('/', async (req, res) => {
    try {
        const hypeData = await Hype.findAll({
            include: [
                { model: Post, attributes: ['id'] },
                { model: User, attributes: ['id'] }
            ]
        });

        res.status(200).json(hypeData);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Get a post's hypes
// router.get('/posts/:id/', withAuth, async (req, res) => {
router.get('/posts/:id/', async (req, res) => {
    try {
        const postHypeData = await Hype.findAll({
            include: [
                { model: Post, attributes: ['id', 'title', 'hype_count'] },
                { model: User, attributes: ['id', 'username'] }
            ],
            where: { post_id: req.params.id }
        })

        res.status(200).json(postHypeData);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Get a user's hypes
// router.get('/users/:id/', withAuth, async (req, res) => {
router.get('/users/:id/', async (req, res) => {
    try {
        const userHypeData = await Hype.findAll({
            include: [
                { model: Post, attributes: ['id', 'title', 'hype_count'] },
                { model: User, attributes: ['id', 'username'] }],
            where: { user_id: req.params.id }
        })
        res.status(200).json(userHypeData);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Get a post's hype count
router.get('/posts/:id/hypecount', async (req, res) => {
    try {
        // const postHypeCount = await Post.findByPk(req.params.id, {
        //      attributes: ['hype_count'] 
        // })
        const postHypeCount = await Hype.findAndCountAll({
            where: {
                post_id: req.params.id
            }
        });
        res.status(200).json(postHypeCount);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/posts/:id/userhc', async (req, res) => {
    try {
        const userPostHypeCount = await Hype.count({
            col: 'user_id',
            where: {
                post_id: req.params.id,
                user_id: req.session.user_id
            }
        })
        res.status(200).json(userPostHypeCount)
    } catch (err) {
        res.status(500).json(err);
    }
})

// not working, maybe test on front end?
// increment hypecount when a user click on a post's hype
// router.put('/posts/:id', withAuth, async (req, res) => {
router.put('/posts/:id', async (req, res) => {
    try {

        const postHypeData = await Post.increment('hype_count',
            { by: 1 },
            {
                where: { post_id: req.params.id }
            }
        );
        res.status(200).json({ message: 'hype count incremented by 1' })
    } catch (err) {
        res.status(500).json(err);
    }
})


router.put("/postcredit", async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id);
        const user = userData.get({ plain: true });

        let currentHype = user.hype_count;
        newHype = currentHype + 100;
 
    } catch (err) {
        res.status(400).json(err);
    } finally {
        const hypeData = await User.update(
            { hype_count: newHype },
            {
                where: {id: req.session.user_id}
            }
        );
        console.log(hypeData);
        // res.status(200).json(hypeData);
    }
});


// const postHypeData = await Post.update(
//     {
//         hype_count: sequelize.literal('hype_count + 1')
//     },
//     // { hype_count: Sequelize.literal('hype_count + 1') },
//     {
//         where: { post_id: req.params.id }
//     }
// );


// adds another hype element, not sure if this works we can check
// api/hype/
// router.post('/', withAuth, async (req, res) => {
router.post('/', async (req, res) => {
    try {
        const hypeData = await Hype.create({
            ...req.body,
            user_id: req.session.user_id
        });
        res.status(200).json({ message: 'successfully created new hype' });
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
