import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Dialog as MuiDialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'

import { Button } from './Button'

export const DialogTypes = {
  CONFIRM: 'CONFIRM',
  SIMPLE: 'SIMPLE',
}

export const Dialog = ({
  title,
  type,
  children,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
  disabled,
  ...dialogProps
}) => (
  <StyledDialog {...dialogProps}>
    <StyledDialogTitle>{title}</StyledDialogTitle>
    <DialogContent>{children}</DialogContent>
    {type === DialogTypes.CONFIRM && (
      <DialogActions>
        {onCancel && (
          <Button disabled={disabled} onClick={onCancel}>
            {cancelText}
          </Button>
        )}
        {onConfirm && (
          <Button disabled={disabled} onClick={onConfirm}>
            {confirmText}
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
  onConfirm: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf([null])]),
  onCancel: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf([null])]),
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  disabled: PropTypes.bool,
}
Dialog.defaultProps = {
  title: '',
  type: DialogTypes.SIMPLE,
  children: null,
  onConfirm: null,
  onCancel: null,
  confirmText: '確定',
  cancelText: '取消',
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
