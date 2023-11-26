import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Tour } from './pages/Tour'
import { GameHome } from './pages/game'
import { NetworkSelectionPage } from './pages/game/NetworkSelection'

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/tour" element={<Tour />} />
    <Route path="/game" element={<GameHome />} />
    <Route path="/network-selection" element={<NetworkSelectionPage />} />
  </Routes>
)

export default App
