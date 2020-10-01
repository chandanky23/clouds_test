import React from 'react'
import { Title, Block, Filter } from './styles'
import { CloudProps, DirectionProps } from 'app/types'
import Card from 'app/components/Card'
import Switch from 'app/components/Switch'

interface Props {
  clouds: CloudProps[]
  direction: DirectionProps
  setDirection: (p: DirectionProps) => void
}

const Clouds: React.FC<Props> = ({ clouds, direction, setDirection }) => (
  <>
    <Filter>
      <Title>Select a cloud</Title>
      {clouds.length > 1 && <Switch direction={direction} setDirection={setDirection} />}
    </Filter>
    <Block>
      {clouds.map((c, i) => {
        return (
          <Card header={c.cloud_name} body={c.cloud_description} footer={c.geo_region} key={`${i}-${c.cloud_name}`} />
        )
      })}
    </Block>
  </>
)

export default Clouds
