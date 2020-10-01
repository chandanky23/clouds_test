import React from 'react'
import Card from 'app/components/Card'
import { ProviderProps } from 'app/types'
import { ProvidersContainer } from './styles'

interface Props {
  providers: ProviderProps[]
  selectedProvider: ProviderProps
  handleProviderSelection: (param: ProviderProps) => void
}

const Providers: React.FC<Props> = ({ providers, selectedProvider, handleProviderSelection }) => {
  const getAllProviders = () => {
    return (
      providers.length &&
      providers.map((p, i) => (
        <Card
          key={`${p.short_name}-${i}`}
          body={p.provider}
          onClick={() => handleProviderSelection(p)}
          active={p.short_name === selectedProvider.short_name}
        />
      ))
    )
  }
  return <ProvidersContainer>{getAllProviders()}</ProvidersContainer>
}

export default Providers
