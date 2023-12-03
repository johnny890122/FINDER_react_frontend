/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { GameStages } from '../../models/GameStages'

const initialState = {
  gameStage: GameStages.NETWORK_SELECTION,
  networkCode: null,
  graphData: null,
  graphRanking: null,
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

    resetGameData: state => {
      state.gameStage = GameStages.NETWORK_SELECTION
      state.networkCode = null
    },
  },
})

export const { updateGameStage, updateNetworkCode, updateGraphData, updateGraphRanking, resetGameData } =
  gameSlice.actions
export default gameSlice.reducer

export const selectGameStage = state => state.gameReducer.gameStage
export const selectNetworkCode = state => state.gameReducer.networkCode
export const selectGraphData = state => state.gameReducer.graphData
export const selectGraphRanking = state => state.gameReducer.graphRanking
