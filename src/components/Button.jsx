import PropTypes from 'prop-types'
import { Button as MuiButton } from '@mui/material'
import styled from '@emotion/styled'

export const Button = ({ children, ...props }) => (
  <StyledButton variant="contained" {...props}>
    {children}
  </StyledButton>
)

Button.propTypes = {
  children: PropTypes.node.isRequired,
}

const StyledButton = styled(MuiButton)`
  &.MuiButton-root {
    min-width: 0;
    width: auto;
    text-transform: none;
  }
`
