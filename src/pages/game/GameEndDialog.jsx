import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import { color } from '../../styles'
import { selectPayoff } from './game.slice'
import { Dialog, DialogTypes } from '../../components'

export const GameEndDialog = ({ open = false, onConfirm, onCancel }) => {
  const payoff = useSelector(selectPayoff)
  const finalPayoff = payoff?.payoffHuman ? payoff.payoffHuman[payoff.payoffHuman.length - 1].toFixed(6) : 0

  return (
    <Dialog
      open={open}
      title="遊戲結束"
      type={DialogTypes.CONFIRM}
      onConfirm={onConfirm}
      onCancel={onCancel}
      confirmText="領取報酬"
      cancelText="再玩一局"
    >
      <StyledText>
        恭喜！您已成功破解了網絡，您此次遊戲的報酬為 <p className="highlight">{finalPayoff}</p>
      </StyledText>
      <StyledText>請選擇是否要領取報酬，或是再玩一局</StyledText>
    </Dialog>
  )
}
GameEndDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

const StyledText = styled.div`
  .highlight {
    color: ${color.primaryColor500};
  }
`
