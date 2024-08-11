/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { GameStages } from '../../models/GameStages'

const initialState = {
  realGraphData: null,
  graphRanking: null,
  selectedTool: [],
  payoff: null,
  stepStatus: '',
}

const gameSlice = createSlice({
  name: 'gameSlice',
  initialState,
  reducers: {
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

    updateStepStatus: (state, action) => {
      state.stepStatus = action.payload
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
  updateRealGraphData,
  updateGraphRanking,
  updateSelectedTool,
  updatePayoff,
  resetGameData,
  updateStepStatus,
} = gameSlice.actions
export default gameSlice.reducer

export const selectRealGraphData = state => state.gameReducer.realGraphData
export const selectGraphRanking = state => state.gameReducer.graphRanking
export const selectSelectedTool = state => state.gameReducer.selectedTool
export const selectPayoff = state => state.gameReducer.payoff
export const selectRound = state => (state.gameReducer.payoff?.payoffHuman ?? []).length + 1
export const selectStepStatus = state => state.gameReducer.stepStatus
