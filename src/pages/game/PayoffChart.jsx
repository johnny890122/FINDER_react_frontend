import { useState } from 'react'
import { useSelector } from 'react-redux'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend } from 'recharts'
import PropTypes from 'prop-types'

import { color } from '../../styles'
import { selectPayoff } from './game.slice'
import { parsePayoffDataForChart } from './game.utils'

export const PayoffChart = ({ width, height }) => {
  const payoffRawData = useSelector(selectPayoff)
  const data = parsePayoffDataForChart({ payoffRawData })

  const [opacity, setOpacity] = useState({ payoffFinder: 1, payoffInstantFinder: 1, payoffHuman: 1 })

  const handleMouseEnter = ({ dataKey }) => {
    setOpacity(op => Object.keys(op).reduce((acc, key) => ({ ...acc, [key]: key === dataKey ? 1 : 0 }), {}))
  }

  const handleMouseLeave = () => {
    setOpacity(op => Object.keys(op).reduce((acc, key) => ({ ...acc, [key]: 1 }), {}))
  }

  return (
    <LineChart width={width} height={height} data={data} overflow="visible">
      <Line
        name="AI FINDER 的成績"
        type="monotone"
        dataKey="payoffFinder"
        stroke={color.neutralsColor600}
        strokeOpacity={opacity.payoffFinder}
      />
      <Line
        name="後續皆遵守 AI FINDER 的成績"
        type="monotone"
        dataKey="payoffInstantFinder"
        stroke={color.neutralsColor800}
        strokeOpacity={opacity.payoffInstantFinder}
      />
      <Line
        name="您的成績"
        type="monotone"
        dataKey="payoffHuman"
        stroke={color.primaryColor600}
        strokeOpacity={opacity.payoffHuman}
      />
      <CartesianGrid stroke={color.neutralsColor400} />
      <XAxis dataKey="name" label={{ value: '回合', position: 'insideBottom', offset: -15 }} interval={0} />
      <YAxis
        type="number"
        domain={[0, 1]}
        label={{ value: '報酬', angle: -90, position: 'insideLeft', offset: 5 }}
        tickFormatter={value => value.toFixed(2)}
      />
      <Legend verticalAlign="top" height={45} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
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
