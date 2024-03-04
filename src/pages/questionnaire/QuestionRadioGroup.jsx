import PropTypes from 'prop-types'
import { RadioGroup, FormControlLabel } from '@mui/material'
import { Radio } from '../../components'

export const QuestionRadioGroup = ({ name, options, value, handleChange }) => (
  <RadioGroup row name={name} value={value} onChange={handleChange}>
    {options.map(({ value: optionValue, label: optionLabel }) => (
      <FormControlLabel key={optionValue} value={optionValue} label={optionLabel} control={<Radio />} />
    ))}
  </RadioGroup>
)
QuestionRadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.objectOf({ value: PropTypes.string, label: PropTypes.string })).isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
}
