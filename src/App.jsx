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

  // 관리자 페이지(데스크탑사이즈) 여기에 적기
  const excludedPaths = ["/desktop",];
  const isDesktop = excludedPaths.includes(location.pathname);

  return (
    <>
      {!isDesktop && <Header />}
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
