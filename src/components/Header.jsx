import React from 'react';
import { useNavigate } from 'react-router-dom';
import MyDropdown from './DropDown';

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

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className='mobile-header' >
                <div className='flex'>
                    <img src="https://placehold.co/130x50" alt="Bootstrap" className='logo' onClick={handleLogoClick} // 클릭 이벤트 추가
                        style={{ cursor: 'pointer' }} />
                    <div className='date'>{formatDate(today)}</div>
                </div>
                <div>
                    <div className='flex aiCenter' style={{ width: 'fit-content', justifySelf: 'flex-end' }}>
                        <i
                            className="bi bi-search mr1"
                            onClick={handleSearchClick}
                            style={{ cursor: 'pointer' }}>
                        </i>
                        <MyDropdown />
                    </div>
                    <div className='flex aiCenter'>
                        <div className='link'>
                            <a href='#' onClick={handleLoginClick} style={{ cursor: 'pointer' }}>로그인</a>
                            <span> &nbsp;&nbsp;|&nbsp;&nbsp; </span>
                            <a href='#' onClick={handleSignupClick} style={{ cursor: 'pointer' }}>회원가입</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Header;
