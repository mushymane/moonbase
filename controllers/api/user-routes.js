const router = require('express').Router();
const { User, Post, Comment, Hype } = require('../../models');
const withAuth = require('../../utils/auth');

// get all users /api/users/
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            include: [
                { model: Post },
                { model: Comment },
                { model: Hype }
            ]
        });

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
})

// get user based on user id /api/users/:id
router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            include: [
                { model: Post },
                { model: Comment },
                { model: Hype }
            ]
        });

        if (!userData) {
            res.status(404).json({ message: 'no user found with that id' });
            return;
        }

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// create a new user /api/users
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        // below is probably not needed, because we alr have the login
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
        })
        // res.status(200).json(userData); // need to replace this with above code when ready for FE
    } catch (err) {
        res.status(400).json(err);
    }
})

// logins in user api/users/login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!userData) {
            res.status(400).json({ message: 'no user found with that email' })
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'incorrect password' })
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json({ user: userData, message: 'user is now logged in' })
        })

    } catch (err) {
        res.status(400).json(err);
    }
})

//logs out user with api/users/logout
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        })
    } else {
        res.status(404).end();
    }
})

// updates user info with /api/users/:id, may not be necessary
router.put('/:id', withAuth, async (req, res) => {
    try {
        console.log(req.body)
        const updatedUser = await User.update(
            {
                ...req.body,
            },
            {
                where: {
                    id: req.params.id
                }
            }
        );

        if (!updatedUser) {
            res.status(404).json({ message: 'unable to find user, or requested changes same as current' })
            return;
        }

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
})

// delete user based on user id /api/users/:id
// router.delete('/:id', withAuth, async (req, res) => {
//     try {
//         const userData = await User.destroy({
//             where: {
//                 id: req.params.id
//             }
//         })

//         if (!userData) {
//             res.status(404).json({ message: 'no user found with that id' })
//             return;
//         }

//         res.status(200).json(userData);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// })

// gets comments based on user id /api/users/id:/comments
router.get('/:id/comments', async (req, res) => {
    try {
        const commentData = await Comment.findAll(
            { 
                include: [
                    { model: Post, attributes: ['id', 'title', 'user_id'] }, 
                    { model: User, attributes: ['id', 'username'] }
                ] 
            },
            { where: { user_id: req.params.id } }
        );
        console.log(commentData);
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
})

// probably not necessary imo
// router.get('/:id/comments/:cid', async (req, res) => {
//     try {
//         const commentData = await Comment.findByPk(req.params.cid, {
//             include: [{ model: User }]
//         })

//         if (!commentData) {
//             res.status(404).json({ message: 'no comment found with this comment id' })
//             return;
//         }

//         res.status(200).json(commentData);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// })


module.exports = router;