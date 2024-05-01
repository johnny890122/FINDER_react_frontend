import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { IconButton as MuiIconButton } from '@mui/material'
import { color } from '../styles'

export const IconButton = ({ children, ...props }) => <StyledMuiIconButton {...props}>{children}</StyledMuiIconButton>
IconButton.propTypes = {
  children: PropTypes.node.isRequired,
}

const StyledMuiIconButton = styled(MuiIconButton)`
  &.MuiIconButton-root {
    color: ${color.primaryColor500};
    border: 1px solid ${color.primaryColor500};
    border-radius: 0.125rem;
    width: 1.5rem;
    height: 1.5rem;
  }
`
