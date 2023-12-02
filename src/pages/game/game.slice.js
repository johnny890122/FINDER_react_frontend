/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { GameStages } from '../../models/GameStages'

const initialState = {
  gameStage: GameStages.NETWORK_SELECTION,
  networkCode: null,
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
  },
})

export const { updateGameStage, updateNetworkCode } = gameSlice.actions
export default gameSlice.reducer

export const selectGameStage = state => state.gameReducer.gameStage
export const selectNetworkCode = state => state.gameReducer.networkCode
