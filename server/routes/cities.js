import express from 'express';
import { getMockNotes } from './mockNotes.js';
const router = express.Router();
const delay = ms => new Promise(res => setTimeout(res, ms));

router.get('/:cityId/notes', async (req, res) => {
  const { cityId } = req.params;
  // await delay(2000); // Wait for 2 seconds
  const mockNotes = getMockNotes[cityId] || [];
  res.json(mockNotes);
});
router.post('/:cityId/notes', (req, res) => {
  const { cityId } = req.params;
  const { noteTitle, noteText } = req.body;
  // await delay(2000); // Wait for 2 seconds

  if (!getMockNotes[cityId]) {
    getMockNotes[cityId] = [];
  }

  const newNote = {
    noteId: `note-${Date.now()}`,
    noteTitle: noteTitle || '',
    noteText: noteText || '',
    dateCreated: new Date().toISOString(),
    dateModified: new Date().toISOString()
  };

  getMockNotes[cityId].push(newNote);
  res.status(201).json(newNote);
});

router.put('/:cityId/notes/:noteId', (req, res) => {
  const { cityId, noteId } = req.params;
  const { noteTitle, noteText } = req.body;

  if (!getMockNotes[cityId]) {
    return res.status(404).json({ message: "City not found" });
  }

  const noteIndex = getMockNotes[cityId].findIndex(n => n.noteId === noteId);
  if (noteIndex === -1) {
    return res.status(404).json({ message: "Note not found" });
  }

  const updatedNote = {
    ...getMockNotes[cityId][noteIndex],
    noteTitle: noteTitle !== undefined ? noteTitle : getMockNotes[cityId][noteIndex].noteTitle,
    noteText: noteText !== undefined ? noteText : getMockNotes[cityId][noteIndex].noteText,
    dateModified: new Date().toISOString()
  };

  getMockNotes[cityId][noteIndex] = updatedNote;
  res.json(updatedNote);
});
export default router;
