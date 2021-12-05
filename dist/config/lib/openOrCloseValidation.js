const moment = require('moment-timezone');

const OpenOrCloseFunction = (destinationOpenSchedules) => {
  const currentTimeInPalembang = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm')
  let userDay = moment(currentTimeInPalembang).format('dddd').toLocaleLowerCase();
  let userTime = moment(currentTimeInPalembang).format();
  for (let destinationSchedule of destinationOpenSchedules) {
    if(destinationSchedule.day === userDay){
      let openTime = moment(destinationSchedule.openTime, 'h:mm:ss').format();
      let closeTime = moment(destinationSchedule.closeTime, 'h:mm:ss').format()
      return openTime < userTime && userTime < closeTime;
    }
  }

  return false;
}

module.exports = OpenOrCloseFunction;