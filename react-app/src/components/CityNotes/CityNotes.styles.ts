import { createUseStyles } from 'react-jss'

const colors = {
  primary: '#3b82f6',
  primaryHover: '#2563eb',
  primaryActive: '#1d4ed8',
  text: '#1e293b',
  textSecondary: '#64748b',
  textMuted: '#94a3b8',
  border: '#f1f5f9',
  bgCard: '#ffffff',
  bgEmpty: '#f8fafc',
  errorBg: '#fef2f2',
  errorText: '#dc2626',
  errorBorder: '#fee2e2',
  borderDark: '#e2e8f0',
}

export const useStyles = createUseStyles({
  container: {
    padding: '40px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: '"Outfit", sans-serif',
    color: colors.text,
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    marginBottom: '32px',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '14px',
    color: colors.primary,
    transition: 'color 0.2s ease',
    '&:hover': {
      color: colors.primaryHover,
    },
    '&:active': {
      color: colors.primaryActive,
    },
  },
  subHeader: {
    color: colors.textSecondary,
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
    background: colors.bgCard,
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    border: `1px solid ${colors.border}`,
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
    color: colors.text,
  },
  buttonGroup: {
    display: 'flex',
    gap: '8px',
  },
  dateGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    borderTop: `1px solid ${colors.border}`,
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
    color: colors.textMuted,
  },
  dateValue: {
    fontSize: '14px',
    color: colors.textSecondary,
  },
  loading: {
    textAlign: 'center',
    padding: '60px',
    color: colors.textSecondary,
  },
  error: {
    background: colors.errorBg,
    color: colors.errorText,
    padding: '16px',
    borderRadius: '12px',
    marginBottom: '24px',
    border: `1px solid ${colors.errorBorder}`,
  },
  empty: {
    textAlign: 'center',
    padding: '40px',
    background: colors.bgEmpty,
    borderRadius: '16px',
    color: colors.textSecondary,
    border: `2px dashed ${colors.borderDark}`,
  }
})
