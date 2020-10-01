import React from 'react'
import { Container, Title, More } from './styles'

interface Props {
  bannerName: string
  reset: () => void
}
const Banner: React.FC<Props> = ({ bannerName, reset }) => (
  <Container>
    <Title>{bannerName}</Title>
    <More onClick={() => reset()}>choose another provider</More>
  </Container>
)

export default Banner
