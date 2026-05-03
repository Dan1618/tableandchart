import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, TextField, Box, LinearProgress, Backdrop } from '@mui/material';
import type { Note } from '../CityNotes';
import { formatDate } from '../../../utils/utils';

export type DialogType = 'details' | 'edit' | 'create';

export interface NoteDialogProps {
  open: boolean;
  onClose: () => void;
  type: DialogType | null;
  note: Note | null;
  onSaveSuccess: (note: Note) => void;
}

export function NoteDialog(props: NoteDialogProps) {
  const { onClose, open, type, note, onSaveSuccess } = props;
  const { cityId } = useParams<{ cityId: string }>();
  const [editText, setEditText] = useState(note?.noteText || '');
  const [editTitle, setEditTitle] = useState(note?.noteTitle || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (type === 'create') {
      setIsSaving(true);
      try {
        const response = await fetch(`/api/cities/${cityId}/notes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            noteTitle: editTitle,
            noteText: editText,
          }),
        });

        if (response.ok) {
          const newNote = await response.json();
          onSaveSuccess(newNote);
          onClose(); // Close dialog after saving
        } else {
          console.error("Failed to save note");
        }
      } catch (error) {
        console.error("Error saving note", error);
      } finally {
        setIsSaving(false);
      }
    } else if (type === 'edit' && note) {
      setIsSaving(true);
      try {
        const response = await fetch(`/api/cities/${cityId}/notes/${note.noteId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            noteTitle: editTitle,
            noteText: editText,
          }),
        });

        if (response.ok) {
          const updatedNote = await response.json();
          onSaveSuccess(updatedNote);
          onClose();
        } else {
          console.error("Failed to update note");
        }
      } catch (error) {
        console.error("Error updating note", error);
      } finally {
        setIsSaving(false);
      }
    }
  };

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }}
        open={isSaving}
      />
      <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
      <DialogTitle>
        {type === 'details' && 'Szczegóły notatki'}
        {type === 'edit' && 'Edytuj notatkę'}
        {type === 'create' && 'Nowa notatka'}
      </DialogTitle>
      {isSaving && <LinearProgress />}
      <DialogContent dividers>
        {type === 'details' && note && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <Typography><strong>Tytuł:</strong> {note.noteTitle}</Typography>
            <Typography><strong>Data utworzenia:</strong> {formatDate(note.dateCreated)}</Typography>
            <Typography><strong>Data edycji:</strong> {formatDate(note.dateModified)}</Typography>
            <Typography><strong>Treść:</strong></Typography>
            <Typography sx={{ whiteSpace: 'pre-wrap', color: note.noteText ? 'inherit' : 'text.secondary', fontStyle: note.noteText ? 'normal' : 'italic' }}>
              {note.noteText || 'Brak treści'}
            </Typography>
          </Box>
        )}
        {type === 'edit' && note && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Tytuł"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Treść"
              multiline
              rows={8}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              fullWidth
            />
          </Box>
        )}
        {type === 'create' && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Tytuł"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Treść"
              multiline
              rows={8}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              fullWidth
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{type === 'details' ? 'Zamknij' : 'Anuluj'}</Button>
        {(type === 'edit' || type === 'create') && (
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={(type === 'create' || type === 'edit') && !editTitle.trim()}
          >
            Zapisz
          </Button>
        )}
      </DialogActions>
    </Dialog>
    </>
  );
}
