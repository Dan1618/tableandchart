import express from 'express';
const router = express.Router();

router.get('/:cityId/notes', (req, res) => {
  const { cityId } = req.params;
  const mockNotes = [
    {
      noteTitle: `Observation about Air Quality in ${cityId}`,
      dateCreated: '2026-04-29T10:00:00Z',
      dateModified: '2026-04-29T12:00:00Z'
    },
    {
      noteTitle: `Weekly summary for ${cityId}`,
      dateCreated: '2026-04-28T09:00:00Z',
      dateModified: '2026-04-28T09:30:00Z'
    },
    {
      noteTitle: `Weather impact analysis for ${cityId}`,
      dateCreated: '2026-04-27T15:45:00Z',
      dateModified: '2026-04-27T16:10:00Z'
    }
  ];
  res.json(mockNotes);
});

export default router;
