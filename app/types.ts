export interface ProviderProps {
  short_name: string
  provider: string
  selectedRegion?: string
  regions: string[]
  clouds: CloudProps[]
  direction: DirectionProps
  selectedCloud: string
}

export interface CloudProps {
  cloud_description: string
  cloud_name: string
  geo_latitude: number
  geo_longitude: number
  geo_region: string
  distance?: number
}

export type DirectionProps = 'nearest_first' | 'farthest_first'
