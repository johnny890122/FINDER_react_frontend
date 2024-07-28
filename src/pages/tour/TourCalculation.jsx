import { useState } from 'react'
import styled from '@emotion/styled'

import { color } from '../../styles'
import { getViewport } from '../../utils'
import { TourLayout } from './TourLayout'
import { Button } from '../../components'
import { ForceGraph } from '../game/ForceGraph'
import { GuideBlocks } from './GuideBlocks'
import { filterDisabledNodeIds } from './tour.utils'
import { example1GraphData, example1StepsConfig } from './tourCalculation.config'
import { StyledContainer, StyledParagraph, StyledGraphAndButtonContainer, StyledLink } from './Tour.styles'
import tourCalculation1 from '../../assets/tour-calculation-1.png'
import tourCalculation2 from '../../assets/tour-calculation-2.png'

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
        <GuideBlocks step={step} config={example1StepsConfig} />
        {isFinalHintShown && (
          <StyledParagraph>
            這個例子顯示，移除編號 #5 的點比起移除編號 #8 的點，會讓其他點彼此之間斷連的程度比較高，也因此移除編號 #5
            的分數會比移除編號 #8 來得高
            <StyledImagesContainer>
              <StyledFigure>
                <StyledImage src={tourCalculation1} alt="#5" />
                <figcaption>移除編號 #5 的點</figcaption>
              </StyledFigure>
              <StyledFigure>
                <StyledImage src={tourCalculation2} alt="#8" />
                <figcaption>移除編號 #8 的點</figcaption>
              </StyledFigure>
            </StyledImagesContainer>
          </StyledParagraph>
        )}
        {isFinalHintShown && (
          <StyledLink to="/tour/calculation2">
            <Button width="10rem" disabled={!isFinalHintShown}>
              下一步
            </Button>
          </StyledLink>
        )}
      </StyledContainer>
      <StyledGraphAndButtonContainer>
        <ForceGraph
          graphData={example1GraphData}
          removedNodeIds={removedNodeIds}
          setRemovedNodeIds={setRemovedNodeIds}
          disabledNodeIds={filterDisabledNodeIds({
            graphData: example1GraphData,
            nodeIdToBeRemoved: example1StepsConfig[step].nodeIdsToBeRemoved[0],
          })}
          onNodeRemoved={onNodeRemoved}
          width={graphWidth}
          height={graphHeight}
        />
      </StyledGraphAndButtonContainer>
    </TourLayout>
  )
}

const StyledImagesContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0 0 0;
`
const StyledFigure = styled.figure`
  margin: 0;
  & > figcaption {
    text-align: center;
  }
`
const StyledImage = styled.img`
  border: 1px solid ${color.primaryColor400};
  height: 10rem;
`
