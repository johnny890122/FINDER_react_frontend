import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Box, Paper, Slide } from '@mui/material'
import { color } from '../../styles'
import { nodeIdsToBeRemoved } from './tourActions.config'

export const GuideBlocks = ({ step }) => (
  <StyledSlideContainer>
    {Object.values(nodeIdsToBeRemoved).map(({ id: nodeId }, index) => (
      <Slide key={nodeId} direction="up" in={step >= index} mountOnEnter unmountOnExit>
        <StyledGuideBlock>
          任務 {index + 1}：移除編號 #{nodeId} 的點
        </StyledGuideBlock>
      </Slide>
    ))}
  </StyledSlideContainer>
)
GuideBlocks.propTypes = {
  step: PropTypes.number.isRequired,
}

const StyledSlideContainer = styled(Box)`
  position: relative;
`
const StyledGuideBlock = styled(Paper)`
  padding: 1rem;
  margin-top: 0.5rem;
  background-color: ${color.primaryColor400};
  color: white;
`
