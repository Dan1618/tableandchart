import { useState } from 'react'
import { useStyles } from './Home.styles'
import { airQualityData } from '../../data/airQualityData'
import DataTable from './DataTable/DataTable'
import AirQualityBarChart from './AirQualityBarChart/AirQualityBarChart';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

function Home() {
  const classes = useStyles()
  const [country, setCountry] = useState('Poland')
  const [year, setYear] = useState('2025')

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
      <AirQualityBarChart data={airQualityData} />
      <DataTable data={airQualityData} />
    </div>
  )
}

export default Home
