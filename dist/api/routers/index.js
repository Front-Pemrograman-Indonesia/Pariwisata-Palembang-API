const router = require('express')();

router.use('/wisata', require('./wisata'));

router.use('/kuliner', require('./kuliner'));

router.use('/penginapan', require('./penginapan'));

router.use('/tempatibadah', require('./tempatIbadah'));

router.use('/', (req, res, next) => {
    try{
        res.status(200).json({
            message: 'hello there! this is the API for the pariwisata palembang that let you get any information about the famous and most visited tourist destination in palembang',
            availableEndpoints: [
                'https://fpi-pariwisata-palembang-api.herokuapp.com/wisata',
                'https://fpi-pariwisata-palembang-api.herokuapp.com/wisata/1',
                'https://fpi-pariwisata-palembang-api.herokuapp.com/kuliner',
                'https://fpi-pariwisata-palembang-api.herokuapp.com/kuliner/2',
                'https://fpi-pariwisata-palembang-api.herokuapp.com/penginapan',
                'https://fpi-pariwisata-palembang-api.herokuapp.com/penginapan/2',
                'https://fpi-pariwisata-palembang-api.herokuapp.com/tempatibadah',
                'https://fpi-pariwisata-palembang-api.herokuapp.com/tempatibadah/1',
            ]
        })
    }catch(err){
        next(err);
    }
})

router.use('/*', (req, res, next) => {
    res.status(404).json({message: 'the endpoint did not found'});
})

module.exports = router;