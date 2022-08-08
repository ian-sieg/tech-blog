const router = require('express').Router();
const {Sequelize, Op} = require('sequelize');
const { User, Post, Comment} = require('../models');
const withAuth = require('../utils/auth');
// const unSqlDate = require('../utils/helpers')

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ],
            order: [
                ['updated_at', 'ASC']
            ]
        })
        const posts = postData.map((post) => post.get({plain:true}))
        //Reformat date
        for (let post of posts) {
            let updatedAt = new Date(post.updatedAt)
            post.updatedAt = updatedAt.toDateString()
        }
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', async (req, res) => {
    try {
        res.render('login')
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ],
            order: [
                ['created_at', 'ASC']
            ]
        })

        const posts = postData.map((post) => post.get({ plain: true }))
        res.render('dashboard', {
            posts,
            logged_in: req.session.logged_in
        })

    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;