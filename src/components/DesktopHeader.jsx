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
        navigate('/adminMain'); 
    };
    const handleLogoutClick = (e) => {
        e.preventDefault();
        //나중에 토큰 삭제
        navigate('/login');
    };
    const handleDateClick = (e) => {
        e.preventDefault();
        //calendar 뜨게
    };
    return (
        <div className="desktop-header">
            <div className='date' style={{cursor: 'pointer'}} onClick={handleDateClick}>{formatDate(today)}</div>
            <div >
                <img src={blackLogo} alt="Bootstrap" className='logo' style={{ width: '15rem', cursor: 'pointer' }} onClick={handleLogoClick} />
            </div>
            <div className='link'>
                <a href='#' onClick={handleLogoutClick} style={{ cursor: 'pointer' }}>로그아웃</a>
            </div>
        </div>
    );
};

export default DesktopHeader;
