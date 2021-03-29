import moment from 'moment';
moment.locale('en');

export const getWeekFromSuntoSat = (date: string) => {
  let weekDates = [];
  for (var i = 0; i <= 6; i++) {
    // weekDates.push(getRequiredDateFormat(moment().day(i), 'ddd-DD-MM'));
    weekDates.push({
      date: getRequiredDateFormat(moment(date).day(i), 'DD-MMM'),
      day: getRequiredDateFormat(moment(date).day(i), 'ddd'),
      key: getRequiredDateFormat(moment(date).day(i), 'MM-DD-YYYY'),
    });
  }

  return weekDates;
};

export const getRequiredDateFormat = (timeStamp: any, format = 'MMM, DD, YYYY') => {
  return moment(timeStamp).format(format);
};

export const getTodayDay = () => {
  return getRequiredDateFormat(moment(), 'dddd');
};

export const getToday = (format: string) => {
  return getRequiredDateFormat(moment(), format);
};

export const getTodayDate = () => {
  return getRequiredDateFormat(moment(), 'DD-MMM');
};

export const getWeekNumber = () => {
  return moment('12-25-1995', 'MM-DD-YYYY').week();
};

export const getDateFromWeek = function (week: number, year: number) {
  return moment().day('Monday').year(year).week(week).toDate();
};

// export const getTodayFullDate = (date:string) =>{
//   getRequiredDateFormat(moment(date), 'dd-mm-yyyy')
// }
