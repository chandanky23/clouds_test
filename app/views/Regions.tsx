import React from 'react'
import { SmallCard, Block, Title } from './styles'
import Card from 'app/components/Card'

interface Props {
  regions: string[]
  handleRegionClick: (p: string) => void
}

const Regions: React.FC<Props> = ({ regions, handleRegionClick }) => (
  <>
    <Title>Select your region</Title>
    <Block>
      {regions.map((r, i) => (
        <Card body={r} key={`${i}-${r}`} onClick={() => handleRegionClick(r)} />
      ))}
    </Block>
  </>
)

export default Regions
