const router = require('express').Router();
const {Sequelize, Op} = require('sequelize');
const { User, Post, Comment} = require('../models');
const withAuth = require('../utils/auth');
// const unSqlDate = require('../utils/helpers')

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{
                model: User,
                attributes: ['username']
            }],
            order: [
                ['updated_at', 'ASC']
            ]
        })
        const posts = postData.map((post) => post.get({plain:true}))
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;