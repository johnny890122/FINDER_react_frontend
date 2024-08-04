import styled from '@emotion/styled'
import { Card } from '@mui/material'

export const StyledCard = styled(Card)`
  &.MuiPaper-root {
    width: calc(400px + 4rem);
    padding: 1.5rem 3rem 1.5rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    @media screen and (max-width: 767px) {
      width: auto;
    }
  }
`
export const StyledRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`
export const StyledChipAndTooltip = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`
