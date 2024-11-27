import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MyDropdown from './DropDown';
import blueLogo from '../assets/myeongbo_blue.svg';

const formatDate = (date) => {
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        weekday: 'short'
    };

    const formattedDate = date.toLocaleDateString('ko-KR', options);
    const [year, month, day] = formattedDate.split('.').map(part => part.trim()); // 각 부분을 분리하고 trim
    const weekday = date.toLocaleDateString('ko-KR', { weekday: 'short' });

    return `${year}년 ${month}월 ${day}일 (${weekday})`; // 원하는 형식으로 조합
};
const Header = () => {
    const today = new Date();  // Date 객체 생성 
    const navigate = useNavigate();

    //로그인 상태 관리 
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 로그인 상태 확인 함수
    const checkLoginStatus = () => {
        const authToken = sessionStorage.getItem('authToken');
        setIsLoggedIn(!!authToken);
    };

    useEffect(() => {
        checkLoginStatus();  // 컴포넌트가 마운트될 때 로그인 상태 확인
    }, []);

    const handleLogoClick = () => {
        navigate('/main'); // /main으로 이동
    };

    const handleSearchClick = () => {
        navigate('/search');
    };

    const handleLoginClick = (e) => {
        e.preventDefault();
        navigate('/login');
    };

    const handleSignupClick = (e) => {
        e.preventDefault();
        navigate('/signup');
    };

    const handleLogoutClick = () => {
        sessionStorage.removeItem('authToken');  // authToken 삭제로 로그아웃 처리
        setIsLoggedIn(false);  // 로그인 상태를 false로 변경
        navigate('/main');  // 로그아웃 후 메인 페이지로 리디렉션
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className='mobile-header mobile-header-grid'>
                <div className='date'>{formatDate(today)}</div>
                <div>
                    <img src={blueLogo} alt="Bootstrap" className='logo' onClick={handleLogoClick} style={{ cursor: 'pointer' }} />
                </div>
                <div className='flex column aiCenter jcFlexend'>
                    <div className='flex mb05' >
                        <i
                            className="bi bi-search mr05 pointer"
                            onClick={handleSearchClick}
                        >
                        </i>
                        {isLoggedIn && <MyDropdown />}
                    </div>
                    <div className='flex1'></div>
                    <div className='link'>
                        {isLoggedIn ? (
                            // 로그인된 상태일 때 '로그아웃' 버튼 표시
                            <a href='#' onClick={handleLogoutClick} style={{ cursor: 'pointer' }}>로그아웃</a>
                        ) : (
                            // 로그인 안된 상태일 때 '로그인'과 '회원가입' 버튼 표시
                            <>
                                <a href='#' onClick={handleLoginClick} style={{ cursor: 'pointer' }}>로그인</a>
                                <span> &nbsp;&nbsp;|&nbsp;&nbsp; </span>
                                <a href='#' onClick={handleSignupClick} style={{ cursor: 'pointer' }}>회원가입</a>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Header;
