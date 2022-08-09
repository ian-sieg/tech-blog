const router = require('express').Router();
const {Post} = require('../../models')

router.put('/:id', async (req, res) => {
    try {
        Post.update(
            {
                title: req.body.title,
                content: req.body.content
            },
            {
                where: {
                    id: req.params.id
                }
            }
        )
        .then((data) => {
            if(!data) {
                res.status(404).json({message: 'No post found with this is'})
                return;
            }
            res.json(data)
        })
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router;