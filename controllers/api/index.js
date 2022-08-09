const router = require('express').Router()
const userRoutes = require('./userRoutes');
const updateRoutes = require('./updateRoutes');
const postRoutes = require('./postRoutes')
const deleteRoutes = require('./deleteRoutes')

router.use('/users', userRoutes);
router.use('/update', updateRoutes);
router.use('/post', postRoutes);
router.use('/delete', deleteRoutes)

module.exports = router