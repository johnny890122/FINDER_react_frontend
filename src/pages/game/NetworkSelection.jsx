import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'

import { API_ROOT } from '../../api.config'
import { GameStages } from '../../models/GameStages'
import { Button } from '../../components/Button'
import { updateGameStage, updateNetworkCode } from './game.slice'

export const NetworkSelectionPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [expandedNetworkKey, setExpandedNetworkKey] = useState(null)

  const {
    data: networksAvailable,
    isPending,
    isError,
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

  if (isPending) {
    return 'loading...'
  }

  if (isError) {
    return 'Failed to fetch available networks'
  }

  return (
    <div>
      <div>請選擇您要破壞的網路</div>

      <StyledOptionsContainer>
        {Object.keys(networksAvailable).map(networkKey => {
          const { displayName, introduction, node, link } = networksAvailable[networkKey]
          return (
            <StyledOptionContainer key={networkKey}>
              <Accordion
                expanded={expandedNetworkKey === networkKey}
                onChange={() => setExpandedNetworkKey(networkKey)}
              >
                <AccordionSummary>{displayName}</AccordionSummary>
                <StyledAccordionDetails>
                  <div>背景：{introduction}</div>
                  <div>一個節點代表一個{node}</div>
                  <div>一條連線代表一個{link}</div>
                </StyledAccordionDetails>
              </Accordion>
            </StyledOptionContainer>
          )
        })}
      </StyledOptionsContainer>

      <Button
        disabled={!expandedNetworkKey}
        onClick={() => {
          dispatch(updateNetworkCode(networksAvailable[expandedNetworkKey].code))
          navigate('/game')
        }}
      >
        開始遊玩
      </Button>
    </div>
  )
}

const StyledOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const StyledOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const StyledAccordionDetails = styled(AccordionDetails)`
  display: flex;
  flex-direction: column;
`
