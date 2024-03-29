import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'

import { color } from '../../styles'
import { Button, Progress } from '../../components'
import { selectNetworksAvailable, updateNetworkCode } from './game.slice'
import { getRandomNumber } from './game.utils'

export const NetworkIntroduction = ({ isNetworksApiError, isToolsApiError, loading }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const networksAvailable = useSelector(selectNetworksAvailable)
  const [expandedNetworkKey, setExpandedNetworkKey] = useState(null)
  const excludeNetworkCodeNumbers = JSON.parse(sessionStorage.getItem('excludeNetworkCodeNumbers')) || []

  if (loading) {
    return (
      <StyledLoadingContainer>
        <Progress />
      </StyledLoadingContainer>
    )
  }

  if (isNetworksApiError || isToolsApiError) {
    return 'Failed to fetch available networks or tools'
  }

  return (
    <StyledContainer>
      <StyledPageTitle>請查看各網絡的介紹</StyledPageTitle>
      <StyledPageSubtitle>查看完各網絡的介紹後，按下開始遊玩，系統將會隨機挑選一個網絡給您</StyledPageSubtitle>

      <StyledOptionsContainer>
        {Object.keys(networksAvailable).map(networkKey => {
          const { displayName, introduction, node, link } = networksAvailable[networkKey]
          return (
            <StyledOptionContainer key={networkKey}>
              <StyledAccordion
                expanded={expandedNetworkKey === networkKey}
                onChange={() => setExpandedNetworkKey(networkKey)}
              >
                <AccordionSummary>{displayName}</AccordionSummary>
                <StyledAccordionDetails>
                  <div>背景：{introduction}</div>
                  <div>一個節點代表一個{node}</div>
                  <div>一條連線代表一個{link}</div>
                </StyledAccordionDetails>
              </StyledAccordion>
            </StyledOptionContainer>
          )
        })}
      </StyledOptionsContainer>

      <StyledButtonContainer>
        <StyledConfirmButton
          disabled={!expandedNetworkKey}
          onClick={() => {
            const randomNetworkCodeNumber = getRandomNumber({
              totalCount: Object.keys(networksAvailable).length,
              excludeNumbers: excludeNetworkCodeNumbers,
            })
            dispatch(updateNetworkCode(randomNetworkCodeNumber.toString()))
            sessionStorage.setItem(
              'excludeNetworkCodeNumbers',
              JSON.stringify([...excludeNetworkCodeNumbers, randomNetworkCodeNumber]),
            )
            navigate('/game')
          }}
        >
          開始遊玩
        </StyledConfirmButton>
      </StyledButtonContainer>
    </StyledContainer>
  )
}
NetworkIntroduction.propTypes = {
  isNetworksApiError: PropTypes.bool.isRequired,
  isToolsApiError: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
}

const StyledLoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 4rem;
  height: calc(100vh - 4rem);
  @media screen and (max-width: 767px) {
    padding: 2rem;
  }
`
const StyledPageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 0;
`
const StyledPageSubtitle = styled.h2`
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 2rem;
`
const StyledOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`
const StyledOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const StyledAccordion = styled(Accordion)`
  background-color: ${props => props.expanded && color.primaryColor400};
  color: ${props => props.expanded && color.neutralsColor0};
  & .MuiAccordionSummary-content {
    font-size: ${props => props.expanded && '1.25rem'};
  }
`
const StyledAccordionDetails = styled(AccordionDetails)`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`
const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`
const StyledConfirmButton = styled(Button)`
  margin-top: 2rem;
  @media screen and (max-width: 767px) {
    position: absolute;
    bottom: 2rem;
  }
`
