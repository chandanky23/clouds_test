import React from 'react'
import { SelectedProvider } from './styles'
import { ProviderProps, DirectionProps, CloudProps } from 'app/types'
import Banner from 'app/components/Banner'
import Regions from './Regions'
import Clouds from './Clouds'
import Result from './Result'

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
      selectedCloud: '',
    })
  }

  const resetRegion = () => {
    setSelectedProvider({ ...provider, selectedRegion: '' })
  }

  const selectCloud = (cloud: CloudProps) => {
    setSelectedProvider({ ...provider, selectedCloud: cloud.cloud_name })
  }

  if (provider.selectedCloud) {
    return <Result provider={provider} reset={() => reset()} />
  }

  return (
    <SelectedProvider>
      <Banner bannerName={provider.provider} reset={() => reset()} testId="selected-provider-bannerId"/>
      <SelectedProvider>
        {provider.selectedRegion ? (
          <Clouds
            clouds={provider.clouds || []}
            direction={provider.direction}
            setDirection={(d: DirectionProps) => setDirection(d)}
            resetRegion={() => resetRegion()}
            selectCloud={(cloud: CloudProps) => selectCloud(cloud)}
          />
        ) : (
          <Regions regions={provider.regions || []} handleRegionClick={(reg: string) => selectRegion(reg)} />
        )}
      </SelectedProvider>
    </SelectedProvider>
  )
}

export default Provider
