import React from 'react'
import { SelectedProvider, Headline, Title, Button } from './styles'
import { ProviderProps } from 'app/types'

interface Props {
  provider: ProviderProps
  reset: () => void
}

const Result: React.FC<Props> = ({ provider, reset }) => {
  return (
    <>
      <Headline>
        <Title>Your Selection</Title>
        {provider.provider}
        <Title>{provider.selectedCloud}</Title>
        <Title>{provider.selectedRegion}</Title>
      </Headline>
      <Button onClick={() => reset()}>Reset</Button>
    </>
  )
}

export default Result
