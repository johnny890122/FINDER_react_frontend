import PropTypes from 'prop-types'
import { Dialog, DialogTypes } from '../../components'

export const QuitGameDialog = ({ open, onConfirm, onCancel }) => (
  <Dialog open={open} title="結束遊戲" type={DialogTypes.CONFIRM} onConfirm={onConfirm} onCancel={onCancel}>
    遊戲進度將不會被保存，請問確定要結束遊戲嗎？
  </Dialog>
)

QuitGameDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
}
QuitGameDialog.defaultProps = {
  onConfirm: () => {},
  onCancel: () => {},
}
