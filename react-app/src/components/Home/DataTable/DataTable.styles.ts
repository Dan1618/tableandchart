import { createUseStyles } from 'react-jss'

const colors = {
  border: '#ddd',
  borderFocus: '#999',
  text: '#333',
  textMuted: '#999',
  bgHeader: '#f4f4f4',
  bgHover: '#eaf5fe',
  bgZebra: '#fafafa',
}

export const useStyles = createUseStyles({
  filterInput: {
    width: '100%',
    padding: '8px 12px',
    marginBottom: '8px',
    marginTop: '32px',
    border: `1px solid ${colors.border}`,
    borderRadius: '4px',
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
    boxSizing: 'border-box',
    outline: 'none',
    '&:focus': {
      borderColor: colors.borderFocus,
    },
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    fontFamily: 'Arial, sans-serif',
    color: colors.text,
  },
  sortableHeader: {
    backgroundColor: colors.bgHeader,
    border: `1px solid ${colors.border}`,
    padding: '12px',
    textAlign: 'left',
    fontWeight: 'bold',
    cursor: 'pointer',
    userSelect: 'none',
    '&:hover': {
      backgroundColor: colors.bgHover,
    },
  },
  td: {
    border: `1px solid ${colors.border}`,
    padding: '10px',
  },
  tr: {
    cursor: 'pointer',
    '&:nth-child(even)': {
      backgroundColor: colors.bgZebra,
    },
    '&:hover': {
      backgroundColor: colors.bgHover
    },
  },
  emptyCell: {
    border: `1px solid ${colors.border}`,
    padding: '24px',
    textAlign: 'center',
    color: colors.textMuted,
    fontStyle: 'italic',
    fontSize: '14px',
  },
})
