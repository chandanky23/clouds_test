import styled, { css } from 'styled-components'

export const CardContainer = styled.div<{ active: boolean }>`
  width: 15%;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  margin-bottom: 30px;
  margin-right: 10px;
  background: ${({ theme }) => theme.colors.whiteColor};
  border: 0.5px solid ${({ theme }) => theme.colors.primaryColor};
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    border: none;
    box-shadow: 0px 0px 10px ${({ theme }) => theme.colors.secondaryColor};
  }

  ${({ active }) =>
    active &&
    css`
      border: none;
      box-shadow: 0px 0px 10px 1px ${({ theme }) => theme.colors.whiteColor};
    `}

  @media (max-width: 800px) {
    width: 100%;
    margin-right: 0;
  }
`

export const Header = styled.h3`
  font-size: 18px;
  padding: 0 20px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.primaryColor};
  margin-bottom: 1px solid ${({ theme }) => theme.colors.whiteColor};
`

export const Body = styled(Header)<{ isCentered: boolean }>`
  font-size: 20px;
  font-weight: bold;
  
  ${({ isCentered }) =>
    isCentered &&
    `
    text-align: center;
  `}
`

export const Footer = styled(Header)`
  opacity: 0.8;
  font-size: 14px;
`
