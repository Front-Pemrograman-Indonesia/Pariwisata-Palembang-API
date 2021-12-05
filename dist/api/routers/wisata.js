const router = require('express')();
const path = require('path');
const dataWisata = require(path.join(__basedir, '/config', '/data', '/dataWisata'));
const calculateDistanceThenSetLanguage = require('../../config/lib/calculateDistanceThenSetLanguage');
const openOrCloseValidation = require('../../config/lib/openOrCloseValidation');
const filterDataByLanguage = require('../../config/lib/filterDataByLanguage');
const moment = require('moment-timezone');

const openHoursFilter = (arrayOfOpenHours, language) => {
    if(typeof arrayOfOpenHours !== 'object') {
        return language === 'id'? 'buka 24 jam':
            language === 'ar'? 'مفتوحة ٢٤ ساعة': 'open 24 hours'
    }

    const currentTimeInPalembang = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm')
    let userDay = moment(currentTimeInPalembang).format('dddd').toLocaleLowerCase();
    for(let openHour of arrayOfOpenHours){
        if(openHour.day === userDay){
            return language === 'id'? `${moment(openHour.openTime, 'HH:mm:ss').format('HH:mm')} - ${moment(openHour.closeTime, 'HH:mm:ss').format('HH:mm')} WIB`:
                language === 'ar'? `${moment(openHour.openTime, 'HH:mm:ss').format('hh:mm a')} - ${moment(openHour.closeTime, 'HH:mm:ss').format('hh:mm A')}`: 
                    `${moment(openHour.openTime, 'HH:mm:ss').format('hh:mm A')} - ${moment(openHour.closeTime, 'HH:mm:ss').format('hh:mm A')}`;
        }
    }
    
    return language === 'id'? 'destinasi sedang tidak buka saat ini':
        language === 'ar'? 'الوجهة ليست مفتوحة في الوقت الحالي': 'the destination is not open at the moment'
}

router.get('/', async (req, res, next) => {
    const latitude = req.query.latitude? req.query.latitude: -2.988095;
    const longitude = req.query.longitude? req.query.longitude: 104.761095;
    const language = req.query.language? req.query.language: 'en';
    try {
        const newDataWisata = [];
        for(let data of dataWisata){
            let filteredData = filterDataByLanguage(data.differentLanguage, language);
            
            let newData = {
                id: data.id,
                name: filteredData.name,
                description: filteredData.description,
                location: data.location,
                latitude: data.latitude,
                longitude: data.longitude,
                thumbnail: data.thumbnail,
                distance: calculateDistanceThenSetLanguage(latitude, longitude, data.latitude, data.longitude, language),
                locationStatus: req.query.longitude && req.query.longitude? true: false,
                openOrClose: typeof data.open != "object"? true: openOrCloseValidation(data.open)
            };

            newDataWisata.push(
                newData
            );
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
    const { id } = req.params;
    const language = req.query.language? req.query.language: 'en';
    try {
        const data = dataWisata.find((item) => item.id === parseInt(id));

        let filteredData = filterDataByLanguage(data.differentLanguage, language);

        let newData = {
            id: data.id,
            name: filteredData.name,
            description: filteredData.description,
            location: data.location,
            latitude: data.latitude,
            longitude: data.longitude,
            thumbnail: data.thumbnail,
            gallery: data.gallery,
            openHours: openHoursFilter(data.open, language),
            distance: calculateDistanceThenSetLanguage(latitude, longitude, data.latitude, data.longitude, language),
            locationStatus: req.query.longitude && req.query.longitude? true: false
        }

        res.status(200).json({ data: newData });
    } catch(error) {
        next(error);
    }
});

module.exports = router;