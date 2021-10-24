const router = require('express')();
const path = require('path');
const dataKuliner = require(path.join(__basedir, '/config', '/data', '/dataKuliner'));
Math.radians = (deg) => deg * (Math.PI / 180);

router.get('/', (req, res, next) => {
    const latitude = req.query.latitude? req.query.latitude: -2.988095;
    const longitude = req.query.longitude? req.query.longitude: 104.761095;
    try {
        const newDataKuliner = [];

        for(let data of dataKuliner){
            const distance = 
            (6371 * Math.acos( Math.cos( Math.radians(parseFloat(latitude)) ) * 
            Math.cos( Math.radians( data.latitude )) * 
            Math.cos( Math.radians( data.longitude ) - Math.radians(parseFloat(longitude)) ) + Math.sin( Math.radians(parseFloat(latitude)) ) * 
            Math.sin( Math.radians( data.latitude ))));

            newDataKuliner.push({
                ...data,
                distance
            });
        }

        newDataKuliner.sort((firstItem, secondItem) => firstItem.distance - secondItem.distance);

        res.status(200).json({data: newDataKuliner, dataLength: newDataKuliner.length});
    } catch(error) {
        next(error);
    }
});

router.get('/:id', (req, res, next) => {
    const latitude = req.query.latitude? req.query.latitude: -2.988095;
    const longitude = req.query.longitude? req.query.longitude: 104.761095;
    try {
        const { id } = req.params;

        const filterByID = (item) => {
            if (item.id === parseInt(id)) {
              return true
            }
            return false;
        }

        const pilihanKuliner = dataKuliner.filter(filterByID);

        const distance = pilihanKuliner.length>0?
        (6371 * Math.acos( Math.cos( Math.radians(parseFloat(latitude)) ) * 
        Math.cos( Math.radians( pilihanKuliner[0].latitude )) * 
        Math.cos( Math.radians( pilihanKuliner[0].longitude ) - Math.radians(parseFloat(longitude)) ) + Math.sin( Math.radians(parseFloat(latitude)) ) * 
        Math.sin( Math.radians( pilihanKuliner[0].latitude )))): "not defined";
        
        pilihanKuliner[0].distance = distance;

        res.status(200).json({data: pilihanKuliner[0]});
    } catch {
        next(err);
    }
});

module.exports = router;