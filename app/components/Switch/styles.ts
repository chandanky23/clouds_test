import styled, { css } from 'styled-components'

export const Container = styled.div<{ disabled?: boolean }>`
  width: auto;
  background-color: transparent;
  display: flex;
  border: 1px solid ${({ theme }) => theme.colors.whiteColor};
  border-radius: 20px;
  cursor: pointer;

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.4;
      cursor: not-allowed;
    `}
`

export const Left = styled.div<{ active: boolean }>`
  width: 40%;
  padding: 16px 9px;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.whiteColor};
  border-radius: 20px 0 0 20px;

  ${({ active }) =>
    active &&
    css`
      background-color: ${({ theme }) => theme.colors.whiteColor};
      color: ${({ theme }) => theme.colors.primaryColor};
    `}
`

export const Right = styled(Left)`
  border-radius: 0 20px 20px 0;
`
