const router = require('express')();
const path = require('path');
const dataTempatIbadah = require(path.join(__basedir, '/config', '/data', '/dataTempatIbadah'));
const dataTypeTempatIbadah = require(path.join(__basedir, '/config', '/data', '/dataTypeTempatIbadah'));
const calculateDistanceThenSetLanguage = require('../../config/lib/calculateDistanceThenSetLanguage');
const filterDataByLanguage = require('../../config/lib/filterDataByLanguage');

router.get('/', (req, res, next) => {
    const language = req.query.language? req.query.language: 'en';
    try {
        let filteredPrayPlace = [];
        for(let prayPlaceType of dataTypeTempatIbadah){
            let newData = {
                id: prayPlaceType.id,
                name: filterDataByLanguage(prayPlaceType.differentLanguage, language).name,
                thumbnail: prayPlaceType.thumbnail
            }

            filteredPrayPlace.push(newData);
        }

        res.status(200).json({data: filteredPrayPlace, dataLength: filteredPrayPlace.length});
    } catch(error) {
        next(error);
    }
});

router.get('/:id', (req, res, next) => {
    const latitude = req.query.latitude? req.query.latitude: -2.988095;
    const longitude = req.query.longitude? req.query.longitude: 104.761095;
    const { id } = req.params;
    const language = req.query.language? req.query.language: 'en';
    try {
        const newDataTempatIbadah = [];

        for(let data of dataTempatIbadah){
            if(data.idTypeTempatIbadah === parseInt(id)){
                const distance = calculateDistanceThenSetLanguage(latitude, longitude, data.latitude, data.longitude, language);
    
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