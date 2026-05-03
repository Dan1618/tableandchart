import { createUseStyles } from 'react-jss'

export const useStyles = createUseStyles({
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
    fontWeight: 600,
    fontSize: '14px',
    color: '#3b82f6',
    transition: 'color 0.2s ease',
    '&:hover': {
      color: '#2563eb',
    },
    '&:active': {
      color: '#1d4ed8',
    },
  },
  subHeader: {
    color: '#64748b',
    marginBottom: '40px',
    fontSize: '16px',
  },
  topActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '24px',
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
  },
  noteHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  noteTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#1e293b',
  },
  buttonGroup: {
    display: 'flex',
    gap: '8px',
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
