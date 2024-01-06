import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'

import { color } from '../../styles'
import { Button } from '../../components'
import { selectNetworksAvailable, updateNetworkCode } from './game.slice'

export const NetworkSelectionPage = ({
  isNetworksApiPending,
  isNetworksApiError,
  isToolsApiPending,
  isToolsApiError,
}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const networksAvailable = useSelector(selectNetworksAvailable)
  const [expandedNetworkKey, setExpandedNetworkKey] = useState(null)

  if (isNetworksApiPending || isToolsApiPending) {
    return 'loading...'
  }

  if (isNetworksApiError || isToolsApiError) {
    return 'Failed to fetch available networks or tools'
  }

  return (
    <StyledContainer>
      <StyledPageTitle>請選擇您要破壞的網絡</StyledPageTitle>

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
            dispatch(updateNetworkCode(networksAvailable[expandedNetworkKey].code))
            navigate('/game')
          }}
        >
          開始遊玩
        </StyledConfirmButton>
      </StyledButtonContainer>
    </StyledContainer>
  )
}
NetworkSelectionPage.propTypes = {
  isNetworksApiPending: PropTypes.bool.isRequired,
  isNetworksApiError: PropTypes.bool.isRequired,
  isToolsApiPending: PropTypes.bool.isRequired,
  isToolsApiError: PropTypes.bool.isRequired,
}

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
