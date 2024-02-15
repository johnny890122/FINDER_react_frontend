import { Routes, Route } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'

import { API_ROOT } from './api.config'
import { GameStages } from './models/GameStages'
import { updateNetworksAvailable, updateToolsAvailable, updateGameStage } from './pages/game/game.slice'

import { Home } from './pages/Home'
import { TourIntroduction } from './pages/tour/TourIntroduction'
import { TourTools } from './pages/tour/TourTools'
import { TourActions } from './pages/tour/TourActions'
import { NetworkIntroduction } from './pages/game/NetworkIntroduction'
import { GamePage } from './pages/game/Game'

const App = () => {
  const dispatch = useDispatch()

  const {
    data: networksAvailableResponse,
    isPending: isNetworksApiPending,
    isError: isNetworksApiError,
  } = useQuery({
    queryKey: ['networkAvailable'],
    queryFn: async () => {
      const response = await fetch(`${API_ROOT}/networks/`, {
        method: 'GET',
      })
      if (!response.ok) {
        throw new Error('Failed to fetch available networks')
      }
      dispatch(updateGameStage(GameStages.GRAPH))

      return response.json()
    },
  })

  const {
    data: toolsAvailableResponse,
    isPending: isToolsApiPending,
    isError: isToolsApiError,
  } = useQuery({
    queryKey: ['toolsAvailable'],
    queryFn: async () => {
      const response = await fetch(`${API_ROOT}/tools/`, {
        method: 'GET',
      })
      if (!response.ok) {
        throw new Error('Failed to fetch available tools')
      }
      return response.json()
    },
  })

  if (networksAvailableResponse) {
    dispatch(updateNetworksAvailable(networksAvailableResponse))
  }
  if (toolsAvailableResponse) {
    dispatch(updateToolsAvailable(toolsAvailableResponse))
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tour/introduction" element={<TourIntroduction />} />
      <Route path="/tour/tools" element={<TourTools />} />
      <Route path="/tour/actions" element={<TourActions />} />
      <Route
        path="/network-selection"
        element={
          <NetworkIntroduction
            isNetworksApiPending={isNetworksApiPending}
            isNetworksApiError={isNetworksApiError}
            isToolsApiPending={isToolsApiPending}
            isToolsApiError={isToolsApiError}
          />
        }
      />
      <Route path="/game" element={<GamePage />} />
    </Routes>
  )
}

export default App
