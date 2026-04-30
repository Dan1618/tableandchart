import { useNavigate } from 'react-router-dom'
import { useStyles } from './Home.styles'
import { airQualityData } from '../../data/airQualityData'

function Home() {
  const classes = useStyles()
  const navigate = useNavigate()

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Air Quality Data</h1>
      <table className={classes.table}>
        <thead>
          <tr>
            <th className={classes.th}>City</th>
            <th className={classes.th}>Max NO2</th>
            <th className={classes.th}>Max CO</th>
            <th className={classes.th}>Max PM10</th>
          </tr>
        </thead>
        <tbody>
          {airQualityData.map((item) => (
            <tr
              key={item.id}
              className={classes.tr}
              onClick={() => navigate(`/cities/${item.id}`)}
            >
              <td className={classes.td}>{item.city}</td>
              <td className={classes.td}>{item.maxNO2}</td>
              <td className={classes.td}>{item.maxCO}</td>
              <td className={classes.td}>{item.maxPM10}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Home
