import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { TextField } from '@mui/material'
import { color } from '../styles'

export const Input = ({ width, ...props }) => <StyledInput width={width} {...props} />
Input.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, null]),
}
Input.defaultProps = {
  width: null,
}

const StyledInput = styled(TextField)`
  & .MuiInputBase-input {
    width: ${props => props.width};
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: ${color.primaryColor500};
    }
  }
`
