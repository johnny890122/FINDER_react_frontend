import { useState } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'

import { color } from '../../styles'
import { Dialog, DialogTypes, Chip } from '../../components'
import { selectToolsAvailable, selectPayoff } from './game.slice'
import { PayoffChart } from './PayoffChart'

export const ToolSelectionDialog = ({ open = false, onConfirm = () => {} }) => {
  const toolsAvailable = useSelector(selectToolsAvailable)
  const payoff = useSelector(selectPayoff)
  const [expandedTool, setExpandedTool] = useState(null)

  return (
    <Dialog
      open={open}
      title="選擇下一回合輔助指標"
      type={DialogTypes.CONFIRM}
      disabled={!expandedTool}
      onConfirm={() => {
        onConfirm(expandedTool)
        setExpandedTool(null)
      }}
    >
      <StyledDialogContent>
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
        </StyledOptionsContainer>
        {!!payoff && (
          <StyledChartContainer>
            <Chip label="累積報酬" />
            <PayoffChart />
          </StyledChartContainer>
        )}
      </StyledDialogContent>
    </Dialog>
  )
}

ToolSelectionDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
}

const StyledDialogContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`
const StyledOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
`
const StyledOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 17rem;
`
const StyledAccordion = styled(Accordion)`
  background-color: ${props => props.expanded && color.primaryColor400};
  color: ${props => props.expanded && color.neutralsColor0};
`
const StyledAccordionDetails = styled(AccordionDetails)`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.75rem;
`
const StyledChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  padding-top: 0;
`
