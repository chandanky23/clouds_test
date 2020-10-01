import styled, { css } from 'styled-components'

export const Container = styled.div`
  min-height: 200px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: linear-gradient(to top, #FF3554 75.96%, #FF7700 0%);
  border-radius: 20px;
  box-shadow: 0px 0px 10px ${({ theme }) => theme.colors.whiteColor};
  position: relative;
`

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.whiteColor};
  font-size: 48px;

  @media (max-width: 800px) {
    font-size: 30px;
  }
`

export const More = styled.div`
  position: absolute;
  text-align: right;
  width: 100%;
  color: ${({ theme }) => theme.colors.whiteColor};
  font-size: 16px;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
`