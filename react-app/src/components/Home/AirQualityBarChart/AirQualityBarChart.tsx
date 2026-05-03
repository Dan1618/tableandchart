import { useMemo } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import type { AirQualityData } from '../../../interfaces/airQualityData.interface';

interface AirQualityBarChartProps {
  data: AirQualityData[];
}

function valueFormatter(value: number | null) {
  if (value === null) return 'N/A';
  return `${value} µg/m³`;
}

const chartSetting = {
  xAxis: [
    {
      label: 'max PM10 (µg/m³)',
    },
  ],
  height: 400,
};

const AirQualityBarChart = ({ data }: AirQualityBarChartProps) => {
  const dataset = useMemo(() => {
    return data.map((d) => {
      const parsedValue = parseFloat(d.maxPM10);
      return {
        ...d,
        maxPM10: isNaN(parsedValue) ? 0 : parsedValue,
      };
    });
  }, [data]);

  return (
    <BarChart
      dataset={dataset}
      yAxis={[{ scaleType: 'band', width: 140, dataKey: 'city' }]}
      series={[{ dataKey: 'maxPM10', label: 'Max PM10', valueFormatter, color: '#88a4bb' }]}
      layout="horizontal"
      {...chartSetting}
    />
  );
};

export default AirQualityBarChart;
