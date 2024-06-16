import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import EastIcon from '@mui/icons-material/East'
import { color } from '../../styles'
import { Dialog, DialogTypes } from '../../components'
import { tourActionsStepsConfig } from './tourActions.config'

export const HintDialog = ({ open, onConfirm, step }) => (
  <Dialog
    open={open}
    title={`成功移除編號為 #${tourActionsStepsConfig[step]?.nodeIdToBeRemoved} 的點！`}
    type={DialogTypes.CONFIRM}
    confirmText={step === 2 ? '準備好了，開始遊戲！' : '繼續移除下一個點'}
    onConfirm={onConfirm}
  >
    您已成功移除編號為 #{tourActionsStepsConfig[step]?.nodeIdToBeRemoved} 的點，您可以觀察到它從網絡中消失了！
    <StyledImagesContainer>
      <StyledImage src={tourActionsStepsConfig[step]?.beforeImage} alt="before" />
      <EastIcon />
      <StyledImage src={tourActionsStepsConfig[step]?.afterImage} alt="after" />
    </StyledImagesContainer>
    {step === 2 && '現在您應該已經熟悉遊戲的操作了，請準備開始遊玩吧！'}
  </Dialog>
)
HintDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
}

const StyledImagesContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
`
const StyledImage = styled.img`
  border: 1px solid ${color.primaryColor400};
`
