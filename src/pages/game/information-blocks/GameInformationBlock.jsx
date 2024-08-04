import { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'

import { color } from '../../../styles'
import { Chip, HoverTooltip, Button } from '../../../components'
import { selectSelectedTool, selectRound, selectPayoff } from '../game.slice'
import { parsePayoffDataForChart } from '../game.utils'
import { PayoffChart } from '../PayoffChart'
import { StyledCard, StyledRow } from './styles'

export const GameInformationBlock = ({ isReadyGetNextRoundTool, onSelectNextRoundTool, shuffledToolsAvailable }) => {
  const selectedTool = useSelector(selectSelectedTool)
  const round = useSelector(selectRound)
  const payoffRawData = useSelector(selectPayoff)
  const data = parsePayoffDataForChart({ payoffRawData })
  const [expandedTool, setExpandedTool] = useState(null)

  return (
    <StyledCard>
      <StyledRow>
        <Chip label="回合" />
        <div>{round}</div>
      </StyledRow>
      {isReadyGetNextRoundTool ? (
        <StyledRow>
          <Chip label="請選擇本回合輔助指標" />
          <StyledOptionsContainer>
            {shuffledToolsAvailable.map(tool => (
              <StyledOptionContainer key={tool.code}>
                <StyledAccordion
                  expanded={(expandedTool?.code ?? '') === tool.code}
                  onChange={() => setExpandedTool(tool)}
                >
                  <AccordionSummary>{tool.displayName}</AccordionSummary>
                  <StyledAccordionDetails>{tool.introduction}</StyledAccordionDetails>
                </StyledAccordion>
              </StyledOptionContainer>
            ))}
            <StyledConfirmButton disabled={!expandedTool} onClick={() => onSelectNextRoundTool(expandedTool)}>
              選擇
            </StyledConfirmButton>
          </StyledOptionsContainer>
        </StyledRow>
      ) : (
        <StyledRow>
          <Chip label="本回合輔助指標" />
          <div>{selectedTool[selectedTool.length - 1]?.displayName ?? ''}</div>
          {selectedTool[selectedTool.length - 1]?.introduction && (
            <HoverTooltip tooltip={selectedTool[selectedTool.length - 1]?.introduction} />
          )}
        </StyledRow>
      )}
      {round > 1 && (
        <>
          <StyledRow>
            <Chip label="累積分數(滿分為100分)" />
            <HoverTooltip
              tooltip="
              AI Finder的成績，是指若您完全遵守 AI FINDER 的策略，您可獲得的分數。
              後續皆遵守 AI FINDER 的成績是指若您從本回合開始，皆遵守 AI FINDER 的策略，您可獲得的分數。
            "
            />
          </StyledRow>
          <div>這回合，您得到 {data[round - 2].payoffHuman.toFixed(6)} 分</div>
          <div>下圖顯示您目前的累計分數。我們同時也給您參考，若是您採用AI的建議的話，可以獲得的分數。</div>
          <PayoffChart data={data} />
        </>
      )}
    </StyledCard>
  )
}
GameInformationBlock.propTypes = {
  isReadyGetNextRoundTool: PropTypes.bool.isRequired,
  onSelectNextRoundTool: PropTypes.func.isRequired,
  shuffledToolsAvailable: PropTypes.array.isRequired,
}

const StyledOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  width: 100%;
`
const StyledOptionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`
const StyledAccordion = styled(Accordion)`
  background-color: ${props => props.expanded && color.primaryColor400};
  color: ${props => props.expanded && color.neutralsColor0};
  width: 17rem;
  @media screen and (max-width: 767px) {
    width: auto;
  }
`
const StyledAccordionDetails = styled(AccordionDetails)`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.75rem;
`
const StyledConfirmButton = styled(Button)``
