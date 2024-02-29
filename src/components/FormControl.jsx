import PropTypes from 'prop-types'
import styled from '@emotion/styled'

export const FormControl = ({ title, children }) => (
  <StyledContainer>
    <StyledTitle>{title}</StyledTitle>
    {children}
  </StyledContainer>
)

FormControl.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
`
const StyledTitle = styled.p`
  font-weight: 400;
  font-size: 1.125rem;
  margin: 0;
`
