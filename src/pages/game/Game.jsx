import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import styled from '@emotion/styled'

import { API_ROOT } from '../../api.config'
import { Button } from '../../components/Button'
import { selectNetworkCode, updateGraphRanking, updatePayoff, resetGameData } from './game.slice'
import { ToolSelectionDialog } from './ToolSelectionDialog'
import { ForceGraph } from './ForceGraph'

export const GamePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const networkCode = useSelector(selectNetworkCode)

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsDialogOpen(true), 3000)

    return () => {
      clearTimeout(timer)
      dispatch(resetGameData())
    }
  }, [])

  const { data: graphData } = useQuery({
    queryKey: ['gameStart'],
    queryFn: async () => {
      const response = await fetch(`${API_ROOT}/game_start/?chosen_network_id=${networkCode}`, {
        method: 'GET',
      })
      if (!response.ok) {
        throw new Error('Failed to start a game')
      }
      return response.json()
    },
  })

  const onSelectTool = () => {
    setIsDialogOpen(false)
    dispatch(
      updateGraphRanking(
        graphData
          ? graphData.nodes.reduce(
              (previous, current) => ({ ...previous, [current.id]: Math.floor(Math.random() * 8) + 1 }),
              {},
            )
          : {},
      ),
    ) // TODO: call node_ranking api to get rank -> put in redux
  }

  const onRemoveNode = () => {
    // TODO: call payoff api to get human and finder payoff
    dispatch(updatePayoff({ payoffHuman: Math.random(), payoffFinder: Math.random() }))
    setTimeout(() => {
      setIsDialogOpen(true)
    }, 1000)
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
        <ForceGraph graphData={graphData} onRemoveNode={onRemoveNode} />
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
