const router = require("express").Router();
const { User, Post, Comment, Hype, Stock } = require("../../models");
const withAuth = require("../../utils/auth");
const quotePrice = require('../../utils/axios-quote');

/* gets all posts with path /api/posts */
router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                { model: User, attributes: ['id', 'username'] },
                { model: Comment },
                { model: Hype }
            ]
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// gets post by post id /api/posts/:id
router.get("/:id", async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User }, { model: Comment }, { model: Hype }],
        });

        if (!postData) {
            res.status(404).json({ message: "no post found with that id" });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// gets posts posted by a particular user /api/posts/user/:id
router.get("/user/:id", async (req, res) => {
    try {
        const postData = await Post.findAll(
            { where: { user_id: req.params.id } },
            {
                include: [
                    { model: User },
                    { model: Comment },
                    // { model: Stock }
                ],
            },

        );

        if (!postData) {
            res.status(404).json({ message: "no post found with that id" });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// gets posts posted by a particular user /api/posts/stock/:id
// router.get("/stock/:id", async (req, res) => {
//     try {
//       const postData = await Post.findAll({
//         where: {
//           stock_id: req.params.id,
//         },
//         include: [{ model: User }, { model: Comment }, { model: Stock }],
//       });

//       if (!postData) {
//         res.status(404).json({ message: "no post found with that id" });
//         return;
//       }

//       res.status(200).json(postData);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

// **************************************** TODO: UNCOMMENT
// Adds new post /api/posts
// router.post("/", withAuth, async (req, res) => {
router.post("/", async (req, res) => {
    try {
        const quote = await quotePrice(req.body.ticker);
        const postData = await Post.create({
            ...req.body,
            price: quote.c,
            change: quote.d,
            percent_change: quote.dp,
            user_id: req.session.user_id
        });
        // console.log(postData);
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

//updates post based on post id /api/posts/:id
// router.put("/:id", withAuth, async (req, res) => {
router.put("/:id", async (req, res) => {
    try {
        const postData = await Post.update(
            {
                ...req.body
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        if (!postData) {
            res.status(404).json({ message: "No Post found with this id" });
            return;
        }
        res.status(200).json({ message: 'user successfUlly updated' });
    } catch (err) {
        console.log(err);
        res.json(err);
    }
});

//deletes post based on post id /api/posts/:id
// router.delete("/:id", withAuth, async (req, res) => {
router.delete("/:id", async (req, res) => {
    try {
        const postData = Post.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!postData) {
            res.status(404).json({ message: "No Post found with this id" });
            return;
        }
        res.status(200).json({ message: "deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//get all comments based on post id
router.get("/:id/comments", async (req, res) => {
    try {
        const commentData = await Comment.findAll(
            {
                where: { post_id: req.params.id },
                include: [
                    { model: Post, attributes: ['title', 'user_id'] },
                    { model: User, attributes: ['username'] },
                ]
            }
        );
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//post a new comment
router.post('/:id/comment', async (req, res) => {
// router.post('/:id/comment', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
            post_id: req.params.id
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400);
    }
})

// update comment based on post id and user id /api/posts/:id/comment/
// can test when we have fornt end
// router.put("/:id/comment/", withAuth, async (req, res) => {
//     try {
//       console.log(req.body);
//       const updatedComment = await Comment.update(
//         {
//           ...req.body,
//         },
//         {
//           where: {
//             id: req.params.id,
//             user_id: req.session.id
//           },
//         }
//       );
//       if (!updatedComment) {
//         res
//           .status(404)
//           .json({
//             message:
//               "Unable to find comment with that id, or requested comment content is the same as current",
//           });
//         return;
//       }
//       res.status(200).json(updatedComment);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

// Delete comment based on comment id api/comments/:id
// can test when we have front end
// router.delete("/:id", withAuth, async (req, res) => {
//     try {
//       const commentData = await Comment.destroy({
//         where: {
//           id: req.params.id,
//           post_id: req.params.id,
//           user_id: req.session.user_id,
//         },
//       });
  
//       if (!commentData) {
//         res.status(404).json({ message: "no comment found with that id" });
//         return;
//       }
  
//       res.status(200).json(commentData);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

module.exports = router;