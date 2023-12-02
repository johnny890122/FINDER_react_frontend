import { NodeColors } from '../../models/NodeColors'

export const getNodeColorByRanking = ({ ranking }) => NodeColors[ranking]
