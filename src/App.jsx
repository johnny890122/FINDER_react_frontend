import { Routes, Route } from 'react-router-dom'
import { DataContextProvider } from './DataContext'
import { Home } from './pages/Home'
import { TourIntroduction } from './pages/tour/TourIntroduction'
import { TourCalculation } from './pages/tour/TourCalculation'
import { TourTools } from './pages/tour/TourTools'
import { TourActions } from './pages/tour/TourActions'
import { NetworkIntroduction } from './pages/game/NetworkIntroduction'
import { GamePage } from './pages/game/Game'
import { Questionnaire } from './pages/questionnaire/Questionnaire'

const App = () => (
  <DataContextProvider>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tour/introduction" element={<TourIntroduction />} />
      <Route path="/tour/calculation" element={<TourCalculation />} />
      <Route path="/tour/tools" element={<TourTools />} />
      <Route path="/tour/actions" element={<TourActions />} />
      <Route path="/network-selection" element={<NetworkIntroduction />} />
      <Route path="/game" element={<GamePage />} />
      <Route path="/questionnaire" element={<Questionnaire />} />
    </Routes>
  </DataContextProvider>
)

export default App
