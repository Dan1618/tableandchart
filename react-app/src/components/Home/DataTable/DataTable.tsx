import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStyles } from './DataTable.styles'
import type { AirQualityData } from '../../../interfaces/airQualityData.interface'

type SortField = 'city' | 'maxNO2' | 'maxCO' | 'maxPM10'
type SortOrder = 'asc' | 'desc'

interface SortConfig {
  field: SortField
  order: SortOrder
}

interface DataTableProps {
  data: AirQualityData[]
}

const DataTable = ({ data }: DataTableProps) => {
  const classes = useStyles()
  const navigate = useNavigate()
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null)

  const sortedData = useMemo(() => {
    if (!sortConfig) return data

    const { field, order } = sortConfig

    return [...data].sort((a: AirQualityData, b: AirQualityData) => {
      const valA = a[field]
      const valB = b[field]

      if (field === 'city') {
        const compare = valA.localeCompare(valB)
        return order === 'asc' ? compare : -compare
      } else {
        const numA = parseFloat(valA)
        const numB = parseFloat(valB)
        return order === 'asc' ? numA - numB : numB - numA
      }
    })
  }, [data, sortConfig])

  const handleSort = (field: SortField) => {
    setSortConfig((prev) => {
      if (prev?.field === field) {
        return { field, order: prev.order === 'asc' ? 'desc' : 'asc' }
      }
      return { field, order: 'asc' }
    })
  }

  const getSortIcon = (field: SortField) => {
    if (sortConfig?.field !== field) return '↕'
    return sortConfig.order === 'asc' ? '▲' : '▼'
  }

  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <th
            className={classes.sortableHeader}
            onClick={() => handleSort('city')}
          >
            City {getSortIcon('city')}
          </th>
          <th
            className={classes.sortableHeader}
            onClick={() => handleSort('maxNO2')}
          >
            Max NO2 {getSortIcon('maxNO2')}
          </th>
          <th
            className={classes.sortableHeader}
            onClick={() => handleSort('maxCO')}
          >
            Max CO {getSortIcon('maxCO')}
          </th>
          <th
            className={classes.sortableHeader}
            onClick={() => handleSort('maxPM10')}
          >
            Max PM10 {getSortIcon('maxPM10')}
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item) => (
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
  )
}

export default DataTable
