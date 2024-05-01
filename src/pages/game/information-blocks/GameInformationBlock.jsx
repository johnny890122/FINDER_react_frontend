import { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { Done } from '@mui/icons-material'

import { useContextData } from '../../../DataContext'
import { color } from '../../../styles'
import { Chip, HoverTooltip, IconButton } from '../../../components'
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
                {(expandedTool?.code ?? '') === tool.code && (
                  <IconButton onClick={() => onSelectNextRoundTool(tool)}>
                    <Done />
                  </IconButton>
                )}
              </StyledOptionContainer>
            ))}
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
            <Chip label="累積報酬" />
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
  align-items: center;
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
