import React, { useEffect, useState } from 'react';
import blackLogo from '../assets/myeongbo_black.svg';
import { useNavigate } from 'react-router-dom';
import DesktopMenuList from './DesktopMenuList';
import { dateOnly } from '../utils/formDateTime';


const DesktopHeader = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkLoginStatus = () => {
        const authToken = sessionStorage.getItem('authToken');
        setIsLoggedIn(!!authToken);
    };

    useEffect(() => {
        checkLoginStatus(); 
    }, []);

    const today = new Date();
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/adminMain');
    };
    const handleLoginClick = (e) => {
        e.preventDefault();
        navigate('/login');
    };
    const handleLogoutClick = () => {
        sessionStorage.removeItem('authToken');
        setIsLoggedIn(false);
        navigate('/adminMain');
    };
    const handleDateClick = (e) => {
        e.preventDefault();
    };
    return (
        <div style={{ width: '100vw' }}>
            <div className="desktop-header">
                <div className='date' style={{ cursor: 'pointer' }} onClick={handleDateClick}>{dateOnly(today)}</div>
                <div >
                    <img src={blackLogo} alt="Bootstrap" className='logo' style={{ width: '15rem', cursor: 'pointer' }} onClick={handleLogoClick} />
                </div>
                <div className='link'>
                    {isLoggedIn ? (
                        <a href='#' onClick={handleLogoutClick} style={{ cursor: 'pointer' }}>로그아웃</a>
                    ) : (
                        <>
                            <a href='#' onClick={handleLoginClick} style={{ cursor: 'pointer' }}>로그인</a>
                        </>
                    )}
                </div>
            </div>
            <DesktopMenuList />
        </div>
    );
};

export default DesktopHeader;
