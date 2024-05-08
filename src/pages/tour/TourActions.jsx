import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'

import { API_ROOT, postHeaders } from '../../api.config'
import { useContextData } from '../../DataContext'
import { selectRealGraphData, updateGraphRanking, updateRealGraphData, resetGameData } from '../game/game.slice'
import { getViewport } from '../../utils'
import { removeNodeAndRelatedLinksFromGraphData } from '../game/game.utils'
import { filterDisabledNodeIds } from './tour.utils'
import { nodeIdsToBeRemoved } from './tourActions.config'
import { ForceGraph } from '../game/ForceGraph'
import { TourLayout } from './TourLayout'
import { GuideBlocks } from './GuideBlocks'
import { HintDialog } from './HintDialog'

export const TourActions = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { width: viewportWidth, height: viewportHeight } = getViewport()
  const graphWidth = viewportWidth > 768 ? viewportWidth / 2 : viewportWidth - 28
  const graphHeight = viewportWidth > 768 ? viewportHeight - 200 : viewportHeight / 2
  const contextData = useContextData()
  const {
    data: { toolsAvailable = {} },
  } = contextData
  const demoTool = toolsAvailable.HDA
  const realGraphData = useSelector(selectRealGraphData)

  const [removedNodeIds, setRemovedNodeIds] = useState([])
  const [isReadyToGetNodeRanking, setIsReadyToGetNodeRanking] = useState(true)
  const [isHintDialogOpen, setIsHintDialogOpen] = useState(false)
  const [step, setStep] = useState(0)

  const { data: graphData, isLoading: isGraphDataLoading } = useQuery({
    queryKey: ['gameStart', 'Action'],
    queryFn: async () => {
      const playerId = localStorage.getItem('playerId')
      const gameId = localStorage.getItem('gameId')
      const response = await fetch(
        `${API_ROOT}/game_start/?chosen_network_id=0&player_id=${playerId}&game_id=${gameId}`,
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
    enabled: isReadyToGetNodeRanking && !!realGraphData,
    queryKey: ['nodeRanking', step],
    queryFn: async () => {
      const playerId = localStorage.getItem('playerId')
      const response = await fetch(`${API_ROOT}/node_ranking/`, {
        ...postHeaders,
        method: 'POST',
        body: JSON.stringify({
          chosen_network_id: '0',
          chosen_tool_id: '1',
          player_id: playerId,
          round_id: step - 1,
          graphData: realGraphData,
        }),
      })
      if (!response.ok) {
        throw new Error('Failed to get node ranking')
      }

      return response.json()
    },
    onSuccess: nodeRanking => {
      dispatch(updateGraphRanking(nodeRanking))
      setIsReadyToGetNodeRanking(false)
    },
  })

  const onConfirmToNextStep = () => {
    setIsHintDialogOpen(false)
    dispatch(
      updateRealGraphData(
        removeNodeAndRelatedLinksFromGraphData({
          graphData: realGraphData,
          removedNodeId: removedNodeIds[removedNodeIds.length - 1],
        }),
      ),
    )
    setTimeout(() => {
      setIsReadyToGetNodeRanking(true)
    }, 0)
    setStep(prev => prev + 1)
  }

  const onConfirmToPlayGame = () => {
    dispatch(resetGameData())
    navigate('/network-selection')
  }

  return (
    <TourLayout pageTitle="操作網絡">
      <HintDialog
        open={isHintDialogOpen}
        onConfirm={step === 2 ? onConfirmToPlayGame : onConfirmToNextStep}
        step={step}
      />
      <StyledContainer>
        <StyledParagraph>
          接下來我們透過一個範例來讓您體會一下遊戲的過程！
          <br />
          以下這個網絡圖，展示的是 2001 年 9 月 11
          日劫機攻擊美國本土的蓋達組織恐怖份子關係圖。圖中每一個點是一位劫機犯，每一條線顯示他們曾經有通聯紀錄，因此推斷有密謀關係。現在請您開始依據指示每次挑選一個點（人物），直到這個恐怖份子的所有關係被移除為止，達成任務。
        </StyledParagraph>
        <StyledParagraph>
          您可以使用滑鼠滾輪放大或縮小網絡，也可以使用網絡右下角的按鈕控制。
          <br />
          將游標停在一個點上，會提示您和它連接的點，此時按下該點就可以將它從網絡上移除。
        </StyledParagraph>
        <GuideBlocks step={step} />
      </StyledContainer>
      <StyledGraphAndButtonContainer>
        <ForceGraph
          loading={isGraphDataLoading || isNodeRankingLoading}
          graphData={graphData}
          selectedTool={demoTool}
          removedNodeIds={removedNodeIds}
          setRemovedNodeIds={setRemovedNodeIds}
          onNodeRemoved={() => {
            setIsHintDialogOpen(true)
          }}
          disabledNodeIds={filterDisabledNodeIds({
            graphData: realGraphData,
            nodeIdToBeRemoved: nodeIdsToBeRemoved[step]?.id,
          })}
          width={graphWidth}
          height={graphHeight}
        />
      </StyledGraphAndButtonContainer>
    </TourLayout>
  )
}

const StyledContainer = styled.div`
  position: relative;
`
const StyledParagraph = styled.div`
  margin-top: 1rem;
  @media screen and (max-width: 767px) {
    margin-bottom: 1rem;
  }
`
const StyledGraphAndButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2rem;
`
