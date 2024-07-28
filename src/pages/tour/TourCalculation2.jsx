import { useState } from 'react'

import { getViewport } from '../../utils'
import { TourLayout } from './TourLayout'
import { Button } from '../../components'
import { ForceGraph } from '../game/ForceGraph'
import { GuideBlocks } from './GuideBlocks'
import { filterDisabledNodeIds } from './tour.utils'
import { example2GraphData, example2StepsConfig } from './tourCalculation.config'
import { StyledContainer, StyledParagraph, StyledGraphAndButtonContainer, StyledLink } from './Tour.styles'

export const TourCalculation2 = () => {
  const { width: viewportWidth, height: viewportHeight } = getViewport()
  const graphWidth = viewportWidth > 768 ? viewportWidth / 2 : viewportWidth - 28
  const graphHeight = viewportWidth > 768 ? viewportHeight - 200 : viewportHeight / 2

  const [removedNodeIds, setRemovedNodeIds] = useState([])
  const [step, setStep] = useState(0)
  const [isFinalHintShown, setIsFinalHintShown] = useState(false)
  const [completedNodeIds, setCompletedNodeIds] = useState([])

  const onNodeRemoved = (node, nodeIdsToBeRemoved) => {
    setCompletedNodeIds(prev => [...prev, node.id])
    if (node.id === nodeIdsToBeRemoved[nodeIdsToBeRemoved.length - 1]) {
      setTimeout(() => {
        setRemovedNodeIds([])
        setCompletedNodeIds([])
        if (step === 0) {
          setStep(prev => prev + 1)
        } else {
          setIsFinalHintShown(true)
        }
      }, 2000)
    }
  }

  return (
    <TourLayout pageTitle="分數計算標準">
      <StyledContainer>
        <StyledParagraph>
          第二個分數計算的原則是：能用越短的次數（回合數）移除所有的網絡關係，分數越高！
        </StyledParagraph>
        <StyledParagraph>現在就來用以下的例子嘗試看看吧！</StyledParagraph>
        <GuideBlocks step={step} config={example2StepsConfig} completedNodeIds={completedNodeIds} />
        {isFinalHintShown && (
          <StyledParagraph>
            您應該有發現，在第一次的試驗中您移除總共四個點，就可以完全瓦解整個網絡的連結；但是在第二次試驗中，您要移除五個點，才能達成任務。這個例子說明了，移除點的先後順序會有影響；有些移除順序可以更為快速地瓦解整個網絡，因此可以拿到比較高的分數
          </StyledParagraph>
        )}
        {isFinalHintShown && (
          <StyledLink to="/tour/tools">
            <Button width="10rem" disabled={!isFinalHintShown}>
              下一步
            </Button>
          </StyledLink>
        )}
      </StyledContainer>
      <StyledGraphAndButtonContainer>
        <ForceGraph
          graphData={example2GraphData}
          removedNodeIds={removedNodeIds}
          setRemovedNodeIds={setRemovedNodeIds}
          disabledNodeIds={filterDisabledNodeIds({
            graphData: example2GraphData,
            nodeIdToBeRemoved: example2StepsConfig[step].nodeIdsToBeRemoved.find(
              nodeId => !completedNodeIds.includes(nodeId),
            ),
          })}
          onNodeRemoved={args => onNodeRemoved(args, example2StepsConfig[step].nodeIdsToBeRemoved)}
          width={graphWidth}
          height={graphHeight}
        />
      </StyledGraphAndButtonContainer>
    </TourLayout>
  )
}
