import React from 'react';
import blackLogo from '../assets/myeongbo_black.svg';
import { useNavigate } from 'react-router-dom';

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
const DesktopHeader = () => {
    const today = new Date();
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
        <div className="desktop-header">
            <div className='date'>{formatDate(today)}</div>
            {/* 중간 로고 */}
            <div >
                <img src={blackLogo} alt="Bootstrap" className='logo' style={{ width: '15rem' }} />
            </div>
            <div className='link'>
                <a href='#' onClick={handleLoginClick} style={{ cursor: 'pointer' }}>로그아웃</a>
            </div>

        </div>
    );
};

export default DesktopHeader;
