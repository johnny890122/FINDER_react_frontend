import PropTypes from 'prop-types'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { color } from '../../styles'

export const MultipleNodeSteps = ({ nodeIdsToBeRemoved, completedNodeIds = [] }) => (
  <StyledNodesContainer>
    {nodeIdsToBeRemoved.map((nodeId, index) => (
      <StyledNodeAndLine key={nodeId}>
        {index !== 0 && <StyledLine />}
        <StyledNode $completed={completedNodeIds.includes(nodeId)}>{nodeId}</StyledNode>
      </StyledNodeAndLine>
    ))}
  </StyledNodesContainer>
)
MultipleNodeSteps.propTypes = {
  nodeIdsToBeRemoved: PropTypes.array.isRequired,
  completedNodeIds: PropTypes.array,
}
MultipleNodeSteps.defaultProps = {
  completedNodeIds: [],
}

const StyledNodesContainer = styled.div`
  display: flex;
`
const StyledNodeAndLine = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  margin: 0;
`
const dash = keyframes`
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 40px 0;
  }
`
const StyledLine = styled.div`
  background-color: transparent;
  height: 0.25rem;
  width: 2rem;
  background-image: linear-gradient(to right, ${color.neutralsColor0} 50%, transparent 50%);
  background-size: 20px 100%;
  animation: ${dash} 1s linear infinite;
`
const StyledNode = styled.div`
  border: 1px solid ${color.neutralsColor0};
  border-radius: 100rem;
  width: 2rem;
  height: 2rem;
  text-align: center;
  line-height: 2rem;
  background-color: ${props => props.$completed && color.primaryColor100};
`
