import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './global.css'
import App from './App.jsx'
import Details from './Details/Details.jsx'
import Favorites from './Favoritos/Favoritos.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/Details/:type/:id' element={<Details />} />
        <Route path='/favorites' element={<Favorites />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>
)