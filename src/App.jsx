// src/App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // 부트스트랩
 

import TestPage from './pages/TestPage';  

function App() { 

  return (
    <Router>
      <>   
        {/* Routes 설정 */}
        <Routes>
          <Route path="/" element={<TestPage/>} /> 
        </Routes>
      </>
    </Router>
  );
}

export default App;
