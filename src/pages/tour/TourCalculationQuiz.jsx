import { useState } from 'react'
import styled from '@emotion/styled'
import { RadioGroup, FormControlLabel, Slide } from '@mui/material'
import { getViewport } from '../../utils'
import { TourLayout } from './TourLayout'
import { Button, Radio } from '../../components'
import { color } from '../../styles'
import { ForceGraph } from '../game/ForceGraph'
import { exampleQuiz1GraphData, exampleQuiz2GraphData } from './tourCalculation.config'
import { StyledContainer, StyledParagraph, StyledGraphAndButtonContainer, StyledLink } from './Tour.styles'

export const TourCalculationQuiz = () => {
  const { width: viewportWidth, height: viewportHeight } = getViewport()
  const graphWidth = viewportWidth > 768 ? viewportWidth / 2 : viewportWidth - 28
  const graphHeight = viewportWidth > 768 ? viewportHeight - 200 : viewportHeight / 2

  const [graphData, setGraphData] = useState(exampleQuiz1GraphData)
  const [quiz1Answer, setQuiz1Answer] = useState('')
  const [quiz1AnswerChances, setQuiz1AnswerChances] = useState(0)
  const [quiz2Answer, setQuiz2Answer] = useState('')
  const [quiz2AnswerChances, setQuiz2AnswerChances] = useState(0)

  const [step, setStep] = useState(0)
  const [isFinalHintShown, setIsFinalHintShown] = useState(false)

  const handleQuiz1AnswerChange = e => {
    setQuiz1Answer(e.target.value)
    setQuiz1AnswerChances(prev => prev + 1)
    if (e.target.value === '3') {
      setTimeout(() => {
        setStep(prev => prev + 1)
        setGraphData(exampleQuiz2GraphData)
      }, 2000)
    }
  }
  const handleQuiz2AnswerChange = e => {
    setQuiz2Answer(e.target.value)
    setQuiz2AnswerChances(prev => prev + 1)
    if (e.target.value === '1') {
      setTimeout(() => {
        setIsFinalHintShown(true)
      }, 2000)
    }
  }

  return (
    <TourLayout pageTitle="分數計算 - 理解測驗">
      <StyledContainer>
        <StyledParagraph>接下來，我們想請您回答兩個問題，確認您有充分瞭解遊戲分數計算的規則</StyledParagraph>
        {step === 0 && (
          <>
            <StyledQuizTitle>測驗 1</StyledQuizTitle>
            <StyledParagraph>請問在右側的網絡中，移除 #3 還是 #5，可以獲得比較高的分數？</StyledParagraph>
            <RadioGroup row name="quiz1" value={quiz1Answer} onChange={handleQuiz1AnswerChange}>
              <FormControlLabel key="3" value="3" label="#3" control={<Radio />} />
              <FormControlLabel key="5" value="5" label="#5" control={<Radio />} />
            </RadioGroup>
            <Slide direction="up" in={quiz1Answer === '5' || quiz1AnswerChances === 2} mountOnEnter unmountOnExit>
              <StyledIncorrectHint>移除 #3 或許可以獲得較高的分數？請再試一次看看</StyledIncorrectHint>
            </Slide>
            <Slide direction="up" in={quiz1Answer === '3'} mountOnEnter unmountOnExit>
              <StyledCorrectHint>正確答案！移除 #3 可以獲得比較高的分數</StyledCorrectHint>
            </Slide>
          </>
        )}

        {step === 1 && (
          <>
            <StyledQuizTitle>測驗 2</StyledQuizTitle>
            <StyledParagraph>請問在右側的網絡中，移除 #1 還是 #2，可以獲得比較高的分數？</StyledParagraph>
            <RadioGroup row name="quiz2" value={quiz2Answer} onChange={handleQuiz2AnswerChange}>
              <FormControlLabel key="1" value="1" label="#1" control={<Radio />} />
              <FormControlLabel key="2" value="2" label="#2" control={<Radio />} />
            </RadioGroup>
            <Slide direction="up" in={quiz2Answer === '2' || quiz2AnswerChances === 2} mountOnEnter unmountOnExit>
              <StyledIncorrectHint>移除 #1 或許可以獲得較高的分數？請再試一次看看</StyledIncorrectHint>
            </Slide>
            <Slide direction="up" in={quiz2Answer === '1'} mountOnEnter unmountOnExit>
              <StyledCorrectHint>正確答案！移除 #1 可以獲得比較高的分數</StyledCorrectHint>
            </Slide>
          </>
        )}

        {isFinalHintShown && (
          <StyledParagraph>您已經充分了解分數計算的規則了，現在讓我們進到下一步吧！</StyledParagraph>
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
        <ForceGraph graphData={graphData} width={graphWidth} height={graphHeight} withAction={false} />
      </StyledGraphAndButtonContainer>
    </TourLayout>
  )
}

const StyledQuizTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`
const StyledHint = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-radius: 0.25rem;
  margin-top: 0.5rem;
`
const StyledCorrectHint = styled(StyledHint)`
  background-color: ${color.primaryColor50};
`
const StyledIncorrectHint = styled(StyledHint)`
  background-color: ${color.neutralsColor400};
`
