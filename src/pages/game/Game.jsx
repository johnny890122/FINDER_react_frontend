import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { useQuery } from '@tanstack/react-query'
import styled from '@emotion/styled'

import { API_ROOT, postHeaders } from '../../api.config'
import { getViewport } from '../../utils'
import { Button } from '../../components'
import {
  selectNetworkCode,
  selectSelectedTool,
  selectPayoff,
  updateGraphRanking,
  updateSelectedTool,
  updatePayoff,
  resetGameData,
} from './game.slice'
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
  const selectedTool = useSelector(selectSelectedTool)
  const payoff = useSelector(selectPayoff)

  const [isToolSelectionDialogOpen, setIsToolSelectionDialogOpen] = useState(false)
  const [isInformationBlockShown, setIsInformationBlockShown] = useState(false)
  const [isInformationDialogShown, setIsInformationDialogShown] = useState(false)
  const [isQuitGameDialogOpen, setIsQuitGameDialogOpen] = useState(false)
  const [isReadyGetNodeRanking, setIsReadyGetNodeRanking] = useState(false)

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

  const { data: nodeRanking } = useQuery({
    enabled: isReadyGetNodeRanking,
    queryKey: ['nodeRanking'],
    queryFn: async () => {
      const playerId = localStorage.getItem('playerId')
      const response = await fetch(`${API_ROOT}/node_ranking/`, {
        ...postHeaders,
        method: 'POST',
        body: JSON.stringify({
          chosen_network_id: networkCode.toString(),
          chosen_tool_id: selectedTool[selectedTool.length - 1].code.toString(),
          player_id: playerId,
          round: (payoff?.payoffHuman ?? []).length + 1,
          graphData,
        }),
      })
      if (!response.ok) {
        throw new Error('Failed to get node ranking')
      }
      setIsReadyGetNodeRanking(false)

      return response.json()
    },
  })

  useEffect(() => {
    dispatch(updateGraphRanking(nodeRanking))
  }, [nodeRanking])

  const onSelectTool = tool => {
    setIsToolSelectionDialogOpen(false)
    setIsInformationBlockShown(true)
    dispatch(updateSelectedTool(tool))
    setIsReadyGetNodeRanking(true)
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
        {graphData && (
          <ForceGraph
            graphData={graphData}
            selectedTool={selectedTool[selectedTool.length - 1]}
            onRemoveNode={onRemoveNode}
          />
        )}
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
  gap: 1rem;
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
