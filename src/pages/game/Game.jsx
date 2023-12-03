import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'

import { Button } from '../../components/Button'
import { resetGameData } from './game.slice'
import { ToolSelectionDialog } from './ToolSelectionDialog'
import { ForceGraph } from './ForceGraph'

export const GamePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsDialogOpen(true), 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  const onSelectTool = () => {
    setIsDialogOpen(false)
    // TODO: call node_ranking api to get rank -> put in redux
  }

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
      <ToolSelectionDialog open={isDialogOpen} onConfirm={onSelectTool} />
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
