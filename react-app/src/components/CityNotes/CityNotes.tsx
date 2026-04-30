import { useParams, Link } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import { useStyles } from './CityNotes.styles'

interface Note {
  noteId: string;
  noteTitle: string;
  dateCreated: string;
  dateModified: string;
}

function CityNotes() {
  const { cityId } = useParams<{ cityId: string }>()
  const [notes, setNotes] = useState<Note[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>('')
  const classes = useStyles()

  useEffect(() => {
    let active = true; // Flag to prevent state updates on unmounted components
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/cities/${cityId}/notes`);
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        if (active) {
          setNotes(data);
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

  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }, [])

  return (
    <div className={classes.container}>
      <Link to="/" className={classes.backLink}>
        <span>&larr; Back to Dashboard</span>
      </Link>

      <h1 className={classes.header}>City Notes</h1>
      <p className={classes.subHeader}>Reviewing reports and observations for {cityId}</p>

      {loading && (
        <div className={classes.loading}>
          <p>Retrieving notes...</p>
        </div>
      )}

      {error && <div className={classes.error}>Error: {error}</div>}

      {!loading && !error && (
        <div className={classes.notesList}>
          {notes && notes.length > 0 ? (
            notes.map((note) => (
              <div key={note.noteId} className={classes.noteCard}>
                <div className={classes.noteTitle}>{note.noteTitle}</div>
                <div className={classes.dateGrid}>
                  <div className={classes.dateItem}>
                    <span className={classes.dateLabel}>Created</span>
                    <span className={classes.dateValue}>{formatDate(note.dateCreated)}</span>
                  </div>
                  <div className={classes.dateItem}>
                    <span className={classes.dateLabel}>Modified</span>
                    <span className={classes.dateValue}>{formatDate(note.dateModified)}</span>
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
