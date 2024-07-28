import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Box, Paper, Slide } from '@mui/material'
import { color } from '../../styles'
import { MultipleNodeSteps } from './MultipleNodeSteps'

export const GuideBlocks = ({ step, config, completedNodeIds }) => (
  <StyledSlideContainer>
    {Object.values(config).map(({ id, text, nodeIdsToBeRemoved }, index) => (
      <Slide key={id} direction="up" in={step >= index} mountOnEnter unmountOnExit>
        <StyledGuideBlock>
          {text}
          {nodeIdsToBeRemoved.length > 1 && (
            <MultipleNodeSteps
              nodeIdsToBeRemoved={nodeIdsToBeRemoved}
              completedNodeIds={step === index ? completedNodeIds : []}
            />
          )}
        </StyledGuideBlock>
      </Slide>
    ))}
  </StyledSlideContainer>
)
GuideBlocks.propTypes = {
  step: PropTypes.number.isRequired,
  config: PropTypes.object.isRequired,
  completedNodeIds: PropTypes.array,
}
GuideBlocks.defaultProps = {
  completedNodeIds: [],
}

const StyledSlideContainer = styled(Box)`
  position: relative;
`
const StyledGuideBlock = styled(Paper)`
  padding: 1rem;
  margin-top: 0.5rem;
  background-color: ${color.primaryColor400};
  color: white;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`
