import React from 'react';
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="desktop-sidebar">
            <div className='flex'>
                <img src="https://placehold.co/100x50" alt="Bootstrap" className='logo' />
                <i className="bi bi-book mAuto" style={{ textAlign: "right" }}></i>
            </div>
            <div className='list'>
                <div className='ul'>
                    <Link><i className="bi bi-search mr15 mb1"></i>기사 검색</Link>
                    <Link><i className="bi bi-bell mr15 mb1"></i> 알림</Link>
                    <Link><i className="bi bi-person mr15"></i> 내 정보</Link>
                </div>
            </div>
            <div style={{ flex: "1" }}></div>
            <div className='logout'> 
                <Link to="/"><i className="bi bi-box-arrow-right mr15"></i>로그아웃</Link>
            </div>
        </div>
    );
};

export default Sidebar;
