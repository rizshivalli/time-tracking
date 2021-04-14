import moment from 'moment';
moment.locale('en');

// Get week list
export const getWeekFromSuntoSat = (date: string) => {
  let weekDates = [];
  for (var i = 0; i <= 6; i++) {
    weekDates.push({
      date: getRequiredDateFormat(moment(date).day(i), 'DD-MMM'),
      day: getRequiredDateFormat(moment(date).day(i), 'ddd'),
      key: getRequiredDateFormat(moment(date).day(i), 'YYYY-MM-DD'),
    });
  }

  return weekDates;
};

// Format date
export const getRequiredDateFormat = (timeStamp: any, format = 'MMM, DD, YYYY') => {
  return moment(timeStamp).format(format);
};

// Return today Day
export const getTodayDay = () => {
  return getRequiredDateFormat(moment(), 'dddd');
};

// Return today full date
export const getToday = (format: string) => {
  return getRequiredDateFormat(moment(), format);
};

export const getTodayDate = () => {
  return getRequiredDateFormat(moment(), 'DD-MMM');
};

// getWeekNymber
export const getWeekNumber = () => {
  return moment('12-25-1995', 'YYYY-MM-DD').week();
};

// get date from week
export const getDateFromWeek = function (week: number, year: number) {
  return moment().day('Monday').year(year).week(week).toDate();
};

// export const getTodayFullDate = (date:string) =>{
//   getRequiredDateFormat(moment(date), 'dd-mm-yyyy')
// }

// get start and end of week
export const getStartAndEndOfWeek = (date: string) => {
  const dates = {
    start_date: getRequiredDateFormat(moment(date).startOf('week'), 'YYYY-MM-DD'),
    end_date: getRequiredDateFormat(moment(date).endOf('week'), 'YYYY-MM-DD'),
  };
  return dates;
};
