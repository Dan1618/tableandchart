import { createUseStyles } from 'react-jss'

export const useStyles = createUseStyles({
  container: {
    padding: '40px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  noData: {
    padding: '3rem',
    textAlign: 'center',
    color: '#888',
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    border: '1px dashed #ccc',
    borderRadius: '12px',
    marginTop: '2rem',
    fontSize: '1.1rem',
    fontWeight: 500,
  },
  error: {
    padding: '2rem',
    textAlign: 'center',
    color: '#d32f2f',
    backgroundColor: '#fffbfa',
    border: '1px solid #ffcdd2',
    borderRadius: '12px',
    marginTop: '2rem',
    fontSize: '1rem',
    fontWeight: 500,
  },
})
