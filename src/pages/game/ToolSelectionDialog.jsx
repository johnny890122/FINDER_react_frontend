import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Dialog, DialogTitle } from '@mui/material'

import { Tools } from '../../models/Tools'
import { Button } from '../../components/Button'

export const ToolSelectionDialog = ({ open = false, onConfirm = () => {} }) => {
  const title = '選擇輔助指標'

  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <StyledOptionsContainer>
        {Object.keys(Tools).map(tool => (
          <Button onClick={onConfirm}>{tool}</Button>
        ))}
      </StyledOptionsContainer>
    </Dialog>
  )
}

ToolSelectionDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
}

const StyledOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`
