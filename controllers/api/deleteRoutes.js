const router = require('express').Router();
const {Post} = require('../../models')

router.delete('/:id', async (req, res) => {
    try {
        Post.destroy(
            {
                where: {
                    id: req.params.id
                }
            }
        )
        .then((data) => {
            res.json(data)
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;