import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Dialog, DialogTitle, DialogContent } from '@mui/material'

import { Tools } from '../../models/Tools'
import { selectGraphRanking } from './game.slice'
import { Button } from '../../components/Button'
import { PayoffChart } from './PayoffChart'

export const ToolSelectionDialog = ({ open = false, onConfirm = () => {} }) => {
  const graphRanking = useSelector(selectGraphRanking)

  return (
    <Dialog open={open}>
      <DialogTitle>選擇輔助指標</DialogTitle>
      <StyledDialogContent>
        <StyledOptionsContainer>
          {Object.keys(Tools).map(tool => (
            <Button onClick={onConfirm}>{tool}</Button>
          ))}
        </StyledOptionsContainer>
        {!!graphRanking && (
          <StyledChartContainer>
            <StyledChartTitle>累積報酬</StyledChartTitle>
            <PayoffChart />
          </StyledChartContainer>
        )}
      </StyledDialogContent>
    </Dialog>
  )
}

ToolSelectionDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
}

const StyledDialogContent = styled(DialogContent)`
  display: flex;
  align-items: center;
  gap: 1rem;
`
const StyledOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`
const StyledChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`
const StyledChartTitle = styled.span`
  padding-left: 2rem;
`
