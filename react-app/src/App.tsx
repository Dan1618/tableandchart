import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import CityNotes from './components/CityNotes/CityNotes'

function App() {
  // todo: fetch data here, sort and pass down
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
