import { getWeekFromSuntoSat } from '@/utils/MomentHelpers';

import React from 'react';

const thisWeekDates = getWeekFromSuntoSat();
console.log('🚀 ~ file: index.tsx ~ line 22 ~ thisWeekDates', thisWeekDates);

const Home = () => {
  return <h1>home</h1>;
};

export default Home;
