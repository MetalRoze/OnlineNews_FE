import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const DesktopHeader = () => {
    return (
        <Navbar className="desktop-header py-3" data-bs-theme="dark">
            <div className="container">
                <Navbar.Brand href="#home">Desktop Header</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
};

const MobileHeader = () => {
    const today = new Date();
    return (
        <div>
            <div className='mobile-header' style={{ padding: "1rem 1.5rem" }}>
                <img src="https://placehold.co/130x50" alt="Bootstrap" className='logo' />
                <div>
                    <div className='taRight'>
                        <i className="bi bi-search"></i>
                        <i className="bi bi-filter-right"></i>
                    </div>
                    <div className='flex aiCenter'>
                        <span className='date'>{formatDate(today)}</span>
                        <div className='link'>
                            <a href='#'>로그인</a>
                            <span> | </span>
                            <a href='#'>회원가입</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

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
const Header = ({ className }) => {
    const isMobile = className === 'mobile-header';

    return (
        <>
            {isMobile ? <MobileHeader /> : <DesktopHeader />}
        </>
    );
};

export default Header;
