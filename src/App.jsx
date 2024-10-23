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
import AdminMain from './pages/adminMain/AdminMain';
import GoBackHeader from './components/GoBackHeader';
import LoginPage from './pages/login/Login'; 
import SignupPage from './pages/signup/Signup';
import ArticleDtPage from './pages/articleDetail/ArticleDetail'; 
import GeneralTermPage from './pages/signup/GeneralTerm'; 
import RequestManage from './pages/requestManage/RequestManage';
import ArticleManage from './pages/articleManage/ArticleManage';
import Main from './pages/main/Main';
import JurnalistTermPage from './pages/signup/JournalistTerm';
import GeneralFormPage from './pages/signup/GeneralForm'
import JurnalistFormPage from './pages/signup/JournalistForm'
import SignupSccessPage from './pages/signup/SignupSuccess'
import My from './pages/my/My';
import Search from './pages/search/Search';
import FindIdPage from './pages/findId/FindId'; 
import FindPasswordPage from './pages/findPassword/FindPassword';
import FindPasswordResultPage from './pages/findPassword/FindPasswordResult'; 
import FindIdResultPage from './pages/findId/FindIdResult'; 
import SubManage from './pages/my/SubManage';
import StaffManage from './pages/staffManage/StaffManage';
import DesktopNoti from './pages/nofi/DesktopNoti';

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

  // 데스크탑 푸터 사용할 페이지 경로
  const excludedPaths = ["/adminMain", "/requestManage", "/articleManage","/staffManage","/desktopNoti"];
  const isDesktop = excludedPaths.includes(location.pathname);


   // GoBackHeader를 사용할 페이지 경로 설정 및 제목 정의
   const goBackHeaderPaths = [
    { path: '/login', title: '로그인' },
    { path: '/signup', title: '회원가입' },
    { path: '/signup/generalTerm', title:'회원가입'}, 
    { path: '/signup/journalistTerm', title:'회원가입'},
    { path: '/signup/generalForm', title:'회원가입'},
    { path: '/signup/journalistForm', title:'회원가입'},
    { path: '/signup/success', title:'회원가입'},
    { path: '/search', title: "검색"},
    { path: '/signup/success', title:'회원가입'},
    { path: '/findId', title:'아이디 찾기'},
    { path: '/findPassword', title:'비밀번호 찾기'},
    { path: '/findPassword/result', title:'비밀번호 찾기'}, 
    { path: '/findId/result', title:'아이디 찾기'},
    { path: '/subManage', title: '구독 관리'}
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
        <Route path="/adminMAin" element={<AdminMain />} />
        <Route path="/requestManage" element={<RequestManage/>}/>
        <Route path="/articleManage" element={<ArticleManage/>}/>
        <Route path="/staffManage" element={<StaffManage/>}/>
        <Route path="/desktopNoti" element={<DesktopNoti/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/articleDetail" element={<ArticleDtPage />} />
        <Route path="/signup/generalTerm" element={<GeneralTermPage />} />
        <Route path="/signup/journalistTerm" element={<JurnalistTermPage />}/>
        <Route path="/signup/generalForm" element={<GeneralFormPage />}/>
        <Route path="/signup/journalistForm" element={<JurnalistFormPage />}/>
        <Route path="/signup/success" element={<SignupSccessPage />}/>
        <Route path="/my" element={<My/>}/>
        <Route path='/search' element={<Search />}/>
        <Route path="/findId" element={<FindIdPage />}/>
        <Route path="/findPassword" element={<FindPasswordPage />}/>
        <Route path="/findPassword/result" element={<FindPasswordResultPage/>}/>
        <Route path="/findId/result" element={<FindIdResultPage/>}/>
        <Route path="/subManage" element={<SubManage/>}/>
      </Routes>
      <Footer className={isDesktop ? 'desktop-footer' : 'mobile-footer'} />
    </div>
  );
};

export default App;
