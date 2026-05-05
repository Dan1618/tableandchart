import { useMemo } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import {
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
} from '@mui/material';
import type { AirQualityData } from '../../../interfaces/airQualityData.interface';
import { useHomeContext } from '../../../context/HomeContext';

interface AirQualityBarChartProps {
  data: AirQualityData[];
}

interface Indicator {
  key: 'maxPM10' | 'maxNO2' | 'maxCO';
  label: string;
  color: string;
  unit: string;
}

const INDICATORS: Indicator[] = [
  { key: 'maxPM10', label: 'Max PM10', color: '#88a4bb', unit: 'µg/m³' },
  { key: 'maxNO2', label: 'Max NO₂', color: '#e6a872ff', unit: 'µg/m³' },
  { key: 'maxCO', label: 'Max CO', color: '#7dbb88', unit: 'µg/m³' },
];

function makeFormatter(unit: string) {
  return (value: number | null) => (value === null ? 'N/A' : `${value} ${unit}`);
}

const AirQualityBarChart = ({ data }: AirQualityBarChartProps) => {
  const { selectedIndicators: selected, setSelectedIndicators: setSelected } = useHomeContext();

  const toggleIndicator = (key: Indicator['key']) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        // keep at least one selected
        if (next.size > 1) next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const dataset = useMemo(() => {
    return data.map((d) => {
      const parse = (val: string) => {
        const n = parseFloat(val);
        return isNaN(n) ? 0 : n;
      };
      return {
        city: d.city,
        maxPM10: parse(d.maxPM10),
        maxNO2: parse(d.maxNO2),
        maxCO: parse(d.maxCO),
      };
    });
  }, [data]);

  const series = INDICATORS.filter((ind) => selected.has(ind.key)).map(
    (ind) => ({
      dataKey: ind.key,
      label: ind.label,
      color: ind.color,
      valueFormatter: makeFormatter(ind.unit),
    })
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1, flexWrap: 'wrap' }}>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
          Wskaźniki:
        </Typography>
        <FormGroup row>
          {INDICATORS.map((ind) => (
            <FormControlLabel
              key={ind.key}
              control={
                <Checkbox
                  checked={selected.has(ind.key)}
                  onChange={() => toggleIndicator(ind.key)}
                  size="small"
                  sx={{ color: ind.color, '&.Mui-checked': { color: ind.color } }}
                />
              }
              label={<Typography variant="body2">{ind.label}</Typography>}
            />
          ))}
        </FormGroup>
      </Box>

      <BarChart
        dataset={dataset}
        yAxis={[{ scaleType: 'band', width: 140, dataKey: 'city' }]}
        xAxis={[{
          label: 'µg/m³'
        }]}
        series={series}
        layout="horizontal"
        height={400}
      />
    </Box>
  );
};

export default AirQualityBarChart;
