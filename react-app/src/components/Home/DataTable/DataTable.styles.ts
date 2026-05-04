import { createUseStyles } from 'react-jss'

export const useStyles = createUseStyles({
  filterInput: {
    width: '100%',
    padding: '8px 12px',
    marginBottom: '8px',
    marginTop: '32px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
    boxSizing: 'border-box',
    outline: 'none',
    '&:focus': {
      borderColor: '#999',
    },
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  },
  th: {
    backgroundColor: '#f4f4f4',
    border: '1px solid #ddd',
    padding: '12px',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  sortableHeader: {
    backgroundColor: '#f4f4f4',
    border: '1px solid #ddd',
    padding: '12px',
    textAlign: 'left',
    fontWeight: 'bold',
    cursor: 'pointer',
    userSelect: 'none',
    '&:hover': {
      backgroundColor: '#eaf5fe',
    },
  },
  td: {
    border: '1px solid #ddd',
    padding: '10px',
  },
  tr: {
    cursor: 'pointer',
    '&:nth-child(even)': {
      backgroundColor: '#fafafa',
    },
    '&:hover': {
      backgroundColor: '#eaf5fe'
    },
  },
  emptyCell: {
    border: '1px solid #ddd',
    padding: '24px',
    textAlign: 'center',
    color: '#999',
    fontStyle: 'italic',
    fontSize: '14px',
  },
})
