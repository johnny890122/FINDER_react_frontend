import { Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Home } from './pages/Home'
import { Tour } from './pages/Tour'
import { NetworkSelectionPage } from './pages/game/NetworkSelection'
import { GamePage } from './pages/game/Game'

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tour" element={<Tour />} />
      <Route path="/network-selection" element={<NetworkSelectionPage />} />
      <Route path="/game" element={<GamePage />} />
    </Routes>
    <ReactQueryDevtools />
  </QueryClientProvider>
)

export default App
