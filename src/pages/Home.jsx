import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import styled from '@emotion/styled'
import { Button } from '../components'

export const Home = () => {
  useEffect(() => {
    const playerId = uuidv4()
    localStorage.setItem('playerId', playerId)
  }, [])

  return (
    <StyledContainer>
      <StyledLink to="/tour">
        <Button width="15rem">Tour</Button>
      </StyledLink>
      <StyledLink to="/network-selection">
        <Button width="15rem">Start</Button>
      </StyledLink>
    </StyledContainer>
  )
}

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
