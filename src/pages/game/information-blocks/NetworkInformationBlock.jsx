import { useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { selectNetworkCode, selectNetworksAvailable } from '../game.slice'
import { Chip } from '../../../components'
import { StyledCard, StyledRow } from './styles'

export const NetworkInformationBlock = () => {
  const selectedNetworkCode = useSelector(selectNetworkCode)
  const networksAvailable = useSelector(selectNetworksAvailable)

  const [selectedNetworkObject] = Object.values(networksAvailable).filter(
    network => network.code === selectedNetworkCode,
  )
  const { displayName = '', introduction = '' } = selectedNetworkObject

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
