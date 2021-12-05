Math.radians = (deg) => deg * (Math.PI / 180);

const calculateDistance = (latitude, longitude, placeLatitude, placeLongitude, language) => {
    const distance =  (6371 * Math.acos( Math.cos( Math.radians(parseFloat(latitude)) ) * 
        Math.cos( Math.radians( placeLatitude )) * 
        Math.cos( Math.radians( placeLongitude ) - Math.radians(parseFloat(longitude)) ) + Math.sin( Math.radians(parseFloat(latitude)) ) * 
        Math.sin( Math.radians( placeLatitude ))));
    
    return language === 'ar'? 
        (Math.round(distance * 100) / 100).toLocaleString('ar-EG').split('').reverse().join(''): 
        (Math.round(distance * 100) / 100);
}

module.exports = calculateDistance;