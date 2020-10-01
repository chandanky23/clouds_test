import React from 'react'
import { DirectionProps } from 'app/types'
import { Container, Left, Right } from './styles'

interface Props {
  direction: DirectionProps
  setDirection: (p: DirectionProps) => void
}

const Switch: React.FC<Props> = ({ direction, setDirection }) => {
  return (
    <Container>
      <Left active={direction === 'nearest_first'} onClick={() => setDirection('nearest_first')}>
        Nearest
      </Left>
      <Right active={direction === 'farthest_first'} onClick={() => setDirection('farthest_first')}>
        Farthest
      </Right>
    </Container>
  )
}

export default Switch
