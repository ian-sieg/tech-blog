const router = require('express').Router()
const userRoutes = require('./userRoutes');
const updateRoutes = require('./updateRoutes')

router.use('/users', userRoutes);
router.use('/update', updateRoutes)

module.exports = router