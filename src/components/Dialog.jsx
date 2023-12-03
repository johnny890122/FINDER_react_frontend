import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Dialog as MuiDialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'

import { Button } from './Button'

export const DialogTypes = {
  CONFIRM: 'CONFIRM',
  SIMPLE: 'SIMPLE',
}

export const Dialog = ({ title, type, children, onConfirm, onCancel, ...dialogProps }) => (
  <StyledDialog {...dialogProps}>
    <StyledDialogTitle>{title}</StyledDialogTitle>
    <DialogContent>{children}</DialogContent>
    {type === DialogTypes.CONFIRM && (
      <DialogActions>
        <Button width="5rem" onClick={onCancel}>
          取消
        </Button>
        <Button width="5rem" onClick={onConfirm}>
          確認
        </Button>
      </DialogActions>
    )}
  </StyledDialog>
)

Dialog.propTypes = {
  title: PropTypes.string,
  type: PropTypes.oneOf(Object.keys(DialogTypes)),
  children: PropTypes.any,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
}
Dialog.defaultProps = {
  title: '',
  type: DialogTypes.SIMPLE,
  children: null,
  onConfirm: () => {},
  onCancel: () => {},
}

const StyledDialog = styled(MuiDialog)`
  & .MuiDialog-paper {
    min-width: 20rem;
  }
`
const StyledDialogTitle = styled(DialogTitle)`
  &.MuiDialogTitle-root {
    font-size: 1.25rem;
  }
`
