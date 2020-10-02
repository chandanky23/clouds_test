import React from 'react'
import { Title, Block, Filter, Back } from './styles'
import { CloudProps, DirectionProps } from 'app/types'
import Card from 'app/components/Card'
import Switch from 'app/components/Switch'
import backicon from 'app/assets/images/back.svg'

interface Props {
  clouds: CloudProps[]
  direction: DirectionProps
  setDirection: (p: DirectionProps) => void
  resetRegion: () => void
  selectCloud: (p: CloudProps) => void
}

const Clouds: React.FC<Props> = ({ clouds, direction, setDirection, resetRegion, selectCloud }) => (
  <>
    <Back onClick={() => resetRegion()}>
      <img src={backicon} /> &nbsp; Go Back
    </Back>
    <Filter>
      <Back>
        <Title>Select a cloud</Title>
      </Back>
      {clouds.length > 1 && <Switch direction={direction} setDirection={setDirection} />}
    </Filter>
    <Block>
      {clouds.map((c, i) => {
        return (
          <Card
            header={c.cloud_name}
            body={c.cloud_description}
            footer={c.geo_region}
            key={`${i}-${c.cloud_name}`}
            onClick={() => selectCloud(c)}
          />
        )
      })}
    </Block>
  </>
)

export default Clouds
