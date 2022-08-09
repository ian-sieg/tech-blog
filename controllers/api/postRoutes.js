const router = require('express').Router()
const {Post} = require('../../models')

router.post('/', async (req, res) => {
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

module.exports = router;