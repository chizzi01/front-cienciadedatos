import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Form from './components/Form';
import Charts from './components/Charts';

import './App.css'

function App() {
  const location = useLocation();

  return (
    <>
      <div className='background'>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/form" element={<Form />} />
          <Route path="/reporte" element={<Charts />} />
        </Routes>
      </div>

    </>
  )
}

export default App
