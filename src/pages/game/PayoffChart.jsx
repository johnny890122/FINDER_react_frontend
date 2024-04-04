import { useSelector } from 'react-redux'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend } from 'recharts'
import PropTypes from 'prop-types'

import { color } from '../../styles'
import { selectPayoff } from './game.slice'
import { parsePayoffDataForChart } from './game.utils'

export const PayoffChart = ({ width, height }) => {
  const payoffRawData = useSelector(selectPayoff)
  const data = parsePayoffDataForChart({ payoffRawData })

  return (
    <LineChart width={width} height={height} data={data} overflow="visible">
      <Line name="AI FINDER 的成績" type="monotone" dataKey="payoffFinder" stroke={color.neutralsColor600} />
      <Line name="一直遵守 AI FINDER 的成績" type="monotone" dataKey="payoffInstantFinder" stroke={color.neutralsColor800} />
      <Line name="您的成績" type="monotone" dataKey="payoffHuman" stroke={color.primaryColor600} />
      <CartesianGrid stroke={color.neutralsColor400} />
      <XAxis dataKey="name" label={{ value: '回合', position: 'insideBottom', offset: -15 }} interval={0} />
      <YAxis
        type="number"
        domain={[0, 1]}
        label={{ value: '報酬', angle: -90, position: 'insideLeft', offset: 5 }}
        tickFormatter={value => value.toFixed(2)}
      />
      <Legend verticalAlign="top" height={45} />
    </LineChart>
  )
}

PayoffChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}
PayoffChart.defaultProps = {
  width: 400,
  height: 300,
}
