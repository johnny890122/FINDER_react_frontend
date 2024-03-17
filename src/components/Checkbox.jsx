import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Checkbox as MuiCheckbox } from '@mui/material'
import { color } from '../styles'

export const CheckboxLevels = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
}

export const Checkbox = ({ level, ...props }) => <StyledCheckbox level={level} {...props} />
Checkbox.propTypes = {
  level: PropTypes.string,
}
Checkbox.defaultProps = {
  level: CheckboxLevels.PRIMARY,
}

const StyledCheckbox = styled(MuiCheckbox)`
  &.MuiCheckbox-root {
    color: ${props => (props.level === CheckboxLevels.PRIMARY ? color.primaryColor500 : 'white')};
  }
  &.Mui-checked {
    color: ${props => (props.level === CheckboxLevels.PRIMARY ? color.primaryColor500 : 'white')};
  }
`
