import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { useQuery } from '@tanstack/react-query'
import styled from '@emotion/styled'

import { API_ROOT } from '../../api.config'
import { getViewport } from '../../utils'
import { Button } from '../../components'
import { selectNetworkCode, updateGraphRanking, updateSelectedTool, updatePayoff, resetGameData } from './game.slice'
import { ToolSelectionDialog } from './ToolSelectionDialog'
import { InformationBlock } from './InformationBlock'
import { QuitGameDialog } from './QuitGameDialog'
import { ForceGraph } from './ForceGraph'
import { InformationDialog } from './InformationDialog'

export const GamePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const networkCode = useSelector(selectNetworkCode)
  const { width } = getViewport()

  const [isToolSelectionDialogOpen, setIsToolSelectionDialogOpen] = useState(false)
  const [isInformationBlockShown, setIsInformationBlockShown] = useState(false)
  const [isInformationDialogShown, setIsInformationDialogShown] = useState(false)
  const [isQuitGameDialogOpen, setIsQuitGameDialogOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsToolSelectionDialogOpen(true), 3000)
    const sessionId = uuidv4()
    localStorage.setItem('sessionId', sessionId)

    return () => {
      clearTimeout(timer)
      dispatch(resetGameData())
      localStorage.setItem('sessionId', null)
    }
  }, [])

  const { data: graphData } = useQuery({
    queryKey: ['gameStart'],
    queryFn: async () => {
      const playerId = localStorage.getItem('playerId')
      const sessionId = localStorage.getItem('sessionId')
      const response = await fetch(
        `${API_ROOT}/game_start/?chosen_network_id=${networkCode}&player_id=${playerId}&session_id=${sessionId}`,
        {
          method: 'GET',
        },
      )
      if (!response.ok) {
        throw new Error('Failed to start a game')
      }
      return response.json()
    },
  })

  const onSelectTool = tool => {
    setIsToolSelectionDialogOpen(false)
    setIsInformationBlockShown(true)
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
    dispatch(updateSelectedTool(tool))
  }

  const onRemoveNode = () => {
    // TODO: call payoff api to get human and finder payoff
    dispatch(
      updatePayoff({ payoffHuman: Math.random(), payoffFinder: Array.from({ length: 10 }, () => Math.random()) }),
    )
    setIsInformationBlockShown(false)
    setTimeout(() => {
      setIsToolSelectionDialogOpen(true)
      dispatch(updateGraphRanking(null))
    }, 1000)
  }

  return (
    <StyledGamePageContainer>
      <StyledQuitGameButton onClick={() => setIsQuitGameDialogOpen(true)}>結束遊戲</StyledQuitGameButton>

      <ToolSelectionDialog open={isToolSelectionDialogOpen && !isQuitGameDialogOpen} onConfirm={onSelectTool} />
      <QuitGameDialog
        open={isQuitGameDialogOpen}
        onConfirm={() => {
          dispatch(resetGameData())
          setIsQuitGameDialogOpen(false)
          navigate('/')
        }}
        onCancel={() => setIsQuitGameDialogOpen(false)}
      />
      {width <= 767 && (
        <InformationDialog open={isInformationDialogShown} onClose={() => setIsInformationDialogShown(false)} />
      )}

      <StyledGameContainer>
        {width > 767 && <InformationBlock visible={isInformationBlockShown || isQuitGameDialogOpen} />}
        {width <= 767 && (
          <Button width="100%" onClick={() => setIsInformationDialogShown(true)}>
            本回合資訊及累積報酬
          </Button>
        )}
        <ForceGraph graphData={graphData} onRemoveNode={onRemoveNode} />
      </StyledGameContainer>
    </StyledGamePageContainer>
  )
}

const StyledGamePageContainer = styled.div`
  padding: 2rem 4rem;
  position: relative;
`
const StyledGameContainer = styled.div`
  padding-top: 3rem;
  display: flex;
  align-items: flex-start;
  @media screen and (max-width: 767px) {
    flex-direction: column-reverse;
    align-items: center;
    justify-content: space-around;
  }
`
const StyledQuitGameButton = styled(Button)`
  position: absolute;
  right: 2rem;
`
