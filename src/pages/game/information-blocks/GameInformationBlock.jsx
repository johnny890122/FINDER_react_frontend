import { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'

import { useContextData } from '../../../DataContext'
import { color } from '../../../styles'
import { Chip, HoverTooltip, Button } from '../../../components'
import { selectSelectedTool, selectRound } from '../game.slice'
import { PayoffChart } from '../PayoffChart'
import { StyledCard, StyledRow } from './styles'

export const GameInformationBlock = ({ isReadyGetNextRoundTool, onSelectNextRoundTool }) => {
  const contextData = useContextData()
  const {
    data: { toolsAvailable = {} },
  } = contextData

  const selectedTool = useSelector(selectSelectedTool)
  const round = useSelector(selectRound)
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
            {Object.values(toolsAvailable).map(tool => (
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
          <PayoffChart />
        </>
      )}
    </StyledCard>
  )
}
GameInformationBlock.propTypes = {
  isReadyGetNextRoundTool: PropTypes.bool.isRequired,
  onSelectNextRoundTool: PropTypes.func.isRequired,
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
