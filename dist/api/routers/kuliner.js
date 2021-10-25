const router = require('express')();
const path = require('path');
const dataKuliner = require(path.join(__basedir, '/config', '/data', '/dataKuliner'));
const calculateDistance = require('../../config/lib/calculateDistance');

router.get('/', (req, res, next) => {
    const latitude = req.query.latitude? req.query.latitude: -2.988095;
    const longitude = req.query.longitude? req.query.longitude: 104.761095;
    try {
        const newDataKuliner = [];

        for(let data of dataKuliner){
            const distance = calculateDistance(latitude, longitude, data.latitude, data.longitude);

            newDataKuliner.push({
                ...data,
                distance,
                locationStatus: req.query.longitude && req.query.longitude? true: false
            });
        }

        newDataKuliner.sort((firstItem, secondItem) => firstItem.distance - secondItem.distance);

        res.status(200).json({ data: newDataKuliner, dataLength: newDataKuliner.length });
    } catch(error) {
        next(error);
    }
});

router.get('/:id', (req, res, next) => {
    const latitude = req.query.latitude? req.query.latitude: -2.988095;
    const longitude = req.query.longitude? req.query.longitude: 104.761095;
    try {
        const { id } = req.params;

        const pilihanKuliner = dataKuliner.filter((item) => {
            if (item.id === parseInt(id)) {
              return true
            }
            return false
        });

        const distance = pilihanKuliner.length > 0
            ? calculateDistance(latitude, longitude, pilihanKuliner[0].latitude, pilihanKuliner[0].longitude)
            : "not found";
        
        pilihanKuliner[0].distance = distance;
        pilihanKuliner[0].locationStatus = req.query.longitude && req.query.longitude? true: false;

        res.status(200).json({ data: pilihanKuliner[0] });
    } catch {
        next(err);
    }
});

module.exports = router;