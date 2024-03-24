import { useSelector } from 'react-redux'

import { Chip, HoverTooltip } from '../../../components'
import { selectSelectedTool, selectRound } from '../game.slice'
import { PayoffChart } from '../PayoffChart'
import { StyledCard, StyledRow } from './styles'

export const GameInformationBlock = () => {
  const selectedTool = useSelector(selectSelectedTool)
  const round = useSelector(selectRound)

  return (
    <StyledCard>
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
