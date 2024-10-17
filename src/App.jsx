import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../src/styles/styles.css';
import '../src/styles/common.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';

import Header from './components/Header'; 
import Footer from './components/Footer'; 
import TestPage from './pages/TestPage';  
import TestPageDT from './pages/testPageDT';  

function App() { 
  return (
    <Router>
      <Main />
    </Router>
  );
}

const Main = () => {
  const location = useLocation();
  
  // 현재 경로에 따라 클래스 설정
  const isDesktop = location.pathname === "/desktop";

  return (
    <>
      <Header className={isDesktop ? 'desktop-header' : 'mobile-header'} />
      {/* Routes 설정 */}
      <Routes>
        <Route path="/" element={<TestPage />} /> 
        <Route path="/desktop" element={<TestPageDT />} /> 
      </Routes>
      <Footer className={isDesktop ? 'desktop-footer' : 'mobile-footer'} />
    </>
  );
};

export default App;
