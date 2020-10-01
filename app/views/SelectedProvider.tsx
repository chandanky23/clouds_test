import React from 'react'
import { SelectedProvider } from './styles'
import { ProviderProps, DirectionProps } from 'app/types'
import Banner from 'app/components/Banner'
import Regions from './Regions'
import Clouds from './Clouds'

interface Props {
  provider: ProviderProps
  setSelectedProvider: (p: ProviderProps) => void
}

const Provider: React.FC<Props> = ({ provider, setSelectedProvider }) => {
  const selectRegion = (region: string) => {
    setSelectedProvider({ ...provider, selectedRegion: region })
  }

  const setDirection = (direction: DirectionProps) => {
    setSelectedProvider({ ...provider, direction })
  }

  const reset = () => {
    setSelectedProvider({
      provider: '',
      short_name: '',
      selectedRegion: '',
      regions: [],
      clouds: [],
      direction: 'farthest_first',
    })
  }

  const resetRegion = () => {
    setSelectedProvider({ ...provider, selectedRegion: '' })
  }

  return (
    <SelectedProvider>
      <Banner bannerName={provider.provider} reset={() => reset()} />
      <SelectedProvider>
        {provider.selectedRegion ? (
          <Clouds
            clouds={provider.clouds || []}
            direction={provider.direction}
            setDirection={(d: DirectionProps) => setDirection(d)}
            resetRegion={() => resetRegion()}
          />
        ) : (
          <Regions regions={provider.regions || []} handleRegionClick={(reg: string) => selectRegion(reg)} />
        )}
      </SelectedProvider>
    </SelectedProvider>
  )
}

export default Provider
