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


// create new comment with post id api/comments/:id
router.post("/:id", withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      post_id: req.params.id,
      user_id: req.session.user_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400);
  }
});

// update comment based on comment id /api/comments/:id
router.put("/:id", withAuth, async (req, res) => {
  try {
    console.log(req.body);
    const updatedComment = await Comment.update(
      {
        ...req.body,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!updatedComment) {
      res
        .status(404)
        .json({
          message:
            "Unable to find comment with that id, or requested comment content is the same as current",
        });
      return;
    }
    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete comment based on comment id api/comments/:id
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        post_id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: "no comment found with that id" });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
