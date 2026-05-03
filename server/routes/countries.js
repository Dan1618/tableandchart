import express from 'express';
import { airQualityData } from './airQualityData.js';

const router = express.Router();
const delay = ms => new Promise(res => setTimeout(res, ms));

router.get('/:countryId/cities/stats/1Y/:year', async (req, res) => {
  const { countryId, year } = req.params;

  // await delay(2000); // Wait for 2 seconds

  const entry = airQualityData.find(
    item => item.country.toLowerCase() === countryId.toLowerCase() && item.year === year
  );

  if (entry) {
    res.json(entry.data);
  } else {
    res.status(404).json({ message: 'Data not found for the specified country and year' });
  }
});

export default router;
