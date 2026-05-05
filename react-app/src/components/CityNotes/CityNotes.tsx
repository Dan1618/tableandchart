import { useParams, Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useStyles } from './CityNotes.styles'
import { Button, LinearProgress } from '@mui/material';
import { NoteDialog } from './NoteDialog/NoteDialog';
import type { DialogType } from './NoteDialog/NoteDialog';
import { formatDate } from '../../utils/utils';

export interface Note {
  noteId: string;
  noteTitle: string;
  dateCreated: string;
  dateModified?: string;
  noteText?: string;
}

function CityNotes() {
  const { cityId } = useParams<{ cityId: string }>()
  const location = useLocation()
  const cityName = location.state?.city || cityId

  const [notes, setNotes] = useState<Note[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const classes = useStyles()

  const [dialogType, setDialogType] = useState<DialogType | null>(null);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleOpenDetails = (note: Note) => {
    setSelectedNote(note);
    setDialogType('details');
  };

  const handleOpenEdit = (note: Note) => {
    setSelectedNote(note);
    setDialogType('edit');
  };

  const handleOpenCreate = () => {
    setSelectedNote(null);
    setDialogType('create');
  };

  const handleCloseDialog = () => {
    setDialogType(null);
    setSelectedNote(null);
  };

  const handleSaveSuccess = (savedNote: Note) => {
    setNotes(prevNotes => {
      if (!prevNotes) return [savedNote];

      const exists = prevNotes.some(n => n.noteId === savedNote.noteId);
      if (exists) {
        return prevNotes.map(n => n.noteId === savedNote.noteId ? savedNote : n);
      }

      return [...prevNotes, savedNote].sort((a, b) =>
        new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime()
      );
    });
  };

  useEffect(() => {
    let active = true; // Flag to prevent state updates on unmounted components
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/cities/${cityId}/notes`);
        if (!res.ok) throw new Error('Failed to fetch data');
        const text = await res.text();
        const data: Note[] = text ? JSON.parse(text) : [];
        if (active) {
          const sortedData = data.sort((a: Note, b: Note) =>
            new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime()
          );
          setNotes(sortedData);
          setError(null);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : 'An unknown error occurred');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };
    fetchNotes();

    return () => {
      active = false;
    };
  }, [cityId]);

  return (
    <div className={classes.container}>
      <NoteDialog
        key={selectedNote?.noteId || 'create'}
        open={dialogType !== null}
        onClose={handleCloseDialog}
        type={dialogType}
        note={selectedNote}
        onSaveSuccess={handleSaveSuccess}
      />
      <Link to="/" className={classes.backLink}>
        <span>&larr; Back to Dashboard</span>
      </Link>

      <h1>City Notes</h1>
      <p className={classes.subHeader}>Reviewing reports and observations for {cityName}</p>

      <div className={classes.topActions}>
        <Button variant="outlined" onClick={handleOpenCreate}>
          Nowa notatka
        </Button>
      </div>

      {loading && (
        <div className={classes.loading}>
          <LinearProgress />
          <p>Retrieving notes...</p>
        </div>
      )}

      {error && <div className={classes.error}>Error: {error}</div>}

      {!loading && !error && (
        <div className={classes.notesList}>
          {notes && notes.length > 0 ? (
            notes.map((note) => (
              <div key={note.noteId} className={classes.noteCard}>
                <div className={classes.noteHeader}>
                  <div className={classes.noteTitle}>{note.noteTitle}</div>
                  <div className={classes.buttonGroup}>
                    <Button variant="outlined" onClick={() => handleOpenDetails(note)}>
                      Szczegóły
                    </Button>
                    <Button variant="outlined" onClick={() => handleOpenEdit(note)}>
                      Edytuj
                    </Button>
                  </div>
                </div>
                <div className={classes.dateGrid}>
                  <div className={classes.dateItem}>
                    <span className={classes.dateLabel}>Dodano</span>
                    <span className={classes.dateValue}>{formatDate(note.dateCreated || '')}</span>
                  </div>
                  <div className={classes.dateItem}>
                    <span className={classes.dateLabel}>Edytowano</span>
                    <span className={classes.dateValue}>{formatDate(note.dateModified || '')}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={classes.empty}>No notes available for this city.</div>
          )}
        </div>
      )}
    </div>
  )
}

export default CityNotes
