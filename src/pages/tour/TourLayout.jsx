import PropTypes from 'prop-types'
import styled from '@emotion/styled'

export const TourLayout = ({ children, pageTitle }) => (
  <StyledContainer>
    <StyledPageTitle>{pageTitle}</StyledPageTitle>
    <StyledContentContainer>{children}</StyledContentContainer>
  </StyledContainer>
)

TourLayout.propTypes = {
  children: PropTypes.any,
  pageTitle: PropTypes.string,
}
TourLayout.defaultProps = {
  children: null,
  pageTitle: '',
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 4rem;
  height: calc(100vh - 4rem);
  position: relative;
`
const StyledPageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 400;
`
const StyledContentContainer = styled.div`
  line-height: 1.5rem;
  display: flex;
  gap: 1rem;
`
