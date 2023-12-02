import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'

import { Button } from '../../components/Button'
import { resetGameData } from './game.slice'
import { ForceGraph } from './ForceGraph'

export const GamePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <StyledGamePageContainer>
      <StyledQuitGameButton
        onClick={() => {
          dispatch(resetGameData())
          navigate('/')
        }}
      >
        結束遊戲
      </StyledQuitGameButton>
      <StyledForceGraphContainer>
        <ForceGraph />
      </StyledForceGraphContainer>
    </StyledGamePageContainer>
  )
}

const StyledGamePageContainer = styled.div`
  padding: 2rem 4rem;
  position: relative;
`
const StyledForceGraphContainer = styled.div`
  padding-top: 3rem;
`
const StyledQuitGameButton = styled(Button)`
  position: absolute;
  right: 2rem;
`
