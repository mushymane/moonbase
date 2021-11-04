/***** should probably migrate this into post-routes.js *****/

const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// get all comments /api/comments/:id
router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [{ model: User }, { model: Post }],
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// /api/comments/posts/:id, same as /api/posts/:id/comments
//get all comments based on post id NOTE this is already in post-routes.js 
router.get("/posts/:id", async (req, res) => {
  try {
    const commentData = await Comment.findAll(
      { include: [{ model: Post }, { model: User }] },
      { where: { post_id: req.params.id } }
    );
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get comment by comment id /api/comments/:id
router.get("/:id", async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      include: [{ model: Post }, { model: User }],
    });
    if (!commentData) {
      res
        .status(404)
        .json({ message: "no comment found with this comment id" });
      return;
    }
    res.status(200).json(commentData)
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
