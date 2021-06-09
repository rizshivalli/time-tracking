import React, { useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { getRequiredDateFormat } from '@/utils/MomentHelpers';

const LineChart = ({ data }: any) => {
  //   const { xAxis, thisYear, lastYear } = data;
  const [hoverData, setHoverData] = useState(null);
  const chartOptions = {
    chart: {
      zoomType: 'xy',
    },
    title: {
      text: 'Chart Title',
    },

    xAxis: [
      {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        crosshair: true,
      },
    ],
    yAxis: [
      {
        // Primary yAxis
        labels: {
          format: '{value}°C',
          style: {
            color: Highcharts.getOptions().colors[1],
          },
        },
        title: {
          text: 'Temperature',
          style: {
            color: Highcharts.getOptions().colors[1],
          },
        },
      },
    ],
    tooltip: {
      shared: true,
    },
    legend: {
      layout: 'vertical',
      align: 'left',
      x: 120,
      verticalAlign: 'top',
      y: 100,
      floating: true,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || // theme
        'rgba(255,255,255,0.25)',
    },
    series: [
      {
        name: 'Temperature',
        type: 'spline',
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
        tooltip: {
          valueSuffix: '°C',
        },
      },
    ],
  };
  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default LineChart;
