/***** should probably migrate this into post-routes.js *****/

const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:id/comment', async (req, res) => {
    try {
        const commentData = await Comment.findAll(
            { include: [{ model: Post }, { model: User }] },
            { where: { post_id: req.params.id } }
        );
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/:id/comment/:cid', async (req, res) => {
    try {
        const commentData = await Comment.findByPk(req.params.cid, {
            include: [{ model: Post }, { model: User }]
        })

        if (!commentData) {
            res.status(404).json({ message: 'no comment found with this comment id' })
            return;
        }
        
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/:id')

router.post('/:id/comment', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            post_id: req.params.id,
            user_id: req.session.user_id
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400);
    }
})

router.put('/:id/comment/:cid', withAuth, async (req, res) =>{
    try {
        console.log(req.body);
        const updatedComment = await Comment.update(
            {
                ...req.body
            },
            {
                where: {
                    id: req.params.cid
                }
            }
        );
        if (!updatedComment) {
            res.status(404).json({ message: 'Unable to find comment with that id, or requested comment content is the same as current' });
            return;
        }
        res.status(200).json(updatedComment);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Delete comment?
router.delete('/:id/comment/:cid', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.cid,
                post_id: req.params.id,
                user_id: req.session.user_id
            }
        })

        if (!commentData) {
            res.status(404).json({ message: 'no comment found with that id' });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;