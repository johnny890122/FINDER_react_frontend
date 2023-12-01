import { configureStore } from '@reduxjs/toolkit'
import gameReducer from '../pages/game/game.slice'

export const store = configureStore({
  reducer: {
    gameReducer,
  },
})
