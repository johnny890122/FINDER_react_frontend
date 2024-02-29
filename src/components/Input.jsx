import styled from '@emotion/styled'
import { TextField } from '@mui/material'
import { color } from '../styles'

export const Input = ({ ...props }) => <StyledInput {...props} />

const StyledInput = styled(TextField)`
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: ${color.primaryColor500};
    }
  }
`
