import styled from '@emotion/styled'
import { Radio as MuiRadio } from '@mui/material'
import { color } from '../styles'

export const Radio = ({ ...props }) => <StyledRadio {...props} />

const StyledRadio = styled(MuiRadio)`
  &.Mui-checked {
    color: ${color.primaryColor500};
  }
`
