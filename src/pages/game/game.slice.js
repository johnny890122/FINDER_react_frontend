/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { GameStages } from '../../models/GameStages'

const initialState = {
  networksAvailable: {},
  toolsAvailable: {},

  gameStage: GameStages.NETWORK_SELECTION,
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
    updateNetworksAvailable: (state, action) => {
      state.networksAvailable = action.payload
    },

    updateToolsAvailable: (state, action) => {
      state.toolsAvailable = action.payload
    },

    updateGameStage: (state, action) => {
      state.gameStage = action.payload
    },

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
  updateNetworksAvailable,
  updateToolsAvailable,

  updateGameStage,
  updateNetworkCode,
  updateRealGraphData,
  updateGraphRanking,
  updateSelectedTool,
  updatePayoff,
  resetGameData,
} = gameSlice.actions
export default gameSlice.reducer

export const selectNetworksAvailable = state => state.gameReducer.networksAvailable
export const selectToolsAvailable = state => state.gameReducer.toolsAvailable

export const selectGameStage = state => state.gameReducer.gameStage
export const selectNetworkCode = state => state.gameReducer.networkCode
export const selectRealGraphData = state => state.gameReducer.realGraphData
export const selectGraphRanking = state => state.gameReducer.graphRanking
export const selectSelectedTool = state => state.gameReducer.selectedTool
export const selectPayoff = state => state.gameReducer.payoff
export const selectRound = state => (state.gameReducer.payoff?.payoffHuman ?? []).length + 1
