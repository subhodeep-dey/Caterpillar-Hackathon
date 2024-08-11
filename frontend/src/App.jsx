import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';

import SideBar from './components/Sidebar';
import sidebar_menu from './constants/sidebar-menu';

import './App.css';
import Reports from './pages/Reports';
import FillTyreReport from './pages/TireInspection/FillTyreReport';
import FillReport from './pages/Reports/FillReport';
import TireInspection from './pages/TireInspection';
import Vehicles from './pages/Vehicle';
import FillVehicleReport from './pages/Vehicle/FillVehicleReport';
import BatteryInspection from './pages/BatteryInspection';
import FillBatteryReport from './pages/BatteryInspection/FillBatteryInspection';
import ExteriorInspection from './pages/ExteriorInspection';
import FillExteriorReport from './pages/ExteriorInspection/FillExteriorReport';
import BrakeInspection from './pages/BrakeInspection';
import FillBrakeReport from './pages/BrakeInspection/FillBrakeReport';
import EngineInspection from './pages/EngineInspection';
import FillEngineReport from './pages/EngineInspection/FillReport';
import Login from './pages/Login';

function App () {
  return(
    <Router>
      <div className='dashboard-container'>
        <SideBar menu={sidebar_menu} />
          
          <div className='dashboard-body'>
              <Routes>
                  <Route path="*" element={<div></div>} />
                  <Route exact path="/" element={< Login/>} />
                  <Route exact path="/reports" element={< Reports/>} />
                  <Route exact path="/tire-inspection" element={< TireInspection/>} />
                  <Route exact path="/fillTireInspection" element={<FillTyreReport/>} />
                  <Route exact path="/fillreport" element={<FillReport />} />
                  <Route exact path="/vehicle" element={<Vehicles />} />
                  <Route exact path="/fillVehicleInspection" element={<FillVehicleReport />} />
                  <Route exact path="/battery-inspection" element={< BatteryInspection/>} />
                  <Route exact path="/fillBatteryInspection" element={<FillBatteryReport/>} />
                  <Route exact path="/exterior-inspection" element={< ExteriorInspection/>} />
                  <Route exact path="/fillExteriorInspection" element={<FillExteriorReport/>} />
                  <Route exact path="/brake-inspection" element={< BrakeInspection/>} />
                  <Route exact path="/fillBrakeInspection" element={<FillBrakeReport/>} />
                  <Route exact path="/engine-inspection" element={< EngineInspection/>} />
                  <Route exact path="/fillEngineReport" element={<FillEngineReport/>} />
                  
              </Routes>
          </div>
      </div>
    </Router>
  )
}

export default App;