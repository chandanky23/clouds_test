import React from 'react'
import { Container, Title } from './styles'

const Banner: React.FC<{ bannerName: string }> = ({ bannerName }) => (
  <Container>
    <Title>{bannerName}</Title>
  </Container>
)

export default Banner
