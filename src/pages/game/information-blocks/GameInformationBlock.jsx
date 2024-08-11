import { useSelector } from 'react-redux'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

import { Chip, HoverTooltip } from '../../../components'
import { selectSelectedTool, selectRound, selectPayoff } from '../game.slice'
import { parsePayoffDataForChart } from '../game.utils'
import { PayoffChart } from '../PayoffChart'
import { StyledCard, StyledRow, StyledChipAndTooltip } from './styles'
import { ToolsInformation } from './ToolsInformation'

export const GameInformationBlock = ({ shuffledToolsAvailable }) => {
  const selectedTool = useSelector(selectSelectedTool)
  const round = useSelector(selectRound)
  const payoffRawData = useSelector(selectPayoff)
  const data = parsePayoffDataForChart({ payoffRawData })

  return (
    <StyledCard>
      <StyledRow>
        <Chip label="回合" />
        <div>{round}</div>
      </StyledRow>
      <ToolsInformation selectedTool={selectedTool} shuffledToolsAvailable={shuffledToolsAvailable} />
      {round > 1 && (
        <>
          <StyledChipAndTooltip>
            <Chip label="累積分數(滿分為100分)" />
            <HoverTooltip tooltip="AI Finder的成績，是指若您完全遵守 AI FINDER 的策略，您可獲得的分數。後續皆遵守 AI FINDER 的成績是指若您從本回合開始，皆遵守 AI FINDER 的策略，您可獲得的分數。" />
          </StyledChipAndTooltip>
          <StyledPayoffDescription>
            <div>這回合，您得到 {data[round - 2].payoffHuman.toFixed(6)} 分</div>
            <div>下圖顯示您目前的累計分數。我們同時也給您參考，若是您採用AI的建議的話，可以獲得的分數。</div>
          </StyledPayoffDescription>
          <PayoffChart data={data} />
        </>
      )}
    </StyledCard>
  )
}
GameInformationBlock.propTypes = {
  shuffledToolsAvailable: PropTypes.array.isRequired,
}

const StyledPayoffDescription = styled.div`
  margin-left: 1rem;
  font-size: 0.875rem;
`
