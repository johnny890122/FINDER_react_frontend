import { useState } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { selectRound } from '../game.slice'
import { Chip, Button, HoverTooltip } from '../../../components'
import { color } from '../../../styles'
import { StyledRow, StyledChipAndTooltip } from './styles'

export const ToolsInformation = ({
  stepStatus,
  selectedTool,
  onGotoNextRound,
  onSelectNextRoundTool,
  shuffledToolsAvailable,
}) => {
  const [expandedTool, setExpandedTool] = useState(null)
  const round = useSelector(selectRound)

  if (stepStatus === 'READY_FOR_SELECT_TOOL') {
    return (
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
          <Button disabled={!expandedTool} onClick={() => onSelectNextRoundTool(expandedTool)}>
            選擇
          </Button>
        </StyledOptionsContainer>
      </StyledRow>
    )
  }

  return (
    <StyledChipAndTooltip>
      <Chip label="本回合輔助指標" />
      <div>{selectedTool[selectedTool.length - 1]?.displayName ?? ''}</div>
      {selectedTool[selectedTool.length - 1]?.introduction && (
        <HoverTooltip tooltip={selectedTool[selectedTool.length - 1]?.introduction} />
      )}
      {stepStatus === 'READY_FOR_NEXT_ROUND' && (
        <StyledGotoNextRoundButton onClick={onGotoNextRound}>
          {round === 1 ? '進入第一回合' : '進入下一回合'}
        </StyledGotoNextRoundButton>
      )}
    </StyledChipAndTooltip>
  )
}
ToolsInformation.propTypes = {
  stepStatus: PropTypes.string.isRequired,
  selectedTool: PropTypes.array.isRequired,
  onSelectNextRoundTool: PropTypes.func.isRequired,
  onGotoNextRound: PropTypes.func.isRequired,
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
const StyledGotoNextRoundButton = styled(Button)`
  position: absolute;
  bottom: 0;
  right: 0;
`
