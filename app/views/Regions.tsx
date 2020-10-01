import React from 'react'
import { SmallCard, Block, Title } from './styles'

interface Props {
  regions: string[]
  handleRegionClick: (p: string) => void
}

const Regions: React.FC<Props> = ({ regions, handleRegionClick }) => (
  <>
    <Title>Select your region</Title>
    <Block>
      {regions.map((r, i) => (
        <SmallCard key={`${i}-${r}`} onClick={() => handleRegionClick(r)}>
          {r}
        </SmallCard>
      ))}
    </Block>
  </>
)

export default Regions
