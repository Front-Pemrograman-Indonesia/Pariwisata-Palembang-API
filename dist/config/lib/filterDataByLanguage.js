const filterDataByLanguage = (array, language) => {
  let result = array.find(object => object.language === language);
  return result? result: array.find(object => object.language === 'en');
}

module.exports = filterDataByLanguage;