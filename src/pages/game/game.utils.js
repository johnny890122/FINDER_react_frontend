import { NodeColors } from '../../models/NodeColors'

export const getNodeColorByRanking = ({ ranking }) => NodeColors[ranking]

export const parsePayoffDataForChart = ({ payoffRawData }) => {
  if (!payoffRawData) return []
  const { payoffHuman, payoffFinder } = payoffRawData
  const payoff = []
  for (let i = 0; i < payoffFinder.length; i += 1) {
    payoff.push({ name: i + 1, payoffHuman: payoffHuman[i] ?? null, payoffFinder: payoffFinder[i] })
  }
  return payoff
}
