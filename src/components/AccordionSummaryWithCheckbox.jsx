import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { AccordionSummary } from '@mui/material'
import { Checkbox, CheckboxLevels } from './Checkbox'

export const AccordionSummaryWithCheckbox = ({ title, expanded, checked }) => (
  <StyledAccordionSummary>
    <Checkbox level={expanded ? CheckboxLevels.SECONDARY : CheckboxLevels.PRIMARY} checked={checked} />
    {title}
  </StyledAccordionSummary>
)
AccordionSummaryWithCheckbox.propTypes = {
  title: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
  checked: PropTypes.bool.isRequired,
}
const StyledAccordionSummary = styled(AccordionSummary)`
  & .MuiAccordionSummary-content {
    display: flex;
    align-items: center;
  }
`
