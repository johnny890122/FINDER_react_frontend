import PropTypes from 'prop-types'
import { Button as MuiButton } from '@mui/material'
import styled from '@emotion/styled'

import { color } from '../styles'

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
    width: ${props => props.width ?? '10rem'};
    text-transform: none;
    background-color: ${color.primaryColor300};
    box-shadow: none;
    transition: none;
    border-radius: 2rem;
    border: 1px solid ${color.neutralsColor100};

    &:hover {
      background-color: ${color.primaryColor500};
      border: 1px solid ${color.neutralsColor100};
    }

    &:active {
      background-color: ${color.primaryColor500};
      border: 1px solid ${color.neutralsColor100};
    }

    &:disabled {
      background-color: ${color.neutralsColor100};
      border: 1px solid ${color.neutralsColor400};
      color: ${color.neutralsColor500};
    }
  }
`
