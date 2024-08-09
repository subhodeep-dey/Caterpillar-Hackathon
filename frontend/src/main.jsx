import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatBot from './App';
import SummaryForm from './SummaryForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatBot />} />
        <Route path="/summary" element={<SummaryForm />} />
      </Routes>
    </Router>
  );
}

export default App;
