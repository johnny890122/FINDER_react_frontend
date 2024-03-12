import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import styled from '@emotion/styled'
import { API_ROOT } from '../../api.config'
import { getViewport } from '../../utils'
import { Button } from '../../components'

import { TourLayout } from './TourLayout'
import { ForceGraph } from '../game/ForceGraph'

export const TourIntroduction = () => {
  const { width: viewportWidth, height: viewportHeight } = getViewport()
  const graphWidth = viewportWidth > 768 ? viewportWidth / 2 : viewportWidth - 28
  const graphHeight = viewportWidth > 768 ? viewportHeight - 200 : viewportHeight / 2

  const { data: graphData, isLoading: isGraphDataLoading } = useQuery({
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
    <TourLayout pageTitle="歡迎！">
      <StyledContainer>
        <StyledParagraph>
          歡迎來到我們所設計的一個「搗毀密謀網絡」的遊戲！
          <br />
          在以下的遊戲中，我們會呈現某個真實的犯罪或地下組織的關係結構圖（如下），圖裡每一個「點」都代表一個人物，每一條「線」顯示人物之間有著某種合作關係。您的任務是把這些線（關係）給移除，進而搗毀整個組織網絡。
        </StyledParagraph>
        <StyledParagraph>
          怎麼做呢？
          <br />
          每一回合，請您在圖中挑選一個點（人物），接著，電腦會移除您所挑選的那個點，以及所有連接到這個點的線。您每一次移除一個點，直到圖中所有的邊被移除為止，就算任務完成。
        </StyledParagraph>
        <StyledParagraph>
          我們會為您的表現評分，分數的計算原則如下：
          <StyledOl>
            <li>每一次所移除的點以及相關的邊，若是越能讓其他人物彼此之間斷聯，分數越高！</li>
            <li>能用越短的次數（回合數）移除所有的網絡關係，分數越高！</li>
          </StyledOl>
        </StyledParagraph>
        <StyledLink to="/tour/tools">
          <Button width="10rem">下一步</Button>
        </StyledLink>
      </StyledContainer>
      <div>
        {graphData && (
          <ForceGraph
            withAction={false}
            withPayoff={false}
            loading={isGraphDataLoading}
            graphData={graphData}
            width={graphWidth}
            height={graphHeight}
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
const StyledOl = styled.ol`
  padding-left: 1.5rem;
  margin-top: 0.25rem;
`
const StyledLink = styled(Link)`
  position: absolute;
  right: 1rem;
  bottom: 0;
  text-decoration: none;
  color: inherit;
  @media screen and (max-width: 767px) {
    position: static;
    margin-top: 2rem;
  }
`
