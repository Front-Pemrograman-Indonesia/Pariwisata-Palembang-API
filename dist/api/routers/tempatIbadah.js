const router = require('express')();
const path = require('path');
const dataTempatIbadah = require(path.join(__basedir, '/config', '/data', '/dataTempatIbadah'));
const dataTypeTempatIbadah = require(path.join(__basedir, '/config', '/data', '/dataTypeTempatIbadah'));

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
    Math.radians = (deg) => deg * (Math.PI / 180);
    try {
        const newDataTempatIbadah = [];

        for(let data of dataTempatIbadah){
            if(data.idTypeTempatIbadah === parseInt(id)){
                const distance = 
                (6371 * Math.acos( Math.cos( Math.radians(parseFloat(latitude)) ) * 
                Math.cos( Math.radians( data.latitude )) * 
                Math.cos( Math.radians( data.longitude ) - Math.radians(parseFloat(longitude)) ) + Math.sin( Math.radians(parseFloat(latitude)) ) * 
                Math.sin( Math.radians( data.latitude ))));
    
                newDataTempatIbadah.push({
                    ...data,
                    distance
                });
            }
        }

        newDataTempatIbadah.sort((firstItem, secondItem) => firstItem.distance - secondItem.distance);

        res.status(200).json({data: newDataTempatIbadah, dataLength: newDataTempatIbadah.length});
    } catch(error) {
        next(error);
    }
});

module.exports = router;