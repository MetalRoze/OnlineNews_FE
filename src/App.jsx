import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../src/styles/styles.css';
import '../src/styles/common.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';

import Header from './components/Header';
import Footer from './components/Footer';
import TestPage from './pages/testPage';
import TestPageDT from './pages/testPageDT';
import GoBackHeader from './components/GoBackHeader';
import LoginPage from './pages/login/Login'; 
import SignupPage from './pages/signup/Signup';
import ArticleDtPage from './pages/articleDetail/ArticleDetail'; 
import GeneralTermPage from './pages/signup/GeneralTerm'; 
import RequestManage from './pages/requestManage/RequestManage';
import Main from './pages/main/Main';

function App() {
  return (
    <Router>
      <Basic />
    </Router>
  );
}

const Basic = () => {
  const location = useLocation();

  const isDetail = location.pathname === '/articleDetail';

  // 기사 상세 페이지 헤더
  const excludedPaths = ["/desktop", "/requestManage",];
  const isDesktop = excludedPaths.includes(location.pathname);


   // GoBackHeader를 사용할 페이지 경로 설정 및 제목 정의
   const goBackHeaderPaths = [
    { path: '/login', title: '로그인' },
    { path: '/signup', title: '회원가입' },
    { path: '/signup/generalTerm', title:'회원가입'}, 
  ];

  const currentPath = goBackHeaderPaths.find(item => item.path === location.pathname);
  const isBackHeader = Boolean(currentPath); // 현재 경로가 GoBackHeader 경로인지 확인
  const backHeaderTitle = isBackHeader ? currentPath.title : '';
  return (
    <div style={{ width: '100%', height:"100%"}}>
      {!isDetail && !isBackHeader && !isDesktop && <Header />}
      {isBackHeader && <GoBackHeader title={backHeaderTitle} />}
      
      <Routes>
        <Route path="/" element={<TestPage />} />
        <Route path="/main" element={<Main />} />
        <Route path="/desktop" element={<TestPageDT />} />
        <Route path="/requestManage" element={<RequestManage/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/articleDetail" element={<ArticleDtPage />} />
        <Route path="/signup/generalTerm" element={<GeneralTermPage />} />
      </Routes>
      <Footer className={isDesktop ? 'desktop-footer' : 'mobile-footer'} />
    </div>
  );
};

export default App;
