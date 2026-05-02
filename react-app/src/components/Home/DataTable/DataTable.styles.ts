import { createUseStyles } from 'react-jss'

export const useStyles = createUseStyles({
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
      backgroundColor: '#e9e9e9',
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
      backgroundColor: '#f1f1f1',
    },
  },
})
