import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'

import { API_ROOT } from '../../api.config'
import { getViewport } from '../../utils'
import { selectToolsAvailable } from '../game/game.slice'
import { Button } from '../../components'
import { ForceGraph } from '../game/ForceGraph'
import { TourLayout } from './TourLayout'

export const TourActions = () => {
  const { width: viewportWidth, height: viewportHeight } = getViewport()
  const toolsAvailable = useSelector(selectToolsAvailable)
  const demoTool = toolsAvailable.HDA

  const { data: graphData } = useQuery({
    queryKey: ['gameStart'],
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

  return (
    <TourLayout pageTitle="操作網絡">
      <StyledContainer>
        <StyledParagraph>接下來要告訴您一些操作網絡的技巧。</StyledParagraph>
        <StyledParagraph>
          首先，您可以使用滑鼠滾輪放大或縮小網絡，也可以使用網絡右下角的按鈕控制。
          <br />
          連續點選一個點兩次，就可以將它從網絡上移除，您可以在右邊的圖上嘗試看看！
        </StyledParagraph>
        <StyledParagraph>如果您準備好了，就讓我們開始遊戲吧！</StyledParagraph>
        <StyledLink to="/network-selection">
          <Button>準備好了，開始遊戲！</Button>
        </StyledLink>
      </StyledContainer>
      <div>
        {graphData && (
          <ForceGraph
            graphData={graphData}
            selectedTool={demoTool}
            width={viewportWidth / 2}
            height={viewportHeight - 200}
          />
        )}
      </div>
    </TourLayout>
  )
}

const StyledContainer = styled.div`
  position: relative;
`
const StyledParagraph = styled.div`
  margin-top: 1rem;
`
const StyledLink = styled(Link)`
  position: absolute;
  right: 1rem;
  bottom: 0;
  text-decoration: none;
  color: inherit;
`
