import styled from 'styled-components'

export const Container = styled.div`
  max-width: 1440px;
  height: 100vh;
  margin: 0 auto;
  padding: 10px;
  overflow: auto;
`

export const Brand = styled.h3`
  color: ${({ theme }) => theme.colors.whiteColor};
  font-size: 24px;
  width: fit-content;
  padding-bottom: 10px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.whiteColor};
`

export const Section = styled.div`
  margin-top: 5%;
  @media (max-width: 800px) {
    margin-top: 20%;
  }
`

export const ProvidersContainer = styled(Section)`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  justify-content: center;

  @media (max-width: 800px) {
    margin-top: 5%;
  }
`

export const Headline = styled.h1`
  color: ${({ theme }) => theme.colors.whiteColor};
  font-size: 48px;
  text-align: center;

  @media (max-width: 800px) {
    font-size: 40px;
  }
`

export const SelectedProvider = styled(Section)`
  margin-top: 5%;
  padding: 16px 10px;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Title = styled.h3`
  font-size: 24px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.whiteColor};

  @media (max-width: 800px) {
    font-size: 18px;
  }
`

export const Regions = styled.div`
  padding: 16px 10px;
`

export const Block = styled.div<{ even?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
`

export const SmallCard = styled.div`
  width: 200px;
  height: 100px;
  border-radius: 20px;
  color: ${({ theme }) => theme.colors.whiteColor};
  margin: 10px;
  border: 1px solid ${({ theme }) => theme.colors.whiteColor};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 0px 6px ${({ theme }) => theme.colors.whiteColor};
  }

  @media (max-width: 800px) {
    width: 100%;
    margin: 20px 0;
  }
`

export const Filter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

export const Back = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: ${({ theme }) => theme.colors.whiteColor};
  border: none;
  width: fit-content;
  margin-bottom: 20px;
  cursor: pointer;
`

export const Button = styled.div`
  width: 200px;
  margin: 0 auto;
  border-radius: 20px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.whiteColor};
  color: ${({ theme }) => theme.colors.primaryColor};
  cursor: pointer;
  text-align: center;
  &:hover {
    box-shadow: 0px 0px 3px ${({ theme }) => theme.colors.primaryColor};
  }
`