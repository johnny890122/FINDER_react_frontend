import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Box, Paper, Slide } from '@mui/material'
import { color } from '../../styles'

export const GuideBlocks = ({ step, config }) => (
  <StyledSlideContainer>
    {Object.values(config).map(({ id, text }, index) => (
      <Slide key={id} direction="up" in={step >= index} mountOnEnter unmountOnExit>
        <StyledGuideBlock>{text}</StyledGuideBlock>
      </Slide>
    ))}
  </StyledSlideContainer>
)
GuideBlocks.propTypes = {
  step: PropTypes.number.isRequired,
  config: PropTypes.object.isRequired,
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
