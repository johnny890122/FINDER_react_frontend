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
  selectRound,
  selectRealGraphData,
  updateGraphRanking,
  updateSelectedTool,
  updatePayoff,
  updateRealGraphData,
  resetGameData,
} from './game.slice'
import { removeNodeAndRelatedLinksFromGraphData } from './game.utils'
import { ToolSelectionDialog } from './ToolSelectionDialog'
import { GameInformationBlock, NetworkInformationBlock } from './information-blocks'
import { QuitGameDialog } from './QuitGameDialog'
import { ForceGraph } from './ForceGraph'
import { InformationDialog } from './InformationDialog'
import { GameEndDialog } from './GameEndDialog'

export const GamePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const networkCode = useSelector(selectNetworkCode)
  const { width } = getViewport()
  const selectedTool = useSelector(selectSelectedTool)
  const round = useSelector(selectRound)
  const realGraphData = useSelector(selectRealGraphData)

  const [isToolSelectionDialogOpen, setIsToolSelectionDialogOpen] = useState(false)
  const [isGameEndDialogOpen, setIsGameEndDialogOpen] = useState(false)
  const [isInformationDialogShown, setIsInformationDialogShown] = useState(false)
  const [isQuitGameDialogOpen, setIsQuitGameDialogOpen] = useState(false)
  const [isReadyGetNodeRanking, setIsReadyGetNodeRanking] = useState(false)
  const [isReadyGetPayoff, setIsReadyGetPayoff] = useState(false)
  const [removedNodeIds, setRemovedNodeIds] = useState([])

  useEffect(() => {
    const timer = setTimeout(() => setIsToolSelectionDialogOpen(true), 3000)
    const gameId = uuidv4()
    localStorage.setItem('gameId', gameId)

    return () => {
      clearTimeout(timer)
      dispatch(resetGameData())
      localStorage.setItem('gameId', null)
    }
  }, [])

  const { data: graphData, isLoading: isGraphDataLoading } = useQuery({
    queryKey: ['gameStart'],
    queryFn: async () => {
      const playerId = localStorage.getItem('playerId')
      const gameId = localStorage.getItem('gameId')
      const response = await fetch(
        `${API_ROOT}/game_start/?chosen_network_id=${networkCode}&player_id=${playerId}&game_id=${gameId}`,
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

  const { isLoading: isNodeRankingLoading } = useQuery({
    enabled: isReadyGetNodeRanking,
    queryKey: ['nodeRanking'],
    queryFn: async () => {
      const response = await fetch(`${API_ROOT}/node_ranking/`, {
        ...postHeaders,
        method: 'POST',
        body: JSON.stringify({
          chosen_tool_id: selectedTool[selectedTool.length - 1].code.toString(),
          game_id: localStorage.getItem('gameId'),
          roundId: round,
          graphData: realGraphData,
          chosen_network_id: networkCode.toString(),
        }),
      })
      if (!response.ok) {
        throw new Error('Failed to get node ranking')
      }
      setIsReadyGetNodeRanking(false)

      return response.json()
    },
    onSuccess: nodeRanking => {
      dispatch(updateGraphRanking(nodeRanking))
    },
  })

  const { isLoading: isPayoffLoading } = useQuery({
    enabled: isReadyGetPayoff,
    queryKey: ['payoff', removedNodeIds],
    queryFn: async () => {
      const response = await fetch(`${API_ROOT}/payoff/`, {
        ...postHeaders,
        method: 'POST',
        body: JSON.stringify({
          chosen_network_id: networkCode.toString(),
          graphData: realGraphData,
          chosen_node_id: removedNodeIds[removedNodeIds.length - 1],
          round_id: round,
          game_id: localStorage.getItem('gameId'),
        }),
      })
      if (!response.ok) {
        throw new Error('Failed to get payoff')
      }
      setIsReadyGetPayoff(false)
      dispatch(
        updateRealGraphData(
          removeNodeAndRelatedLinksFromGraphData({
            graphData: realGraphData,
            removedNodeId: removedNodeIds[removedNodeIds.length - 1],
          }),
        ),
      )

      return response.json()
    },
    onSuccess: payoffResponse => {
      dispatch(updatePayoff({ payoffHuman: payoffResponse?.human_payoff, payoffFinder: payoffResponse?.finder_payoff }))
      if (payoffResponse?.isEnd) {
        setIsGameEndDialogOpen(true)
      } else {
        setTimeout(() => {
          setIsToolSelectionDialogOpen(true)
          dispatch(updateGraphRanking(null))
        }, 1000)
      }
    },
  })

  const onSelectTool = tool => {
    setIsToolSelectionDialogOpen(false)
    dispatch(updateSelectedTool(tool))
    setIsReadyGetNodeRanking(true)
  }

  return (
    <StyledGamePageContainer>
      <StyledQuitGameButton onClick={() => setIsQuitGameDialogOpen(true)}>結束遊戲</StyledQuitGameButton>

      <ToolSelectionDialog
        open={isToolSelectionDialogOpen && !isQuitGameDialogOpen}
        loading={isPayoffLoading}
        onConfirm={onSelectTool}
      />
      <GameEndDialog
        open={isGameEndDialogOpen && !isQuitGameDialogOpen}
        onConfirm={() => navigate('/questionnaire')}
        onCancel={() => navigate('/network-selection')}
      />
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
        {width > 767 && (
          <StyledInformationBlocksContainer>
            <GameInformationBlock />
            <NetworkInformationBlock />
          </StyledInformationBlocksContainer>
        )}
        {width <= 767 && (
          <Button width="100%" onClick={() => setIsInformationDialogShown(true)}>
            本回合資訊及累積報酬
          </Button>
        )}
        <ForceGraph
          loading={isGraphDataLoading || (round !== 1 && isNodeRankingLoading)}
          graphData={graphData}
          selectedTool={selectedTool[selectedTool.length - 1]}
          removedNodeIds={removedNodeIds}
          setRemovedNodeIds={setRemovedNodeIds}
          setIsReadyGetPayoff={setIsReadyGetPayoff}
        />
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
const StyledInformationBlocksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`
const StyledQuitGameButton = styled(Button)`
  position: absolute;
  right: 2rem;
`
