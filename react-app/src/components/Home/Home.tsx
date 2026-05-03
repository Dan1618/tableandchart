import { useState, useEffect } from 'react'
import { useStyles } from './Home.styles'
import DataTable from './DataTable/DataTable'
import AirQualityBarChart from './AirQualityBarChart/AirQualityBarChart';
import { FormControl, InputLabel, Select, MenuItem, Box, LinearProgress } from '@mui/material';

function Home() {
  const classes = useStyles()
  const [country, setCountry] = useState('')
  const [year, setYear] = useState('')
  const [data, setData] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let active = true;
    if (country && year) {
      setError(null);
      setLoading(true);
      fetch(`/api/country/${country}/cities/stats/1Y/${year}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then((resData) => {
          if (active) {
            setData(resData);
            setLoading(false);
          }
        })
        .catch((err) => {
          if (active) {
            console.error('Error fetching data:', err);
            setData([]);
            setError(err.message || 'An error occurred while fetching data');
            setLoading(false);
          }
        });
    } else {
      setData([]);
    }

    return () => {
      active = false;
    };
  }, [country, year]);

  return (
    <div className={classes.container}>
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id="country-select-label">Country</InputLabel>
          <Select
            labelId="country-select-label"
            id="country-select"
            value={country}
            label="Country"
            onChange={(e) => setCountry(e.target.value)}
          >
            <MenuItem value="Poland">Poland</MenuItem>
            <MenuItem value="Germany">Germany</MenuItem>
            <MenuItem value="France">France</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id="year-select-label">Year</InputLabel>
          <Select
            labelId="year-select-label"
            id="year-select"
            value={year}
            label="Year"
            onChange={(e) => setYear(e.target.value)}
          >
            <MenuItem value="2025">2025</MenuItem>
            <MenuItem value="2024">2024</MenuItem>
            <MenuItem value="2023">2023</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {loading && <LinearProgress sx={{ mb: 2 }} />}
      {error ? (
        <div className={classes.error}>{error}</div>
      ) : (!data || data.length === 0) ? (
        !loading && <div className={classes.noData}>No air quality data available.</div>
      ) : (
        <>
          <AirQualityBarChart data={data} />
          <DataTable data={data} />
        </>
      )}
    </div>
  )
}

export default Home
