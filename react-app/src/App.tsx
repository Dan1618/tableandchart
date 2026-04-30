import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import CityNotes from './components/CityNotes/CityNotes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cities/:cityId" element={<CityNotes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
