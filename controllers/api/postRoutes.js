const router = require('express').Router()
const {Post, Comment} = require('../../models')
const withAuth = require('../../utils/auth');


router.post('/', withAuth, async (req, res) => {
    try {
        Post.create(
            {
                title: req.body.title,
                content: req.body.content,
                user_id: req.session.user_id
            }
        )
        .then((data) => {
            if(!data) {
                res.status(500).json({message: 'Error posting new post'})
                return;
            }
            res.json(data)
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/comment', withAuth, async (req, res) => {
    try {
        Comment.create(
            {
                content: req.body.content,
                user_id: req.session.user_id,
                post_id: req.body.post_id
            }
        )
        .then((data) => {
            if(!data) {
                res.status(500).json({message: 'Error posting comment'})
                return;
            }
            res.json(data)
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;