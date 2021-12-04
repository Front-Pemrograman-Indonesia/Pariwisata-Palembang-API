const router = require('express')();
const path = require('path');
const dataWisata = require(path.join(__basedir, '/config', '/data', '/dataWisata'));
const calculateDistance = require('../../config/lib/calculateDistance');
const openOrCloseValidation = require('../../config/lib/openOrCloseValidation');



router.get('/', (req, res, next) => {
    const latitude = req.query.latitude? req.query.latitude: -2.988095;
    const longitude = req.query.longitude? req.query.longitude: 104.761095;
    const userDateAndTime = new Date();
    try {
        const newDataWisata = [];
        for(let data of dataWisata){
            const distance = calculateDistance(latitude, longitude, data.latitude, data.longitude);

            let openOrClose;
            if (typeof data.open != "object") {
                openOrClose = "open";
            } else {
                openOrClose = openOrCloseValidation(userDateAndTime, data.open)? "open": "close";
            }

            newDataWisata.push({
                ...data,
                distance,
                locationStatus: req.query.longitude && req.query.longitude? true: false,
                openOrClose
            });
        }

        newDataWisata.sort((firstItem, secondItem) => firstItem.distance - secondItem.distance);

        res.status(200).json({data: newDataWisata, dataLength: newDataWisata.length});
    } catch(error) {
        next(error);
    }
});

router.get('/:id', (req, res, next) => {
    const latitude = req.query.latitude? req.query.latitude: -2.988095;
    const longitude = req.query.longitude? req.query.longitude: 104.761095;
    try {
        const { id } = req.params;

        const pilihanWisata = dataWisata.filter((item) => {
            if (item.id === parseInt(id)) {
              return true
            }
            return false;
        });

        const distance = pilihanWisata.length > 0
        ? calculateDistance(latitude, longitude, pilihanWisata[0].latitude, pilihanWisata[0].longitude)
        : "not defined";
        

        pilihanWisata[0].distance = distance;
        pilihanWisata[0].locationStatus = req.query.longitude && req.query.longitude? true: false;
        
        res.status(200).json({ data: pilihanWisata[0] });
    } catch(error) {
        next(error);
    }
});

module.exports = router;