import PropTypes from 'prop-types'
import { RadioGroup, FormControlLabel } from '@mui/material'
import { Radio } from '../../components'

export const QuestionRadioGroup = ({ options }) => (
  <RadioGroup row>
    {options.map(({ value, label }) => (
      <FormControlLabel value={value} label={label} control={<Radio />} />
    ))}
  </RadioGroup>
)
QuestionRadioGroup.propTypes = {
  options: PropTypes.arrayOf(PropTypes.objectOf({ value: PropTypes.string, label: PropTypes.string })).isRequired,
}
