import { getViewport } from '../../utils'
import { TourLayout } from './TourLayout'
import { Button } from '../../components'
import { ForceGraph } from '../game/ForceGraph'
import { StyledContainer, StyledParagraph, StyledGraphAndButtonContainer, StyledLink } from './Tour.styles'
import { getExample1GraphData } from './tourCalculation.utils'

export const TourCalculation = () => {
  const { width: viewportWidth, height: viewportHeight } = getViewport()
  const graphWidth = viewportWidth > 768 ? viewportWidth / 2 : viewportWidth - 28
  const graphHeight = viewportWidth > 768 ? viewportHeight - 200 : viewportHeight / 2

  return (
    <TourLayout pageTitle="分數計算標準">
      <StyledContainer>
        <StyledParagraph>
          我們會為您的表現評分，分數的計算原則如下：每一次所移除的點以及相連的線，若是越能讓人物彼此之間越多斷聯，分數越高！
        </StyledParagraph>
        <StyledParagraph>現在就來用以下的例子嘗試看看吧！</StyledParagraph>
      </StyledContainer>
      <StyledGraphAndButtonContainer>
        <ForceGraph withAction={false} graphData={getExample1GraphData()} width={graphWidth} height={graphHeight} />
        <StyledLink to="/tour/tools">
          <Button width="10rem">下一步</Button>
        </StyledLink>
      </StyledGraphAndButtonContainer>
    </TourLayout>
  )
}
