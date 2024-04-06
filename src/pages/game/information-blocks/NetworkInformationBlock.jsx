import styled from '@emotion/styled'
import { useContextData } from '../../../DataContext'
import { Chip } from '../../../components'
import { StyledCard, StyledRow } from './styles'

export const NetworkInformationBlock = () => {
  const selectedNetworkCode = localStorage.getItem('thisRoundNetworkCode')

  const contextData = useContextData()
  const {
    data: { networksAvailable = {} },
  } = contextData

  const [selectedNetworkObject] = Object.values(networksAvailable).filter(
    network => network.code === selectedNetworkCode,
  )
  const { displayName = '', introduction = '' } = selectedNetworkObject ?? {}

  return (
    <StyledCard visible="true">
      <StyledRow>
        <Chip label="網絡" />
        <div>
          {displayName}
          <StyledIntroductionText>{introduction}</StyledIntroductionText>
        </div>
      </StyledRow>
    </StyledCard>
  )
}

const StyledIntroductionText = styled.div`
  font-size: 0.75rem;
`
