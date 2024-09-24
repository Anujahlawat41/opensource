import { useState } from 'react'
import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import TablePage from './pages/TablePage';
import Settings from './pages/Settings';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/table">Data Table</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table" element={<TablePage />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  </Router>
  )
}

export default App
