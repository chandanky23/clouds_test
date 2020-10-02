import React from 'react'
import { Container, Title, More } from './styles'

interface Props {
  bannerName: string
  reset: () => void
  testId: string
}
const Banner: React.FC<Props> = ({ bannerName, reset, testId }) => (
  <Container data-testid={testId}>
    <Title>{bannerName}</Title>
    <More onClick={() => reset()}>choose another provider</More>
  </Container>
)

export default Banner
