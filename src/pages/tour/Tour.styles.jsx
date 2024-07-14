import { Link } from 'react-router-dom'
import styled from '@emotion/styled'

export const StyledContainer = styled.div`
  position: relative;
  width: 100%;
`
export const StyledParagraph = styled.div`
  margin-top: 1rem;
  @media screen and (max-width: 767px) {
    margin-bottom: 1rem;
  }
`
export const StyledGraphAndButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2rem;
`
export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  & .MuiButtonBase-root {
    margin: 2rem 0;
  }
`
