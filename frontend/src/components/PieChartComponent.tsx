import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { IActivityData } from '../types';

interface IChartsProps {
  title: string;
  data: IActivityData[];
}

const PieChartComponent: React.FC<IChartsProps> = ({ title, data }) => {
  let totalDuration = 0;
  data.forEach(datum => totalDuration += datum.duration);
  const transformedData = data.reduce((acc: any[][], cur) => {
    return [
      ...acc,
      [
        cur.name,
        cur.duration / totalDuration
      ]
    ];
  }, [])

  const options = {
    chart: {
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0
      }
    },
    accessibility: {
      point: {
          valueSuffix: '%'
      }
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          depth: 35,
          dataLabels: {
              enabled: true,
              format: '{point.name}'
          }
      }
    },
    title: {
      text: title
    },
    series: [{
      type: 'pie',
      name: 'Activity share',
      data: transformedData
    }]
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />
}

export default PieChartComponent;
