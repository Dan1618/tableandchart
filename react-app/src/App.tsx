import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import CityNotes from './components/CityNotes/CityNotes'
import { HomeProvider } from './context/HomeContext'

function App() {
  return (
    <BrowserRouter>
      <HomeProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cities/:cityId" element={<CityNotes />} />
        </Routes>
      </HomeProvider>
    </BrowserRouter>
  )
}

export default App
