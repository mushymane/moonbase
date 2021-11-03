const router = require("express").Router();
const { User, Post, Comment, Hype, Stock } = require("../../models");
const withAuth = require("../../utils/auth");

/**
 *  gets all posts with path /api/posts
 */
router.get("/", async (req, res) => {
  try {
    const userData = await Post.findAll({
      include: [{ model: User }, { model: Comment }, { model: Stock }],
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// gets post by post id /api/posts/:id
router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User }, { model: Comment }, { model: Stock }],
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
    const postData = await Post.findAll({
      where: {
        user_id: req.params.id,
      },
      include: [{ model: User }, { model: Comment }, { model: Stock }],
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

// gets posts posted by a particular user /api/posts/stock/:id
router.get("/stock/:id", async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        stock_id: req.params.id,
      },
      include: [{ model: User }, { model: Comment }, { model: Stock }],
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

// adds new post /api/posts
router.post("/", async (req, res) => {
  try {
    const postData = await User.create({
      ...req.body,
      include: { model: User, where: { id: req.session.user_id } },
      include: { model: Stock, where: { id: req.session.stock_id } },
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//updates post based on post id /api/posts/:id
router.put("/:id", async (req, res) => {
  try {
    const postData = await Post.update(
      {
        title: req.body.title,
        description: req.body.description,
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
    res.status(200).json(postData);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

//deletes post based on post id /api/posts/:id
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

//TODO also get comments under each post

module.exports = router;
