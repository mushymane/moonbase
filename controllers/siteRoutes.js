const router = require('express').Router();
const { User, Post, Comment, Hype, Stock } = require('../models');
const quotePrice = require('../utils/axios-quote');
const withAuth = require('../utils/auth');
// const trending = require('../utils/trend-interval')
const cheerioTrending = require('../utils/cheerio-trending')
var stock;

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                { model: User, attributes: ['username'] },
                { model: Hype }
            ]
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('feed', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['text_body', 'date_created', 'user_id', 'bull_count', 'bear_count'],
                    include: [{
                        model: User,
                        attributes: ['username']
                    }]
                }
            ]
        })

        const post = postData.get({ plain: true });

        res.render('post', {
            post,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }, { model: Comment }, 
                {
                    model: Hype,
                    include: [
                        {
                            model: Post,
                        },
                    ],
                    
                },]
        });

        const user = userData.get({ plain: true });
        console.log(user);
        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/dashboard/new', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            include: [{ model: Post }]
        })

        const user = userData.get({ plain: true });

        res.render('new', {
            ...user,
            logged_in: true
        })
    } catch (err) {
        res.status(500).json(err);
    }
})

// Also display comments on edit post page?
router.get('/dashboard/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
        const post = await postData.get({ plain: true });

        res.render('edit', {
            ...post,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

// TODO
router.get('/trending', async (req, res) => {
    // stock = await cheerioTrending();
    console.log(stock);
    try {
        res.render('trending', {
            stock,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err);
    }
})

//TODO get individual stock url to view comments as well path: /trending/:tickerid, much like single-post on the techblog
router.get('/stock/:id', async (req, res) => {
    try {
        const quote = await quotePrice(req.params.id);

        const stock = {
            ticker: req.params.id,
            price: quote.c,
            change: quote.d,
            percent_change: quote.dp,
            open: quote.o,
            high: quote.h,
            low: quote.l
        };
        const postData = await Post.findAll({
            where: { ticker: req.params.id } ,
            include: [
                { model: User, attributes: ['username'] },
                { model: Hype },
                
                ]},
            
        
        );

        const posts = postData.map((post) => post.get({ plain: true }));

        // const stockData = await Stock.findByPk(req.params.id, {
        //     include: [{ model: Post }]
        // })

        

        // if (!stockData) {
        //     const newStock = await Stock.create({
        //         ticker: req.params.id,
        //         price: quote.c,
        //         change: quote.d,
        //         percent_change: quote.dp,
        //         open: quote.o,
        //         high: quote.h,
        //         low: quote.l
        //     });
            
        //     const stock = newStock.get({ plain: true });

        //     res.render('stock', {
        //         ...stock
        //     })
        // } else if (stockData) {
        //     const updatedStock = await Stock.update({
        //         price: quote.c,
        //         change: quote.d,
        //         percent_change: quote.dp,
        //         open: quote.o,
        //         high: quote.h,
        //         low: quote.l
        //     });

        //     const stock = updatedStock.get({ plain: true });

        //     res.render('stock', {
        //         ...stock,
        //         logged_in: req.session.logged_in
        //     })
        // }

        res.render('stock', {
            ...stock,
            posts,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/login', async (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
    stock = await cheerioTrending();
})

router.get('/signup', async (req, res) => {
    res.render('signup');
    stock = await cheerioTrending();
})

module.exports = router;
