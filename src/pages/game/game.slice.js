/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { GameStages } from '../../models/GameStages'

const initialState = {
  gameStage: GameStages.NETWORK_SELECTION,
  networkCode: null,
  graphData: null,
  graphRanking: null,
  selectedTool: [],
  payoff: null,
}

const gameSlice = createSlice({
  name: 'gameSlice',
  initialState,
  reducers: {
    updateGameStage: (state, action) => {
      state.gameStage = action.payload
    },

    updateNetworkCode: (state, action) => {
      state.networkCode = action.payload
    },

    updateGraphData: (state, action) => {
      state.graphData = action.payload
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
      }
    },

    resetGameData: state => {
      state.gameStage = GameStages.NETWORK_SELECTION
      state.networkCode = null
      state.graphData = null
      state.graphRanking = null
      state.payoff = null
    },
  },
})

export const {
  updateGameStage,
  updateNetworkCode,
  updateGraphData,
  updateGraphRanking,
  updateSelectedTool,
  updatePayoff,
  resetGameData,
} = gameSlice.actions
export default gameSlice.reducer

export const selectGameStage = state => state.gameReducer.gameStage
export const selectNetworkCode = state => state.gameReducer.networkCode
export const selectGraphData = state => state.gameReducer.graphData
export const selectGraphRanking = state => state.gameReducer.graphRanking
export const selectSelectedTool = state => state.gameReducer.selectedTool
export const selectPayoff = state => state.gameReducer.payoff
