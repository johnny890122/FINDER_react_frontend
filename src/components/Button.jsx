import PropTypes from 'prop-types'
import { Button as MuiButton } from '@mui/material'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

import { color } from '../styles'

export const Button = ({ children, level = 'primary', ...props }) => (
  <StyledButton variant={level === 'primary' ? 'contained' : 'outlined'} level={level} {...props}>
    {children}
  </StyledButton>
)

Button.propTypes = {
  children: PropTypes.node.isRequired,
  level: PropTypes.string,
}
Button.defaultProps = {
  level: 'primary',
}

const StyledButton = styled(MuiButton)`
  &.MuiButton-root {
    min-width: 0;
    width: ${props => props.width ?? 'fit-content'};
    text-transform: none;
    background-color: ${color.primaryColor300};
    box-shadow: none;
    transition: none;
    border-radius: 2rem;
    border: 1px solid ${color.neutralsColor100};

    ${props => {
      switch (props.level) {
        case 'primary':
          return css`
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
          `
        case 'secondary':
          return css`
            color: ${color.primaryColor500};
            background-color: ${color.neutralsColor0};
            border: 1px solid ${color.primaryColor500};
            &:hover {
              background-color: ${color.primaryColor100};
              border: 1px solid ${color.primaryColor500};
            }

            &:active {
              background-color: ${color.primaryColor300};
              border: 1px solid ${color.primaryColor500};
            }
          `
        default:
          return css`
            background-color: ${color.primaryColor300};
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
          `
      }
    }}
  }
`
