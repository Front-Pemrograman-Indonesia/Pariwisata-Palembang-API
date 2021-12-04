const moment = require('moment');

const OpenOrCloseFunction = (userDateAndTime, destinationOpenSchedules) => {
  let userDay = moment(userDateAndTime).format('dddd').toLocaleLowerCase();
  let userTime = moment(userDateAndTime).format();
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