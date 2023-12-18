import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Card } from '@mui/material'

import { Chip, HoverTooltip } from '../../components'
import { selectSelectedTool, selectRound } from './game.slice'
import { PayoffChart } from './PayoffChart'

export const InformationBlock = ({ visible }) => {
  const selectedTool = useSelector(selectSelectedTool)
  const round = useSelector(selectRound)

  return (
    <StyledCard visible={visible}>
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
          <PayoffChart />
        </>
      )}
    </StyledCard>
  )
}

InformationBlock.propTypes = {
  visible: PropTypes.bool,
}
InformationBlock.defaultProps = {
  visible: false,
}

const StyledCard = styled(Card)`
  &.MuiPaper-root {
    visibility: ${props => (props.visible ? 'visible' : 'hidden')};
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
const StyledRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`
