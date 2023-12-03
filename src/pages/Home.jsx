import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import { Button } from '../components/Button'

export const Home = () => (
  <StyledContainer>
    <StyledLink to="/tour">
      <Button width="10rem">Tour</Button>
    </StyledLink>
    <StyledLink to="/network-selection">
      <Button width="10rem">Start</Button>
    </StyledLink>
  </StyledContainer>
)

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  height: 100vh;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`
