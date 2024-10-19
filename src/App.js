import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import JobList from './components/Jobs/JobList';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<JobList />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
