import { useState } from 'react'
import { getViewport } from '../../utils'
import { TourLayout } from './TourLayout'
import { Button } from '../../components'
import { ForceGraph } from '../game/ForceGraph'

import { GuideBlocksForCalculation } from './GuideBlocksForCalculation'
import { filterDisabledNodeIds } from './tour.utils'
import { example1GraphData, example1StepsConfig } from './tourCalculation.config'
import { StyledContainer, StyledParagraph, StyledGraphAndButtonContainer, StyledLink } from './Tour.styles'

export const TourCalculation = () => {
  const { width: viewportWidth, height: viewportHeight } = getViewport()
  const graphWidth = viewportWidth > 768 ? viewportWidth / 2 : viewportWidth - 28
  const graphHeight = viewportWidth > 768 ? viewportHeight - 200 : viewportHeight / 2

  const [removedNodeIds, setRemovedNodeIds] = useState([])
  const [step, setStep] = useState(0)
  const [isFinalHintShown, setIsFinalHintShown] = useState(false)

  const onNodeRemoved = () => {
    setTimeout(() => {
      setRemovedNodeIds([])
      if (step === 0) {
        setStep(prev => prev + 1)
      } else {
        setIsFinalHintShown(true)
      }
    }, 2000)
  }

  return (
    <TourLayout pageTitle="分數計算標準">
      <StyledContainer>
        <StyledParagraph>
          我們會為您的表現評分，分數的計算原則如下：每一次所移除的點以及相連的線，若是越能讓人物彼此之間越多斷聯，分數越高！
        </StyledParagraph>
        <StyledParagraph>現在就來用以下的例子嘗試看看吧！</StyledParagraph>
        <GuideBlocksForCalculation step={step} />
        {isFinalHintShown && (
          <StyledParagraph>
            這個例子顯示，移除編號 #5 的點比起移除編號 #8 的點，會讓其他點彼此之間斷連的程度比較高，也因此移除編號 #5
            的分數會比移除編號 #8 來得高
          </StyledParagraph>
        )}
      </StyledContainer>
      <StyledGraphAndButtonContainer>
        <ForceGraph
          graphData={example1GraphData}
          removedNodeIds={removedNodeIds}
          setRemovedNodeIds={setRemovedNodeIds}
          disabledNodeIds={filterDisabledNodeIds({
            graphData: example1GraphData,
            nodeIdToBeRemoved: example1StepsConfig[step].nodeIdToBeRemoved,
          })}
          onNodeRemoved={onNodeRemoved}
          width={graphWidth}
          height={graphHeight}
        />
        <StyledLink to="/tour/tools">
          <Button width="10rem" disabled={!isFinalHintShown}>
            下一步
          </Button>
        </StyledLink>
      </StyledGraphAndButtonContainer>
    </TourLayout>
  )
}
