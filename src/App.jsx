// src/App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
// import './App.css';
import '../src/styles/styles.css';
import '../src/styles/common.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './index.css';
 

import Header from './components/Header';  // Header 임포트
import Footer from './components/Footer';  // Footer 임포트
import TestPage from './pages/TestPage';  

function App() { 

  return (
    <Router>
            <Header />
        {/* Routes 설정 */}
        <Routes>
          <Route path="/" element={<TestPage/>} /> 
        </Routes>
        <Footer />
    </Router>
  );
}

export default App;
