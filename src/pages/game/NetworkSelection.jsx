/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import styled from '@emotion/styled'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { API_ROOT } from '../../api.config'
import { Button } from '../../components/Button'
import { networksIntroduction } from './network.config'

export const NetworkSelectionPage = () => {
  const [expandedNetworkKey, setExpandedNetworkKey] = useState(null)
  const [isStartButtonClick, setIsStartButtonClick] = useState(false)

  const {
    data: networksAvailable,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['networkAvailable'],
    queryFn: async () => {
      const response = await fetch(`${API_ROOT}/networks`, {
        method: 'GET',
      })
      if (!response.ok) {
        throw new Error('Failed to fetch available networks')
      }
      return response.json()
    },
  })

  const { data: networkGraphData } = useQuery({
    queryKey: ['gameStart'],
    queryFn: async () => {
      const response = await fetch(`${API_ROOT}/game_start`, {
        method: 'POST',
        body: JSON.stringify({ chosen_network_id: networksIntroduction[expandedNetworkKey].code }),
      })
      if (!response.ok) {
        throw new Error('Failed to start a game')
      }
      return response.json()
    },
    enabled: !!isStartButtonClick,
  })

  // TODO: deal with isPending and isError UI
  // if (isPending) {
  //   return 'loading...'
  // }

  // if (isError) {
  //   return 'Faile to fetch available networks'
  // }

  return (
    <div>
      <div>請選擇您要破壞的網路</div>

      <StyledOptionsContainer>
        {/* TODO: use networksAvailable to map */}
        {Object.keys(networksIntroduction).map(networkKey => {
          const { displayName, introduction, node, link } = networksIntroduction[networkKey]
          return (
            <StyledOptionContainer>
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

      <Button onClick={() => setIsStartButtonClick(true)}>開始遊玩</Button>
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
