import React from 'react';

const Sidebar = () => {
    return (
        <div className="desktop-sidebar">
            <div className='flex'>
                <img src="https://placehold.co/130x50" alt="Bootstrap" className='logo' />
                <i class="bi bi-book" style={{ textAlign: "right" }}></i>
            </div>
            <div className='list'>
                <ul>
                    <li><a href="#"><i class="bi bi-search"></i> 기사 검색</a></li>
                    <li><a href="#"><i class="bi bi-bell"></i> 알림</a></li>
                    <li><a href="#"><i class="bi bi-person"></i> 내 정보</a></li>
                </ul>
            </div>
            <div className='list'>
                <li><a href="#"><i class="bi bi-box-arrow-right"></i> 로그아웃</a></li>
            </div>
        </div>
    );
};

export default Sidebar;
