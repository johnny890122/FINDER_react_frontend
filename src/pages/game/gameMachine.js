import { createMachine, assign } from 'xstate'

export const GameStages = {
  NETWORK_SELECTION: 'NETWORK_SELECTION',
  GRAPH: 'GRAPH',
}

export const gameMachine = createMachine({
  context: {
    stage: GameStages.NETWORK_SELECTION,
    graph: null,
  },
  on: {
    START_GAME: {
      actions: assign({
        stage: GameStages.GRAPH,
        graph: (_, event) => event.graph,
      }),
    },
    QUIT_GAME: {
      actions: assign({
        stage: GameStages.NETWORK_SELECTION,
        graph: null,
      }),
    },
  },
})
