const router = require('express')();
const path = require('path');
const dataPenginapan = require(path.join(__basedir, '/config', '/data', '/dataPenginapan'));
Math.radians = (deg) => deg * (Math.PI / 180);

router.get('/', (req, res, next) => {
    const latitude = req.query.latitude? req.query.latitude: -2.988095;
    const longitude = req.query.longitude? req.query.longitude: 104.761095;
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

        const pilihanPenginapan = dataPenginapan.filter(filterByID);

        const distance = pilihanPenginapan.length>0?
        (6371 * Math.acos( Math.cos( Math.radians(parseFloat(latitude)) ) * 
        Math.cos( Math.radians( pilihanPenginapan[0].latitude )) * 
        Math.cos( Math.radians( pilihanPenginapan[0].longitude ) - Math.radians(parseFloat(longitude)) ) + Math.sin( Math.radians(parseFloat(latitude)) ) * 
        Math.sin( Math.radians( pilihanPenginapan[0].latitude )))): "not defined";
        
        const finalPilihanPenginapan = {
            ...pilihanPenginapan,
            distance
        }

        res.status(200).json({data: finalPilihanPenginapan});
    } catch {
        next(err);
    }
});

module.exports = router;