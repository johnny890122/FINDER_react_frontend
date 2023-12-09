import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import { Tools } from '../../models/Tools'
import { Button, Dialog, Chip } from '../../components'
import { selectGraphRanking } from './game.slice'
import { PayoffChart } from './PayoffChart'

export const ToolSelectionDialog = ({ open = false, onConfirm = () => {} }) => {
  const graphRanking = useSelector(selectGraphRanking)

  return (
    <Dialog open={open} title="選擇輔助指標">
      <StyledDialogContent>
        <StyledOptionsContainer>
          {Object.values(Tools).map(tool => (
            <Button key={tool} onClick={() => onConfirm(tool)}>
              {tool}
            </Button>
          ))}
        </StyledOptionsContainer>
        {!!graphRanking && (
          <StyledChartContainer>
            <Chip label="累積報酬" />
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

const StyledDialogContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`
const StyledOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
`
const StyledChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  padding-top: 0;
`
