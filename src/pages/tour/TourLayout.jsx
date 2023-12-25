import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Button } from '../../components/Button'

export const TourLayout = ({ children, pageTitle, previousPagePath, nextPagePath }) => (
  <StyledContainer>
    <StyledPageTitle>{pageTitle}</StyledPageTitle>
    <StyledContentContainer>{children}</StyledContentContainer>
    <StyledButtonsContainer>
      {nextPagePath ? (
        <StyledLink to={nextPagePath}>
          <Button>Next</Button>
        </StyledLink>
      ) : (
        <StyledLink to="/network-selection">
          <Button>Start Game!</Button>
        </StyledLink>
      )}
      {previousPagePath && (
        <StyledLink to={previousPagePath}>
          <Button>Back</Button>
        </StyledLink>
      )}
    </StyledButtonsContainer>
  </StyledContainer>
)

TourLayout.propTypes = {
  children: PropTypes.any,
  pageTitle: PropTypes.string,
  previousPagePath: PropTypes.string,
  nextPagePath: PropTypes.string,
}
TourLayout.defaultProps = {
  children: null,
  pageTitle: '',
  previousPagePath: '',
  nextPagePath: '',
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
`
const StyledButtonsContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  position: absolute;
  bottom: 30%;
  width: calc(100vw - 8rem);
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`
