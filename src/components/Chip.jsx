import styled from '@emotion/styled'
import { Chip as MuiChip } from '@mui/material'

import { color } from '../styles'

export const Chip = ({ ...props }) => <StyledChip variant="outlined" {...props} />

const StyledChip = styled(MuiChip)`
  &.MuiChip-root {
    border-color: ${color.primaryColor400};
  }
`
