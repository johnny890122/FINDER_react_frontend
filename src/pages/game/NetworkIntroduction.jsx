import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { Accordion, AccordionDetails } from '@mui/material'

import { useContextData } from '../../DataContext'
import { color } from '../../styles'
import { Button, Progress, AccordionSummaryWithCheckbox } from '../../components'
import { getRandomNumber } from './game.utils'

export const NetworkIntroduction = () => {
  const navigate = useNavigate()
  const [expandedNetworkKey, setExpandedNetworkKey] = useState(null)
  const [checkedNetworkKeys, setCheckedNetworkKeys] = useState([])
  const excludeNetworkCodeNumbers = JSON.parse(sessionStorage.getItem('excludeNetworkCodeNumbers')) || []

  const contextData = useContextData()
  const {
    data: { networksAvailable = {} },
    loadingStates: { isNetworksApiLoading, isToolsApiLoading },
    errorStates: { isNetworksApiError, isToolsApiError },
  } = contextData

  if (isNetworksApiLoading || isToolsApiLoading) {
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
          const expanded = expandedNetworkKey === networkKey

          return (
            <StyledOptionContainer key={networkKey}>
              <StyledAccordion
                expanded={expanded}
                onChange={() => {
                  setExpandedNetworkKey(networkKey)
                  if (!checkedNetworkKeys.includes(networkKey)) {
                    setCheckedNetworkKeys(preCheckedNetworkKeys => [...preCheckedNetworkKeys, networkKey])
                  }
                }}
              >
                <AccordionSummaryWithCheckbox
                  title={displayName}
                  expanded={expanded}
                  checked={checkedNetworkKeys.includes(networkKey)}
                />
                <StyledAccordionDetails>
                  <div>背景：{introduction}</div>
                  <div>一個節點代表{node}</div>
                  <div>一條連線代表{link}</div>
                </StyledAccordionDetails>
              </StyledAccordion>
            </StyledOptionContainer>
          )
        })}
      </StyledOptionsContainer>

      <StyledButtonContainer>
        <StyledConfirmButton
          disabled={!expandedNetworkKey || checkedNetworkKeys.length !== Object.keys(networksAvailable).length}
          onClick={() => {
            const randomNetworkCodeNumber = getRandomNumber({
              totalCount: Object.keys(networksAvailable).length,
              excludeNumbers: excludeNetworkCodeNumbers,
            })
            const thisRoundNetworkCode = randomNetworkCodeNumber.toString()
            localStorage.setItem('thisRoundNetworkCode', thisRoundNetworkCode)
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
