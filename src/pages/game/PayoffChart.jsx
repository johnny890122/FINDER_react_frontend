import { useSelector } from 'react-redux'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend } from 'recharts'

import { selectPayoff } from './game.slice'
import { parsePayoffDataForChart } from './game.utils'

export const PayoffChart = () => {
  const payoffRawData = useSelector(selectPayoff)
  const data = parsePayoffDataForChart({ payoffRawData })

  return (
    <LineChart width={400} height={300} data={data}>
      <Line name="Human Payoff" type="monotone" dataKey="payoffHuman" stroke="#8884d8" />
      <Line name="FINDER Payoff" type="monotone" dataKey="payoffFinder" stroke="#82ca9d" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" label={{ value: '回合', position: 'insideBottom', offset: 0 }} scale="band" />
      <YAxis label={{ value: '報酬', angle: -90, position: 'insideLeft' }} />
      <Legend verticalAlign="top" height={36} />
    </LineChart>
  )
}
