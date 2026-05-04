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
  const [filterText, setFilterText] = useState<string>('')

  const sortedData = useMemo(() => {
    const filtered = filterText
      ? data.filter((item) =>
        item.city.toLowerCase().includes(filterText.toLowerCase())
      )
      : data

    if (!sortConfig) return filtered

    const { field, order } = sortConfig

    return [...filtered].sort((a: AirQualityData, b: AirQualityData) => {
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
  }, [data, sortConfig, filterText])

  const handleSort = (field: SortField) => {
    setSortConfig((prev) => {
      if (prev?.field === field) {
        return { field, order: prev.order === 'asc' ? 'desc' : 'asc' }
      }
      return { field, order: 'asc' }
    })
  }

  const handleRowClick = (id: string, city: string) => {
    navigate(`/cities/${id}`, { state: { city } });
  };

  const getSortIcon = (field: SortField) => {
    if (sortConfig?.field !== field) return '↕'
    return sortConfig.order === 'asc' ? '▲' : '▼'
  }

  return (
    <div>
      <input
        className={classes.filterInput}
        type="text"
        placeholder="Filter by city…"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
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
          {sortedData.length === 0 ? (
            <tr>
              <td className={classes.emptyCell} colSpan={4}>
                {filterText ? 'No cities match your filter.' : 'No data available.'}
              </td>
            </tr>
          ) : (
            sortedData.map((item) => (
              <tr
                key={item.id}
                className={classes.tr}
                onClick={() => handleRowClick(item.id, item.city)}
              >
                <td className={classes.td}>{item.city}</td>
                <td className={classes.td}>{item.maxNO2}</td>
                <td className={classes.td}>{item.maxCO}</td>
                <td className={classes.td}>{item.maxPM10}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable
