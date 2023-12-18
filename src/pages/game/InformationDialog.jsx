import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { getViewport } from '../../utils'
import { Dialog, Chip, HoverTooltip } from '../../components'
import { selectSelectedTool, selectRound } from './game.slice'
import { PayoffChart } from './PayoffChart'

export const InformationDialog = ({ open, onClose }) => {
  const selectedTool = useSelector(selectSelectedTool)
  const round = useSelector(selectRound)
  const { width: viewportWidth } = getViewport()

  return (
    <Dialog open={open} onClose={onClose}>
      <StyledContentContainer>
        <StyledRow>
          <Chip label="回合" />
          <div>{round}</div>
        </StyledRow>
        <StyledRow>
          <Chip label="本回合輔助指標" />
          <div>{selectedTool[selectedTool.length - 1]?.displayName ?? ''}</div>
          {selectedTool[selectedTool.length - 1]?.introduction && (
            <HoverTooltip tooltip={selectedTool[selectedTool.length - 1]?.introduction} />
          )}
        </StyledRow>
        {round > 1 && (
          <>
            <StyledRow>
              <Chip label="累積報酬" />
            </StyledRow>
            <PayoffChart width={viewportWidth - 6 * 14} height={200} />
          </>
        )}
      </StyledContentContainer>
    </Dialog>
  )
}

InformationDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
}
InformationDialog.defaultProps = {
  open: false,
  onClose: () => {},
}

const StyledContentContainer = styled.div`
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`
const StyledRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`
