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
import GoBackHeader from './components/GoBackHeader';
import LoginPage from './pages/login/Login'; 
import SignupPage from './pages/signup/Signup';


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


   // GoBackHeader를 사용할 페이지 경로 설정 및 제목 정의
   const goBackHeaderPaths = [
    { path: '/login', title: '로그인' },
    { path: '/signup', title: '회원가입' }
  ];

  const currentPath = goBackHeaderPaths.find(item => item.path === location.pathname);
  const isBackHeader = Boolean(currentPath); // 현재 경로가 GoBackHeader 경로인지 확인
  const backHeaderTitle = isBackHeader ? currentPath.title : '';

  return (
    <>
      {isBackHeader ? (
        <GoBackHeader title={backHeaderTitle} />
      ) : (
        !isDesktop && <Header/>
      )}
      {/* Routes 설정 */}
      <Routes>
        <Route path="/" element={<TestPage />} />
        <Route path="/desktop" element={<TestPageDT />} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
      </Routes>
      <Footer className={isDesktop ? 'desktop-footer' : 'mobile-footer'} />
    </>
  );
};

export default App;
