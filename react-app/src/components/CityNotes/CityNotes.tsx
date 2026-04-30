import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  container: {
    padding: '40px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: '"Outfit", sans-serif',
    color: '#1a1a1a',
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    marginBottom: '32px',
    textDecoration: 'none',
    color: '#6366f1',
    fontWeight: 600,
    fontSize: '14px',
    transition: 'color 0.2s ease',
    '&:hover': {
      color: '#4f46e5',
    },
  },
  header: {
    fontSize: '32px',
    fontWeight: 700,
    marginBottom: '8px',
    background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subHeader: {
    color: '#64748b',
    marginBottom: '40px',
    fontSize: '16px',
  },
  notesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  noteCard: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    border: '1px solid #f1f5f9',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    },
  },
  noteTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#1e293b',
    marginBottom: '16px',
  },
  dateGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    borderTop: '1px solid #f1f5f9',
    paddingTop: '16px',
  },
  dateItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  dateLabel: {
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: '#94a3b8',
  },
  dateValue: {
    fontSize: '14px',
    color: '#475569',
  },
  loading: {
    textAlign: 'center',
    padding: '60px',
    color: '#64748b',
  },
  error: {
    background: '#fef2f2',
    color: '#dc2626',
    padding: '16px',
    borderRadius: '12px',
    marginBottom: '24px',
    border: '1px solid #fee2e2',
  },
  empty: {
    textAlign: 'center',
    padding: '40px',
    background: '#f8fafc',
    borderRadius: '16px',
    color: '#64748b',
    border: '2px dashed #e2e8f0',
  }
})

interface Note {
  noteTitle: string;
  dateCreated: string;
  dateModified: string;
}

function CityNotes() {
  const { cityId } = useParams<{ cityId: string }>()
  const [notes, setNotes] = useState<Note[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const classes = useStyles()

  useEffect(() => {
    setLoading(true)
    fetch(`/api/cities/${cityId}/notes`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch data')
        }
        return res.json()
      })
      .then(data => {
        console.log('aaaa', data)
        setNotes(data)
        setLoading(false)
      })
      .catch(err => {
        console.log('err', err)
        setError(err.message)
        setLoading(false)
      })
  }, [cityId])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

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
            notes.map((note, index) => (
              <div key={index} className={classes.noteCard}>
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
