import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import FavPage from './pages/FavPage'
import HomePage from './pages/HomePage'

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favourites" element={<FavPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
