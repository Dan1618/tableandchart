import { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, TextField, Box } from '@mui/material';
import type { Note } from '../CityNotes';
import { formatDate } from '../../../utils/utils';

export type DialogType = 'details' | 'edit' | 'create';

export interface NoteDialogProps {
  open: boolean;
  onClose: () => void;
  type: DialogType | null;
  note: Note | null;
}

export function NoteDialog(props: NoteDialogProps) {
  const { onClose, open, type, note } = props;
  const [editText, setEditText] = useState(note?.noteText || '');

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
      <DialogTitle>
        {type === 'details' && 'Szczegóły notatki'}
        {type === 'edit' && 'Edytuj notatkę'}
        {type === 'create' && 'Nowa notatka'}
      </DialogTitle>
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
            <Typography><strong>Tytuł:</strong> {note.noteTitle}</Typography>
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
          <Typography sx={{ pt: 1 }}>Formularz nowej notatki w budowie...</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{type === 'details' ? 'Zamknij' : 'Anuluj'}</Button>
        {type === 'edit' && <Button variant="contained">Zapisz</Button>}
      </DialogActions>
    </Dialog>
  );
}
