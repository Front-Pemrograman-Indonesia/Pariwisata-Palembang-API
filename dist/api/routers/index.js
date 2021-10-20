const router = require('express')();

router.use('/wisata', require('./wisata'));

router.use('/kuliner', require('./kuliner'));

router.use('/penginapan', require('./penginapan'));

router.use('/tempatibadah', require('./tempatIbadah'));

router.use('/*', (req, res, next) => {
    res.status(404).json({message: 'the endpoint did not found'});
})

module.exports = router;