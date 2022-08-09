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
        for (let post of posts) {
            let createdAt = new Date(post.createdAt)
            post.createdAt = createdAt.toDateString()
        }
        res.render('dashboard', {
            posts,
            logged_in: req.session.logged_in
        })

    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/comments/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        const commentData = await Comment.findAll({
            where: {
                post_id: req.params.id
            },
            include: [{
                model: User,
                attributes: ['username']
            }]
        })
        const post = postData.get({plain:true})
        const comments = commentData.map((comment) => comment.get({plain:true}))
        for (let comment of comments) {
            let createdAt = new Date(comment.createdAt)
            comment.createdAt = createdAt.toDateString()
        }
        let createdAt = new Date(post.createdAt)
        post.createdAt = createdAt.toDateString()
        res.render('comment', {
            ...post,
            comments,
            logged_in: req.session.logged_in
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id)
        let post = postData.get({plain:true})

        res.render('post', {
            ...post,
            logged_in: req.session.logged_in
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/newpost', withAuth, async (req, res) => {
    try {
        res.render('newpost', {
            logged_in: req.session.logged_in
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;