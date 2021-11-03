const router = require("express").Router();
const { User, Post, Comment, Hype } = require('../../models');
const withAuth = require('../../utils/auth');


module.exports = router;