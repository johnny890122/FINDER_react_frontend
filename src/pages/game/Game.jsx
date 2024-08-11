import { useState, useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { useQuery } from '@tanstack/react-query'
import styled from '@emotion/styled'

import { API_ROOT, postHeaders } from '../../api.config'
import { useContextData } from '../../DataContext'
import { Button } from '../../components'
import {
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
import { GameInformationBlock, NetworkInformationBlock } from './information-blocks'
import { QuitGameDialog } from './QuitGameDialog'
import { ForceGraph } from './ForceGraph'
import { GameEndDialog } from './GameEndDialog'

export const GamePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const networkCode = localStorage.getItem('thisRoundNetworkCode')
  const selectedTool = useSelector(selectSelectedTool)
  const round = useSelector(selectRound)
  const realGraphData = useSelector(selectRealGraphData)
  const contextData = useContextData()
  const {
    data: { toolsAvailable = {} },
  } = contextData

  const [stepStatus, setStepStatus] = useState('')
  const [isGameEndDialogOpen, setIsGameEndDialogOpen] = useState(false)
  const [isQuitGameDialogOpen, setIsQuitGameDialogOpen] = useState(false)
  const [isReadyGetNodeRanking, setIsReadyGetNodeRanking] = useState(false)
  const [isReadyGetPayoff, setIsReadyGetPayoff] = useState(false)
  const [isPayoffLoading, setIsPayoffLoading] = useState(false)
  const [removedNodeIds, setRemovedNodeIds] = useState([])

  const shuffledToolsAvailable = useMemo(
    () => Object.values(toolsAvailable).sort(() => Math.random() - 0.5),
    [toolsAvailable, round],
  )

  useEffect(() => {
    const gameId = uuidv4()
    localStorage.setItem('gameId', gameId)

    return () => {
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
    onSuccess: () => {
      setStepStatus('READY_FOR_NEXT_ROUND')
    },
  })

  const { isLoading: isNodeRankingLoading } = useQuery({
    enabled: isReadyGetNodeRanking,
    queryKey: ['nodeRanking', round],
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

  useQuery({
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

      return response.json()
    },
    onSuccess: payoffResponse => {
      dispatch(
        updatePayoff({
          payoffHuman: payoffResponse?.human_payoff,
          payoffFinder: payoffResponse?.finder_payoff,
          payoffInstantFinder: payoffResponse?.instant_finder_payoff,
        }),
      )
      if (payoffResponse?.isEnd) {
        setIsGameEndDialogOpen(true)
      } else {
        setStepStatus('READY_FOR_NEXT_ROUND')
        dispatch(updateGraphRanking(null))
      }
    },
    onSettled: () => {
      setIsReadyGetPayoff(false)
      setIsPayoffLoading(false)
      dispatch(
        updateRealGraphData(
          removeNodeAndRelatedLinksFromGraphData({
            graphData: realGraphData,
            removedNodeId: removedNodeIds[removedNodeIds.length - 1],
          }),
        ),
      )
    },
  })

  const onGotoNextRound = () => {
    setStepStatus('READY_FOR_SELECT_TOOL')
  }

  const onSelectTool = tool => {
    setStepStatus('SETTLED')
    dispatch(updateSelectedTool(tool))
    setIsReadyGetNodeRanking(true)
  }

  return (
    <StyledGamePageContainer>
      <StyledQuitGameButton onClick={() => setIsQuitGameDialogOpen(true)}>結束遊戲</StyledQuitGameButton>

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

      <StyledGameContainer>
        <StyledInformationBlocksContainer>
          <NetworkInformationBlock />
          <GameInformationBlock
            stepStatus={stepStatus}
            onGotoNextRound={onGotoNextRound}
            onSelectNextRoundTool={onSelectTool}
            shuffledToolsAvailable={shuffledToolsAvailable}
          />
        </StyledInformationBlocksContainer>
        <ForceGraph
          loading={!isGameEndDialogOpen && isGraphDataLoading}
          isNodeRankingOrPayoffLoading={!selectedTool.length || isNodeRankingLoading || isPayoffLoading}
          isAbleToSelectNodeHintShown
          graphData={graphData}
          selectedTool={selectedTool[selectedTool.length - 1]}
          removedNodeIds={removedNodeIds}
          setRemovedNodeIds={setRemovedNodeIds}
          setIsReadyGetPayoff={setIsReadyGetPayoff}
          setIsPayoffLoading={setIsPayoffLoading}
        />
      </StyledGameContainer>
    </StyledGamePageContainer>
  )
}

const StyledGamePageContainer = styled.div`
  padding: 2rem;
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
