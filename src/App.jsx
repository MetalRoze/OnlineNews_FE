import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../src/styles/styles.css';
import '../src/styles/common.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';

import Header from './components/Header';
import DesktopHeader from './components/DesktopHeader';
import Footer from './components/Footer';
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
import MobileNoti from './pages/nofi/MobileNoti';
import AdminMypage from './pages/adminMypage/AdminMypage';
import GeneralMyPage from './pages/mypage/GeneralMyPage';
import JournalistMyPage from './pages/mypage/JournalistMyPage';
import GeneralMyPageEdit from './pages/mypage/GeneralMyPageEdit';
import JournalistMyPageEdit from './pages/mypage/JournalistMyPageEdit';
import ArticleWrite from './pages/articleWrite/ArticleWrite';
import Economy from './pages/main/Economy';
import Politics from './pages/main/Politics';
import Entertainment from './pages/main/Entertainment';
import Lifestyle from './pages/main/Lifestyle';
import Society from './pages/main/Society';
import Opinion from './pages/main/Opinion';
import Tech from './pages/main/Tech';
import Ranking from './pages/main/Ranking';
import RequestDetail from './pages/requestManage/RequestDetail';
import StaffDetail from './pages/staffManage/StaffDetail';
import MyArticle from './pages/myArticle/MyArticle';
import MyDetail from './pages/myArticle/MyDetail';

function App() {
  return (
    <Router>
      <Basic />
    </Router>
  );
}

const Basic = () => {
  const location = useLocation();

  const isDetail = location.pathname.toLowerCase().startsWith('/articledetail');

  // 데스크탑 푸터 사용할 페이지 경로
  const excludedPaths = ["/adminMain", "/requestManage", "/articleManage", "/staffManage", "/staffManage/staffDetail", "/requestManage/requestDetail","/desktopNoti", "/adminMypage"].map(path => path.toLowerCase());
  const isDesktop = excludedPaths.includes(location.pathname.toLowerCase());



  // GoBackHeader를 사용할 페이지 경로 설정 및 제목 정의
  const goBackHeaderPaths = [
    { path: '/login', title: '로그인' },
    { path: '/signup', title: '회원가입' },
    { path: '/signup/generalTerm', title: '회원가입' },
    { path: '/signup/journalistTerm', title: '회원가입' },
    { path: '/signup/generalForm', title: '회원가입' },
    { path: '/signup/journalistForm', title: '회원가입' },
    { path: '/signup/success', title: '회원가입' },
    { path: '/search', title: "검색" },
    { path: '/signup/success', title: '회원가입' },
    { path: '/findId', title: '아이디 찾기' },
    { path: '/findPassword', title: '비밀번호 찾기' },
    { path: '/findPassword/result', title: '비밀번호 찾기' },
    { path: '/findId/result', title: '아이디 찾기' },
    { path: '/subManage', title: '구독 관리' },
    { path: '/myPageGeneral', title: '계정' },
    { path: '/myPageGeneral/edit', title: '계정' },
    { path: '/myPageJournalist', title: '계정' },
    { path: '/myPageJournalist/edit', title: '계정' },
    { path: '/articleWrite', title: '기사 작성' },
    { path: '/articleWrite/:articleId', title: '기사 수정' },
    { path: '/myArticle', title: '작성한 기사' },
    { path: '/myDetail/:articleId', title: '작성한 기사' },
  ];

  const currentPath = goBackHeaderPaths.find(item => {
    const pathRegex = new RegExp(`^${item.path.replace(':articleId', '[^/]+')}$`, 'i');
    return pathRegex.test(location.pathname);
});
  const isBackHeader = Boolean(currentPath); // 현재 경로가 GoBackHeader 경로인지 확인
  const backHeaderTitle = isBackHeader ? currentPath.title : '';
  return (
    <div style={{ width: '100%', height: "100%" }}>
      {!isDetail && !isBackHeader && !isDesktop && <Header />}
      {isDesktop && <DesktopHeader />}
      {isBackHeader && <GoBackHeader title={backHeaderTitle} />}

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/main" element={<Main />} />
        <Route path="/adminMain" element={<AdminMain />} />
        <Route path="/requestManage" element={<RequestManage />} />
        <Route path="/articleManage" element={<ArticleManage />} />
        <Route path="/staffManage" element={<StaffManage />} />
        <Route path="/staffManage/staffDetail" element={<StaffDetail />} />
        <Route path="/requestManage/requestDetail" element={<RequestDetail />} />
        <Route path="/desktopNoti" element={<DesktopNoti />} />
        <Route path="/mobileNoti" element={<MobileNoti />} />
        <Route path="/adminMypage" element={<AdminMypage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/articleDetail" element={<ArticleDtPage />} />
        <Route path="/articleDetail/:articleId" element={<ArticleDtPage />} />
        <Route path="/signup/generalTerm" element={<GeneralTermPage />} />
        <Route path="/signup/journalistTerm" element={<JurnalistTermPage />} />
        <Route path="/signup/generalForm" element={<GeneralFormPage />} />
        <Route path="/signup/journalistForm" element={<JurnalistFormPage />} />
        <Route path="/signup/success" element={<SignupSccessPage />} />
        <Route path="/my" element={<My />} />
        <Route path='/search' element={<Search />} />
        <Route path="/findId" element={<FindIdPage />} />
        <Route path="/findPassword" element={<FindPasswordPage />} />
        <Route path="/findPassword/result" element={<FindPasswordResultPage />} />
        <Route path="/findId/result" element={<FindIdResultPage />} />
        <Route path="/subManage" element={<SubManage />} />
        <Route path="/myPageGeneral" element={<GeneralMyPage />} />
        <Route path='/myPageGeneral/edit' element={<GeneralMyPageEdit />} />
        <Route path="/myPageJournalist" element={<JournalistMyPage />} />
        <Route path='/myPageJournalist/edit' element={<JournalistMyPageEdit />} />
        <Route path='/articleWrite/:articleId' element={<ArticleWrite />} />
        <Route path='/articleWrite' element={<ArticleWrite />} />
        <Route path='/economy' element={<Economy/>} />
        <Route path='/politics' element={<Politics/>}/>
        <Route path='/entertainment' element={<Entertainment/>}/>
        <Route path='/lifestyle' element={<Lifestyle/>}/>
        <Route path='/society' element={<Society/>}/>
        <Route path='/opinion' element={<Opinion/>}/>
        <Route path='/tech' element={<Tech/>}/>
        <Route path='/ranking' element={<Ranking/>}/>
        <Route path='/myArticle' element={<MyArticle />} />
        <Route path='/myDetail/:articleId' element={<MyDetail />} />
      </Routes>
      <Footer className={isDesktop ? 'desktop-footer' : 'mobile-footer'} />
    </div>
  );
};

export default App;
