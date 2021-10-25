const router = require('express')();
const path = require('path');
const dataTempatIbadah = require(path.join(__basedir, '/config', '/data', '/dataTempatIbadah'));
const dataTypeTempatIbadah = require(path.join(__basedir, '/config', '/data', '/dataTypeTempatIbadah'));
const calculateDistance = require('../../config/lib/calculateDistance');

router.get('/', (req, res, next) => {
    try {
        res.status(200).json({data: dataTypeTempatIbadah, dataLength: dataTypeTempatIbadah.length});
    } catch(error) {
        next(error);
    }
});

router.get('/:id', (req, res, next) => {
    const latitude = req.query.latitude? req.query.latitude: -2.988095;
    const longitude = req.query.longitude? req.query.longitude: 104.761095;
    const { id } = req.params;
    try {
        const newDataTempatIbadah = [];

        for(let data of dataTempatIbadah){
            if(data.idTypeTempatIbadah === parseInt(id)){
                const distance = calculateDistance(latitude, longitude, data.latitude, data.longitude);
    
                data.distance = distance;
                data.locationStatus = req.query.longitude && req.query.longitude? true: false;

                newDataTempatIbadah.push(data);
            }
        }

        newDataTempatIbadah.sort((firstItem, secondItem) => firstItem.distance - secondItem.distance);

        res.status(200).json({ data: newDataTempatIbadah, dataLength: newDataTempatIbadah.length });
    } catch(error) {
        next(error);
    }
});

module.exports = router;