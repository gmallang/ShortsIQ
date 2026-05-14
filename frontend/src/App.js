import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Generator from './pages/Generator'
import Insights from './pages/Insights'
import History from './pages/History'

function App() { return (
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Generator />} />
    <Route path="/insights" element={<Insights />} />
    <Route path="/history" element={<History />} />
  </Routes>
</BrowserRouter>
) }
export default App