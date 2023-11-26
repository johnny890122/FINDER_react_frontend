import { useState } from 'react'
import styled from '@emotion/styled'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { Button } from '../../components/Button'
import { networksIntroduction } from './network.config'

export const NetworkSelectionPage = () => {
  const [expandedNetworkKey, setExpandedNetworkKey] = useState(null)

  const handleConfirm = () => {}

  return (
    <div>
      <div>請選擇您要破壞的網路</div>

      <StyledOptionsContainer>
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

      <Button onClick={handleConfirm}>開始遊玩</Button>
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
