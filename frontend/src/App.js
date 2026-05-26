import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Generator from './pages/Generator'
import Insights from './pages/Insights'
import History from './pages/History'
import './App.css'

function App() { 
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Generator</Link>
        <Link to="/insights">Insights</Link>
        <Link to="/history">History</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Generator />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App