import React, { useEffect, useState } from 'react'
import Providers from './Providers'
import SelectedProvider from './SelectedProvider'
import { Container, Section, Brand, Headline } from './styles'
import { ProviderProps } from 'app/types'
import { usePosition } from 'app/useGeoLocation'

const App: React.FC = () => {
  const [providers, setProviders] = useState<ProviderProps[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedProvider, setSelectedProvider] = useState<ProviderProps>({
    provider: '',
    short_name: '',
    selectedRegion: '',
    regions: [],
    clouds: [],
    direction: 'farthest_first',
    selectedCloud: '',
  })

  const { latitude, longitude, error: geoError } = usePosition()

  const sectionToShow = () => {
    if (loading) {
      return <h1>Loading</h1>
    } else if (!selectedProvider.provider) {
      return (
        <>
          <Headline>{error ? error : 'Select your cloud provider'}</Headline>
          <Providers
            providers={providers}
            selectedProvider={selectedProvider}
            handleProviderSelection={(p) =>
              setSelectedProvider({ ...selectedProvider, provider: p.provider, short_name: p.short_name })
            }
          />
        </>
      )
    }
    return (
      <SelectedProvider
        lat={latitude}
        lng={longitude}
        geoError={geoError}
        provider={selectedProvider}
        setSelectedProvider={setSelectedProvider}
      />
    )
  }

  useEffect(() => {
    setLoading(true)
    setError('')
    fetch('/api/v1/clouds')
      .then((res) => res.json())
      .then((data) => {
        setProviders(data)
        setLoading(false)
      })
      .catch((err) => {
        setError('Oops, something happened!')
        console.error(err)
      })
  }, [])

  useEffect(() => {
    fetch(`/api/v1/clouds?provider=${selectedProvider.short_name}`)
      .then((res) => res.json())
      .then((data) => setSelectedProvider({ ...selectedProvider, regions: data.regions }))
  }, [selectedProvider.short_name])

  useEffect(() => {
    let url = `/api/v1/clouds?provider=${selectedProvider.short_name}&region=${selectedProvider.selectedRegion}`
    if (latitude && longitude) {
      url = `${url}&lat=${latitude}&lng=${longitude}&direction=${selectedProvider.direction}`
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => setSelectedProvider({ ...selectedProvider, clouds: data.cloud_instances }))
  }, [selectedProvider.selectedRegion])

  return (
    <Container>
      <Brand>Aiven Test Project</Brand>
      <Section>{sectionToShow()}</Section>
    </Container>
  )
}

export default App
