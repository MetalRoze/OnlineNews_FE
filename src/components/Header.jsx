import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

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

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className='mobile-header' >
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


export default Header;
