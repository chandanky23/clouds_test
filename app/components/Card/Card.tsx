import React from 'react'
import { CardContainer, Header, Body, Footer } from './styles'

interface CardProps {
  className?: string
  body: string
  header?: string
  footer?: string
  active?: boolean
  onClick?: () => void
}
const Card: React.FC<CardProps> = ({ className, body, header, footer, active = false, onClick }) => {
  return (
    <CardContainer onClick={onClick} active={active} className={className}>
      {header && <Header className={className}>{header}</Header>}
      <Body isCentered={!header && !footer} className={className}>
        {body}
      </Body>
      {footer && <Footer className={className}>{footer}</Footer>}
    </CardContainer>
  )
}

export default Card
