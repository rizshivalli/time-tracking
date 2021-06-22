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

export const getStartAndEndOfWeekString = (date: string) => {
  return `${getRequiredDateFormat(
    moment(date).startOf('week'),
    'DD-MMM',
  )} - ${getRequiredDateFormat(moment(date).endOf('week'), 'DD MMM YYYY')}`;
};

export const initialDateRanges: any = [
  getRequiredDateFormat(moment().subtract(21, 'y'), 'YYYY-MM-DD'),
  getRequiredDateFormat(moment(), 'YYYY-MM-DD'),
];

export const dashboardDateRanges: any = {
  'This Week': [moment().startOf('week'), moment().endOf('week')],
  'This month': [moment().startOf('month'), moment().endOf('month')],
  'Last 30 days': [moment().subtract(30, 'd'), moment()],
  'Last month': [
    moment().subtract(1, 'M').startOf('month'),
    moment().subtract(1, 'M').endOf('month'),
  ],
  'Last 3 months': [
    moment().subtract(4, 'M').startOf('month'),
    moment().subtract(1, 'M').endOf('month'),
  ],
  'Last 6 months': [
    moment().subtract(7, 'M').startOf('month'),
    moment().subtract(1, 'M').endOf('month'),
  ],
  // 'Q 1': [moment().startOf('year'), moment().startOf('year').add(2, 'M').endOf('month')],
  // 'Q 2': [
  //   moment().startOf('year').add(3, 'M'),
  //   moment().startOf('year').add(5, 'M').endOf('month'),
  // ],
  // 'Q 3': [
  //   moment().startOf('year').add(6, 'M'),
  //   moment().startOf('year').add(8, 'M').endOf('month'),
  // ],
  // 'Q 4': [moment().startOf('year').add(9, 'M'), moment().endOf('year')],
  'This year': [moment().startOf('year'), moment().endOf('year')],
  'All ': [moment('2000-01-01'), moment()],
};
