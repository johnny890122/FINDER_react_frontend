import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Tooltip as MuiTooltip, Popper } from '@mui/material'
import { InfoOutlined } from '@mui/icons-material'

import { color } from '../styles'

const StyledIcon = styled(InfoOutlined)`
  &.MuiSvgIcon-root {
    color: ${color.neutralsColor700};
    width: 1rem;
    height: 1rem;
  }
`
const StyledPopper = styled(Popper)`
  &.MuiTooltip-popper {
    z-index: 999999 !important;
  }
  .MuiTooltip-tooltip {
    &.MuiTooltip-tooltipPlacementRight {
      margin-left: 0.25rem;
    }
  }
`

export const HoverTooltip = ({ tooltip }) => (
  <MuiTooltip title={tooltip} placement="right" components={{ Popper: StyledPopper }}>
    <div>
      <StyledIcon />
    </div>
  </MuiTooltip>
)

HoverTooltip.propTypes = {
  tooltip: PropTypes.string,
}
HoverTooltip.defaultProps = {
  tooltip: '',
}
