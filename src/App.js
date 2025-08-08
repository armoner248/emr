import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PatientList from './components/PatientList';
import PatientDetail from './components/PatientDetail';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PatientList />} />
        <Route path="/patient/:id" element={<PatientDetail />} />
      </Routes>
    </div>
  );
}

export default App;
