import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';

import SideBar from './components/Sidebar';
import sidebar_menu from './constants/sidebar-menu';

import './App.css';
import Reports from './pages/Reports';
import FillReport from './pages/Reports/FillReport';
import TireInspection from './pages/TireInspection';

function App () {
  return(
    <Router>
      <div className='dashboard-container'>
        <SideBar menu={sidebar_menu} />
          
          <div className='dashboard-body'>
              <Routes>
                  <Route path="*" element={<div></div>} />
                  <Route exact path="/" element={<div></div>} />
                  <Route exact path="/reports" element={< Reports/>} />
                  <Route exact path="/tire-inspection" element={< TireInspection/>} />
                  <Route exact path="/fillreport" element={<FillReport />} />
                  
              </Routes>
          </div>
      </div>
    </Router>
  )
}

export default App;