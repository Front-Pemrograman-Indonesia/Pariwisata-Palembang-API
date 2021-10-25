const router = require('express')();
const path = require('path');
const dataPenginapan = require(path.join(__basedir, '/config', '/data', '/dataPenginapan'));
const calculateDistance = require('../../config/lib/calculateDistance');

router.get('/', (req, res, next) => {
    const latitude = req.query.latitude? req.query.latitude: -2.988095;
    const longitude = req.query.longitude? req.query.longitude: 104.761095;
    try {
        const newDataPenginapan= [];

        for(let data of dataPenginapan){
            const distance = calculateDistance(latitude, longitude, data.latitude, data.longitude);

            newDataPenginapan.push({
                ...data,
                distance,
                locationStatus: req.query.longitude && req.query.longitude? true: false
            });
        }

        newDataPenginapan.sort((firstItem, secondItem) => firstItem.distance - secondItem.distance);

        res.status(200).json({ data: newDataPenginapan, dataLength: newDataPenginapan.length });
    } catch(error) {
        next(error);
    }
});

router.get('/:id', (req, res, next) => {
    const latitude = req.query.latitude? req.query.latitude: -2.988095;
    const longitude = req.query.longitude? req.query.longitude: 104.761095;
    try {
        const { id } = req.params;

        const pilihanPenginapan = dataPenginapan.filter((item) => {
            if (item.id === parseInt(id)) {
              return true
            }
            return false;
        });

        const distance = pilihanPenginapan.length > 0
        ? calculateDistance(latitude, longitude, pilihanPenginapan[0].latitude, pilihanPenginapan[0].longitude)
        : "not defined";
        
        pilihanPenginapan[0].distance = distance;
        pilihanPenginapan[0].locationStatus = req.query.longitude && req.query.longitude? true: false;

        res.status(200).json({data: pilihanPenginapan[0]});
    } catch {
        next(err);
    }
});

module.exports = router;