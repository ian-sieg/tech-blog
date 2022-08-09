const router = require('express').Router()
const userRoutes = require('./userRoutes');
const updateRoutes = require('./updateRoutes');
const postRoutes = require('./postRoutes')

router.use('/users', userRoutes);
router.use('/update', updateRoutes);
router.use('/post', postRoutes);

module.exports = router