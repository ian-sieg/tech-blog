const router = require('express').Router();
const {Post} = require('../../models')
const withAuth = require('../../utils/auth');

router.delete('/:id', withAuth, async (req, res) => {
    try {
        Post.destroy(
            {
                where: {
                    id: req.params.id
                }
            }
        )
        .then((data) => {
            if(!data) {
                res.status(404).json({message: 'No post found with this is ID'})
                return;
            }
            res.json(data)
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;