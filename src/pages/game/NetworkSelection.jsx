import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'

import { API_ROOT } from '../../api.config'
import { GameStages } from '../../models/GameStages'
import { color } from '../../styles'
import { Button } from '../../components'
import {
  selectNetworksAvailable,
  updateToolsAvailable,
  updateGameStage,
  updateNetworkCode,
  updateNetworksAvailable,
} from './game.slice'

export const NetworkSelectionPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const networksAvailable = useSelector(selectNetworksAvailable)
  const [expandedNetworkKey, setExpandedNetworkKey] = useState(null)

  const {
    data: networksAvailableResponse,
    isPending: isNetworksApiPending,
    isError: isNetworksApiError,
  } = useQuery({
    queryKey: ['networkAvailable'],
    queryFn: async () => {
      const response = await fetch(`${API_ROOT}/networks/`, {
        method: 'GET',
      })
      if (!response.ok) {
        throw new Error('Failed to fetch available networks')
      }
      dispatch(updateGameStage(GameStages.GRAPH))

      return response.json()
    },
  })

  const {
    data: toolsAvailableResponse,
    isPending: isToolsApiPending,
    isError: isToolsApiError,
  } = useQuery({
    queryKey: ['toolsAvailable'],
    queryFn: async () => {
      const response = await fetch(`${API_ROOT}/tools/`, {
        method: 'GET',
      })
      if (!response.ok) {
        throw new Error('Failed to fetch available tools')
      }
      return response.json()
    },
  })

  if (isNetworksApiPending || isToolsApiPending) {
    return 'loading...'
  }

  if (isNetworksApiError || isToolsApiError) {
    return 'Failed to fetch available networks or tools'
  }

  if (networksAvailableResponse) {
    dispatch(updateNetworksAvailable(networksAvailableResponse))
  }
  if (toolsAvailableResponse) {
    dispatch(updateToolsAvailable(toolsAvailableResponse))
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

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 4rem;
  height: calc(100vh - 4rem);
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
`
