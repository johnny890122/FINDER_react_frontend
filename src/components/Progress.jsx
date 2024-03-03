import styled from '@emotion/styled'
import { CircularProgress } from '@mui/material'
import { color } from '../styles'

export const Progress = () => <StyledProgress />

const StyledProgress = styled(CircularProgress)`
  color: ${color.primaryColor500};
`
