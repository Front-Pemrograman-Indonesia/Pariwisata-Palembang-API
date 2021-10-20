const router = require('express')();
const path = require('path');
const dataWisata = require(path.join(__basedir, '/config', '/data', '/dataWisata'));
Math.radians = (deg) => deg * (Math.PI / 180);

router.get('/', (req, res, next) => {
    const latitude = req.query.latitude? req.query.latitude: -2.988095;
    const longitude = req.query.longitude? req.query.longitude: 104.761095;
    try {
        const newDataWisata = [];

        for(let data of dataWisata){
            const distance = 
            (6371 * Math.acos( Math.cos( Math.radians(parseFloat(latitude)) ) * 
            Math.cos( Math.radians( data.latitude )) * 
            Math.cos( Math.radians( data.longitude ) - Math.radians(parseFloat(longitude)) ) + Math.sin( Math.radians(parseFloat(latitude)) ) * 
            Math.sin( Math.radians( data.latitude ))));

            newDataWisata.push({
                ...data,
                distance
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

        const filterByID = (item) => {
            if (item.id === parseInt(id)) {
              return true
            }
            return false;
        }

        const pilihanWisata = dataWisata.filter(filterByID);

        const distance = pilihanWisata.length>0?
        (6371 * Math.acos( Math.cos( Math.radians(parseFloat(latitude)) ) * 
        Math.cos( Math.radians( pilihanWisata[0].latitude )) * 
        Math.cos( Math.radians( pilihanWisata[0].longitude ) - Math.radians(parseFloat(longitude)) ) + Math.sin( Math.radians(parseFloat(latitude)) ) * 
        Math.sin( Math.radians( pilihanWisata[0].latitude )))): "not defined";
        
        const finalPilihanWisata = {
            ...pilihanWisata,
            distance
        }

        res.status(200).json({data: finalPilihanWisata});
    } catch(error) {
        next(error);
    }
});

module.exports = router;