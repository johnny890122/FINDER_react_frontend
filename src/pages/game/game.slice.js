/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { GameStages } from '../../models/GameStages'

const initialState = {
  networkCode: null,
  realGraphData: null,
  graphRanking: null,
  selectedTool: [],
  payoff: null,
}

const gameSlice = createSlice({
  name: 'gameSlice',
  initialState,
  reducers: {
    updateNetworkCode: (state, action) => {
      state.networkCode = action.payload
    },

    updateRealGraphData: (state, action) => {
      state.realGraphData = action.payload
    },

    updateGraphRanking: (state, action) => {
      state.graphRanking = action.payload
    },

    updateSelectedTool: (state, action) => {
      state.selectedTool = [...state.selectedTool, action.payload]
    },

    updatePayoff: (state, action) => {
      state.payoff = {
        payoffHuman: [...(state?.payoff?.payoffHuman ?? []), action.payload.payoffHuman],
        payoffFinder: action.payload.payoffFinder,
        payoffInstantFinder: action.payload.payoffInstantFinder,
      }
    },

    resetGameData: state => {
      state.gameStage = GameStages.NETWORK_SELECTION
      state.networkCode = null
      state.graphRanking = null
      state.payoff = null
      state.realGraphData = null
    },
  },
})

export const {
  updateNetworkCode,
  updateRealGraphData,
  updateGraphRanking,
  updateSelectedTool,
  updatePayoff,
  resetGameData,
} = gameSlice.actions
export default gameSlice.reducer

export const selectNetworkCode = state => state.gameReducer.networkCode
export const selectRealGraphData = state => state.gameReducer.realGraphData
export const selectGraphRanking = state => state.gameReducer.graphRanking
export const selectSelectedTool = state => state.gameReducer.selectedTool
export const selectPayoff = state => state.gameReducer.payoff
export const selectRound = state => (state.gameReducer.payoff?.payoffHuman ?? []).length + 1
