import styled, { css } from 'styled-components'

export const CardContainer = styled.div<{ active: boolean }>`
  width: 40%;
  min-height: 150px;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  margin-bottom: 20px;
  margin-right: 20px;
  border: 0.5px solid ${({ theme }) => theme.colors.whiteColor};
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    border: none;
    box-shadow: 0px 0px 10px 1px ${({ theme }) => theme.colors.whiteColor};
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
  color: ${({ theme }) => theme.colors.whiteColor};
  margin-bottom: 1px solid ${({ theme }) => theme.colors.whiteColor};
`

export const Body = styled(Header)<{ isCentered: boolean }>`
  font-size: 24px;
  font-weight: normal;
  
  color: ${({ theme }) => theme.colors.whiteColor};

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
