import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Dialog as MuiDialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'

import { Button } from './Button'

export const DialogTypes = {
  CONFIRM: 'CONFIRM',
  SIMPLE: 'SIMPLE',
}

export const Dialog = ({ title, type, children, onConfirm, onCancel, disabled, ...dialogProps }) => (
  <StyledDialog {...dialogProps}>
    <StyledDialogTitle>{title}</StyledDialogTitle>
    <DialogContent>{children}</DialogContent>
    {type === DialogTypes.CONFIRM && (
      <DialogActions>
        {onCancel && (
          <Button width="5rem" disabled={disabled} onClick={onCancel}>
            取消
          </Button>
        )}
        {onConfirm && (
          <Button width="5rem" disabled={disabled} onClick={onConfirm}>
            確認
          </Button>
        )}
      </DialogActions>
    )}
  </StyledDialog>
)

Dialog.propTypes = {
  title: PropTypes.string,
  type: PropTypes.oneOf(Object.keys(DialogTypes)),
  children: PropTypes.any,
  onConfirm: PropTypes.oneOf([PropTypes.func, null]),
  onCancel: PropTypes.oneOf([PropTypes.func, null]),
  disabled: PropTypes.bool,
}
Dialog.defaultProps = {
  title: '',
  type: DialogTypes.SIMPLE,
  children: null,
  onConfirm: null,
  onCancel: null,
  disabled: false,
}

const StyledDialog = styled(MuiDialog)`
  & .MuiDialog-paper {
    min-width: 20rem;
    max-width: 50rem;
  }
`
const StyledDialogTitle = styled(DialogTitle)`
  &.MuiDialogTitle-root {
    font-size: 1.25rem;
  }
`
