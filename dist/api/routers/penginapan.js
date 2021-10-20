const router = require('express')();
const path = require('path');
const dataPenginapan = require(path.join(__basedir, '/config', '/data', '/dataPenginapan'));

router.get('/', (req, res, next) => {
    const latitude = req.query.latitude? req.query.latitude: -2.988095;
    const longitude = req.query.longitude? req.query.longitude: 104.761095;
    Math.radians = (deg) => deg * (Math.PI / 180);
    try {
        const newDataPenginapan= [];

        for(let data of dataPenginapan){
            const distance = 
            (6371 * Math.acos( Math.cos( Math.radians(parseFloat(latitude)) ) * 
            Math.cos( Math.radians( data.latitude )) * 
            Math.cos( Math.radians( data.longitude ) - Math.radians(parseFloat(longitude)) ) + Math.sin( Math.radians(parseFloat(latitude)) ) * 
            Math.sin( Math.radians( data.latitude ))));

            newDataPenginapan.push({
                ...data,
                distance
            });
        }

        newDataPenginapan.sort((firstItem, secondItem) => firstItem.distance - secondItem.distance);

        res.status(200).json({data: newDataPenginapan, dataLength: newDataPenginapan.length});
    } catch(error) {
        next(error);
    }
});

router.get('/:id', (req, res, next) => {
    try {

    } catch {
        next(err);
    }
});

module.exports = router;