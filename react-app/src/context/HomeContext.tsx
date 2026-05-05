import { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from 'react'
import React from 'react'
import type { AirQualityData } from '../interfaces/airQualityData.interface'

interface HomeContextValue {
  country: string
  setCountry: React.Dispatch<React.SetStateAction<string>>
  year: string
  setYear: React.Dispatch<React.SetStateAction<string>>
  data: AirQualityData[]
  loading: boolean
  error: string | null
  selectedIndicators: Set<string>
  setSelectedIndicators: React.Dispatch<React.SetStateAction<Set<string>>>
}

const HomeContext = createContext<HomeContextValue | null>(null)

export function HomeProvider({ children }: { children: ReactNode }) {
  const [country, setCountry] = useState('')
  const [year, setYear] = useState('')
  const [data, setData] = useState<AirQualityData[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [selectedIndicators, setSelectedIndicators] = useState<Set<string>>(
    new Set(['maxPM10'])
  )

  useEffect(() => {
    let active = true
    if (country && year) {
      setError(null)
      setLoading(true)
      fetch(`/api/country/${country}/cities/stats/1Y/${year}`)
        .then((res) => {
          if (!res.ok) throw new Error('Network response was not ok')
          return res.json()
        })
        .then((resData: AirQualityData[]) => {
          if (active) {
            setData(resData)
            setLoading(false)
          }
        })
        .catch((err: unknown) => {
          if (active) {
            console.error('Error fetching data:', err)
            const message = err instanceof Error ? err.message : 'An error occurred'
            setData([])
            setError(message)
            setLoading(false)
          }
        })
    } else {
      setData([])
      setLoading(false)
      setError(null)
    }

    return () => {
      active = false
    }
  }, [country, year])

  const contextValue = useMemo(
    () => ({
      country,
      setCountry,
      year,
      setYear,
      data,
      loading,
      error,
      selectedIndicators,
      setSelectedIndicators,
    }),
    [country, year, data, loading, error, selectedIndicators]
  )

  return <HomeContext.Provider value={contextValue}>{children}</HomeContext.Provider>
}

export function useHomeContext() {
  const ctx = useContext(HomeContext)
  if (!ctx) throw new Error('useHomeContext must be used within a HomeProvider')
  return ctx
}
