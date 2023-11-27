import styled from '@emotion/styled'

import { ForceGraph } from './ForceGraph'

export const GamePage = () => (
  <StyledGamePageContainer>
    <StyledSessionInformationContainer>Game</StyledSessionInformationContainer>
    {/* <StyledQuitButton onClick={() => send('QUIT_GAME')}>Quit</StyledQuitButton> */}
    <ForceGraph />
  </StyledGamePageContainer>
)

const StyledGamePageContainer = styled.div`
  padding: 2rem 4rem;
  position: relative;
`
const StyledSessionInformationContainer = styled.div`
  font-size: 1.25rem;
  line-height: 2rem;
`
